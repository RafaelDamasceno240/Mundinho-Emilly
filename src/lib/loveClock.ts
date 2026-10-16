/**
 * Cálculo do contador de amor.
 * Funciona com instantes absolutos (milissegundos desde 1970, UTC),
 * então o resultado é o mesmo em qualquer aparelho, qualquer fuso.
 */

export interface WallTime {
  ano: number
  /** 1 a 12 */
  mes: number
  dia: number
  hora?: number
  minuto?: number
  segundo?: number
}

export interface TimeParts {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

export type LoveClockMode = 'antes' | 'desde'

export interface LoveClockState {
  /** `antes`: contagem regressiva até a data. `desde`: tempo decorrido. */
  mode: LoveClockMode
  parts: TimeParts
}

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatterFor(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    formatters.set(timeZone, f)
  }
  return f
}

/** Diferença (ms) entre o relógio de parede do fuso e o UTC, num instante. */
export function timeZoneOffsetMs(instant: number, timeZone: string): number {
  const base = Math.floor(instant / 1000) * 1000
  const values: Record<string, number> = {}
  for (const part of formatterFor(timeZone).formatToParts(new Date(base))) {
    if (part.type !== 'literal') values[part.type] = Number(part.value)
  }
  const asUtc = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second,
  )
  return asUtc - base
}

/** Converte "dia/mês/ano hora:min no fuso X" num instante absoluto. */
export function wallTimeToInstant(wall: WallTime, timeZone: string): number {
  const guess = Date.UTC(
    wall.ano,
    wall.mes - 1,
    wall.dia,
    wall.hora ?? 0,
    wall.minuto ?? 0,
    wall.segundo ?? 0,
  )
  const firstOffset = timeZoneOffsetMs(guess, timeZone)
  let instant = guess - firstOffset
  // Uma segunda passada corrige casos de mudança de horário de verão.
  const secondOffset = timeZoneOffsetMs(instant, timeZone)
  if (secondOffset !== firstOffset) instant = guess - secondOffset
  return instant
}

export function splitDuration(ms: number): TimeParts {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000)
  return {
    dias: Math.floor(totalSeconds / 86_400),
    horas: Math.floor((totalSeconds % 86_400) / 3_600),
    minutos: Math.floor((totalSeconds % 3_600) / 60),
    segundos: totalSeconds % 60,
  }
}

export function getLoveClock(now: number, startInstant: number): LoveClockState {
  if (now < startInstant) {
    // Arredonda para cima para a regressiva nunca mostrar 0 antes da hora.
    const remaining = Math.ceil((startInstant - now) / 1000) * 1000
    return { mode: 'antes', parts: splitDuration(remaining) }
  }
  return { mode: 'desde', parts: splitDuration(now - startInstant) }
}

/** "31 de agosto de 2026" */
export function formatLongDate(wall: WallTime): string {
  const date = new Date(Date.UTC(wall.ano, wall.mes - 1, wall.dia, 12))
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
