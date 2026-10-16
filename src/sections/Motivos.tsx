import { useState } from 'react'
import { motivos, motivosSecretos, type Motivo } from '../data/motivos'
import { secoes } from '../data/textos'
import { t } from '../lib/texto'
import { CabecalhoSecao, Surge } from '../components/Base'
import { IconeMotivoSvg, IcCoracao } from '../components/Icones'

const tons = [
  'bg-blush-100 text-cherry',
  'bg-lilac-100 text-lilac-500',
  'bg-peach text-[#b4582a]',
  'bg-blush-50 text-cherry-deep',
]

function numero(n: number) {
  return `nº ${String(n).padStart(2, '0')}`
}

function CartaoMotivo({ motivo, indice }: { motivo: Motivo; indice: number }) {
  return (
    <Surge atraso={(indice % 4) * 90} como="li" className="h-full">
      <article
        className={`group papel relative flex h-full flex-col gap-4 rounded-[1.75rem] p-6 shadow-soft ring-1 ring-blush-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
          indice % 2 ? 'sm:rotate-[0.6deg]' : 'sm:-rotate-[0.6deg]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tons[indice % tons.length]}`}>
            <IconeMotivoSvg nome={motivo.icone} tamanho={26} />
          </span>
          <span className="font-hand text-xl text-blush-400">{numero(indice + 1)}</span>
        </div>
        <p className="text-[1.08rem] leading-relaxed font-semibold text-ink">{t(motivo.texto)}</p>
        <IcCoracao
          tamanho={14}
          className="absolute right-6 bottom-5 text-blush-200 transition-colors duration-300 group-hover:text-cherry"
        />
      </article>
    </Surge>
  )
}

function CartaoSecreto({ motivo, indice, total }: { motivo: Motivo; indice: number; total: number }) {
  const [aberto, setAberto] = useState(false)
  return (
    <Surge atraso={indice * 110} como="li" className="h-full">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-label={aberto ? undefined : `Cartão secreto ${indice + 1} de ${total}: toque para revelar`}
        className="vira block h-full min-h-[13.5rem] w-full rounded-[1.75rem] text-left"
        data-aberto={aberto}
      >
        <span className="vira-miolo">
          {/* frente: fechado */}
          <span
            aria-hidden={aberto}
            className="vira-face flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border-2 border-dashed border-lilac-300 bg-lilac-100 p-6 text-center shadow-soft"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-cherry text-white shadow-lift">
              <IcCoracao tamanho={24} />
            </span>
            <span className="font-hand text-2xl text-night-soft">segredinho nº {indice + 1}</span>
            <span className="text-sm font-bold tracking-wide text-lilac-500 uppercase">toque para abrir</span>
          </span>
          {/* verso: revelado */}
          <span
            aria-hidden={!aberto}
            className="vira-face vira-verso flex flex-col justify-between gap-4 rounded-[1.75rem] bg-night p-6 text-white shadow-lift"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-honey">
              <IconeMotivoSvg nome={motivo.icone} tamanho={24} />
            </span>
            <span className="font-serif text-[1.35rem] leading-snug font-medium italic">{t(motivo.texto)}</span>
            <span className="text-xs font-bold tracking-wide text-lilac-200 uppercase">toque para fechar</span>
          </span>
        </span>
      </button>
    </Surge>
  )
}

export function Motivos() {
  const s = secoes.motivos
  return (
    <section id="motivos" aria-labelledby="motivos-titulo" className="relative bg-cream py-20 outline-none sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <CabecalhoSecao idTitulo="motivos-titulo" chamada={t(s.chamada)} titulo={t(s.titulo)} subtitulo={t(s.subtitulo)} />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {motivos.map((m, i) => (
            <CartaoMotivo key={i} motivo={m} indice={i} />
          ))}
        </ul>

        {motivosSecretos.length > 0 && (
          <>
            <Surge className="mt-16 mb-6 flex items-center justify-center gap-3 text-center">
              <span aria-hidden="true" className="h-px w-10 bg-lilac-300" />
              <h3 className="font-hand text-[1.7rem] text-night-soft">e alguns que eu guardei em segredo</h3>
              <span aria-hidden="true" className="h-px w-10 bg-lilac-300" />
            </Surge>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {motivosSecretos.map((m, i) => (
                <CartaoSecreto key={i} motivo={m} indice={i} total={motivosSecretos.length} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
