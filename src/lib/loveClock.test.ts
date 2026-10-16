import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  formatLongDate,
  getLoveClock,
  splitDuration,
  wallTimeToInstant,
} from './loveClock.ts'

const SP = 'America/Sao_Paulo'
const inicio = wallTimeToInstant({ ano: 2026, mes: 8, dia: 31 }, SP)
const s = 1000
const min = 60 * s
const h = 60 * min
const d = 24 * h

test('31/08/2026 00:00 em São Paulo é 31/08/2026 03:00 UTC', () => {
  assert.equal(inicio, Date.UTC(2026, 7, 31, 3, 0, 0))
})

test('o resultado não depende do fuso do aparelho', () => {
  // O teste roda com TZ diferentes (ver README); o instante tem de ser sempre o mesmo.
  assert.equal(new Date(inicio).toISOString(), '2026-08-31T03:00:00.000Z')
})

test('antes da data: contagem regressiva, nunca negativa', () => {
  const agora = inicio - (2 * d + 3 * h + 4 * min + 5 * s)
  const r = getLoveClock(agora, inicio)
  assert.equal(r.mode, 'antes')
  assert.deepEqual(r.parts, { dias: 2, horas: 3, minutos: 4, segundos: 5 })
})

test('a um segundo da data: ainda regressiva, mostrando 1s', () => {
  const r = getLoveClock(inicio - 400, inicio)
  assert.equal(r.mode, 'antes')
  assert.deepEqual(r.parts, { dias: 0, horas: 0, minutos: 0, segundos: 1 })
})

test('exatamente na data: vira contador de tempo decorrido em zero', () => {
  const r = getLoveClock(inicio, inicio)
  assert.equal(r.mode, 'desde')
  assert.deepEqual(r.parts, { dias: 0, horas: 0, minutos: 0, segundos: 0 })
})

test('depois da data: tempo decorrido correto', () => {
  const agora = inicio + 45 * d + 22 * h + 41 * min + 7 * s + 999
  const r = getLoveClock(agora, inicio)
  assert.equal(r.mode, 'desde')
  assert.deepEqual(r.parts, { dias: 45, horas: 22, minutos: 41, segundos: 7 })
})

test('16/10/2026 01:42 UTC equivale a 45 dias, 22h42 depois do início', () => {
  const r = getLoveClock(Date.UTC(2026, 9, 16, 1, 42, 0), inicio)
  assert.deepEqual(r.parts, { dias: 45, horas: 22, minutos: 42, segundos: 0 })
})

test('funciona também em fusos com horário de verão', () => {
  const ny = wallTimeToInstant({ ano: 2026, mes: 7, dia: 1, hora: 12 }, 'America/New_York')
  assert.equal(ny, Date.UTC(2026, 6, 1, 16, 0, 0))
  const nyInverno = wallTimeToInstant({ ano: 2026, mes: 1, dia: 15, hora: 12 }, 'America/New_York')
  assert.equal(nyInverno, Date.UTC(2026, 0, 15, 17, 0, 0))
})

test('splitDuration ignora valores negativos', () => {
  assert.deepEqual(splitDuration(-5000), { dias: 0, horas: 0, minutos: 0, segundos: 0 })
})

test('data por extenso em português', () => {
  assert.equal(formatLongDate({ ano: 2026, mes: 8, dia: 31 }), '31 de agosto de 2026')
})
