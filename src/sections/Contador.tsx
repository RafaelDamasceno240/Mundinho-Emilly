import { useMemo, useState } from 'react'
import { site } from '../config/site'
import { secoes } from '../data/textos'
import { t } from '../lib/texto'
import { formatLongDate, getLoveClock, wallTimeToInstant, type TimeParts } from '../lib/loveClock'
import { useAgora } from '../hooks/hooks'
import { CabecalhoSecao, Surge } from '../components/Base'
import { Estrelinhas, Onda } from '../components/Decoracao'
import { IcCoracao } from '../components/Icones'
import { SegredoEscondido } from '../components/Segredo'

const unidades: { chave: keyof TimeParts; singular: string; plural: string }[] = [
  { chave: 'dias', singular: 'dia', plural: 'dias' },
  { chave: 'horas', singular: 'hora', plural: 'horas' },
  { chave: 'minutos', singular: 'minuto', plural: 'minutos' },
  { chave: 'segundos', singular: 'segundo', plural: 'segundos' },
]

export function Contador() {
  const inicio = useMemo(() => wallTimeToInstant(site.dataInicio, site.fusoHorario), [])
  const dataExtenso = useMemo(() => formatLongDate(site.dataInicio), [])
  const agora = useAgora()
  const { mode, parts } = getLoveClock(agora, inicio)
  const [segredoAberto, setSegredoAberto] = useState(false)
  const s = secoes.contador
  const antes = mode === 'antes'

  return (
    <section id="contador" aria-labelledby="contador-titulo" className="relative outline-none" data-modo={mode}>
      <Onda cor="var(--color-lilac-100)" />
      <div className="relative overflow-hidden bg-lilac-100 pt-14 pb-24 sm:pt-20 sm:pb-28">
        <Estrelinhas quantidade={26} semente={42} cor="#a891d6" />
        {/* o segredinho mora aqui, escondido entre as estrelas */}
        <SegredoEscondido
          aberto={segredoAberto}
          aoAbrir={() => setSegredoAberto(true)}
          aoFechar={() => setSegredoAberto(false)}
          className="absolute top-[18%] right-[6%] z-10 sm:top-[22%] sm:right-[12%]"
        />

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <CabecalhoSecao
            idTitulo="contador-titulo"
            chamada={t(s.chamada)}
            titulo={t(antes ? s.tituloAntes : s.titulo)}
            subtitulo={t(antes ? s.subtituloAntes : s.subtitulo, { data: dataExtenso })}
          />

          <Surge>
            <p className="mb-5 text-center text-sm font-bold tracking-[0.18em] text-lilac-500 uppercase">
              {antes ? 'faltam' : 'juntos há'}
            </p>
            <div role="timer" aria-live="off" aria-atomic="true" className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {unidades.map((u, i) => {
                const valor = parts[u.chave]
                return (
                  <div
                    key={u.chave}
                    className="relative flex flex-col items-center rounded-[1.75rem] bg-paper px-3 pt-6 pb-5 text-center shadow-soft"
                  >
                    <span className="font-serif text-[clamp(2.8rem,2rem+3.5vw,4.4rem)] leading-none font-semibold text-cherry tabular-nums">
                      {u.chave === 'dias' ? valor : String(valor).padStart(2, '0')}
                    </span>
                    <span className="mt-2 text-sm font-bold tracking-wide text-ink-soft uppercase">
                      {valor === 1 ? u.singular : u.plural}
                    </span>
                    {i < unidades.length - 1 && (
                      <IcCoracao
                        tamanho={14}
                        className="absolute top-1/2 -right-[0.9rem] hidden -translate-y-1/2 text-blush-300 md:block"
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <p className="mt-8 text-center font-hand text-2xl text-night-soft">
              {antes ? 'e depois disso, a gente começa a contar juntos' : 'e contando, segundo por segundo'}
            </p>
          </Surge>
        </div>
      </div>
      <Onda cor="var(--color-lilac-100)" invertida />
    </section>
  )
}
