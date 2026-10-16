import { useState } from 'react'
import { site } from '../config/site'
import { cartinhas, type Cartinha, type CorCartinha } from '../data/cartinhas'
import { secoes } from '../data/textos'
import { t } from '../lib/texto'
import { gravarLocal, lerLocal } from '../hooks/hooks'
import { CabecalhoSecao, Dialogo, Surge } from '../components/Base'
import { IcCoracao } from '../components/Icones'

const paleta: Record<CorCartinha, { corpo: string; aba: string; papel: string }> = {
  rosa: { corpo: '#f8c9d6', aba: '#f1a7bc', papel: 'bg-blush-50' },
  lavanda: { corpo: '#dccff3', aba: '#c3b0e8', papel: 'bg-lilac-50' },
  pessego: { corpo: '#ffdcc6', aba: '#f7bf9b', papel: 'bg-[#fff4ec]' },
  creme: { corpo: '#f6e6d2', aba: '#ebd0ae', papel: 'bg-paper' },
}

const CHAVE = 'mundinho:cartinhas-abertas'

function EnvelopeMini({ cor, aberta }: { cor: CorCartinha; aberta: boolean }) {
  const p = paleta[cor]
  return (
    <svg viewBox="0 0 120 84" className="w-full overflow-visible drop-shadow-[0_8px_14px_rgb(140_60_90/0.18)]" aria-hidden="true">
      <rect x="2" y="2" width="116" height="80" rx="9" fill={p.corpo} />
      {aberta ? (
        <>
          <path d="M6 6 60 -26 114 6Z" fill={p.aba} />
          <rect x="16" y="-12" width="88" height="46" rx="4" fill="#fffdfb" />
          <path d="M28 2h64M28 12h52M28 22h58" stroke="#f1a7bc" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 30 60 60 118 30V73a9 9 0 01-9 9H11a9 9 0 01-9-9Z" fill={p.corpo} />
        </>
      ) : (
        <path d="M4 6 60 48 116 6" fill={p.aba} stroke={p.aba} strokeWidth="2" strokeLinejoin="round" />
      )}
      <path d="M4 80 48 44M116 80 72 44" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CartaoCartinha({
  cartinha,
  aberta,
  aoAbrir,
  indice,
}: {
  cartinha: Cartinha
  aberta: boolean
  aoAbrir: () => void
  indice: number
}) {
  return (
    <Surge como="li" atraso={(indice % 4) * 90} className="h-full">
      <button
        type="button"
        onClick={aoAbrir}
        className="group flex h-full w-full flex-col items-center gap-4 rounded-[1.75rem] bg-paper px-4 pt-8 pb-5 text-center shadow-soft ring-1 ring-blush-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
      >
        <span className="relative block w-[78%] max-w-[9.5rem] transition-transform duration-500 group-hover:-rotate-3">
          <EnvelopeMini cor={cartinha.cor} aberta={aberta} />
          <span
            className={`absolute top-[54%] left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-soft transition ${
              aberta ? 'bg-paper text-cherry ring-2 ring-cherry/30' : 'bg-cherry text-white group-hover:scale-110'
            }`}
          >
            <IcCoracao tamanho={16} cheio={!aberta} />
          </span>
        </span>
        <span className="font-hand text-[1.45rem] leading-tight text-ink">{cartinha.titulo}</span>
        <span
          className={`mt-auto rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
            aberta ? 'bg-lilac-100 text-lilac-500' : 'bg-blush-100 text-cherry-deep'
          }`}
        >
          {aberta ? 'já aberta · ler de novo' : 'abrir'}
        </span>
      </button>
    </Surge>
  )
}

export function Cartinhas() {
  const [abertas, setAbertas] = useState<string[]>(() => lerLocal<string[]>(CHAVE, []))
  const [atual, setAtual] = useState<Cartinha | null>(null)
  const s = secoes.carinhos

  const abrir = (c: Cartinha) => {
    setAtual(c)
    if (!abertas.includes(c.id)) {
      const novas = [...abertas, c.id]
      setAbertas(novas)
      gravarLocal(CHAVE, novas)
    }
  }

  return (
    <section id="carinhos" aria-labelledby="carinhos-titulo" className="relative bg-cream py-20 outline-none sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <CabecalhoSecao idTitulo="carinhos-titulo" chamada={t(s.chamada)} titulo={t(s.titulo)} subtitulo={t(s.subtitulo)} />
        <p className="-mt-8 mb-10 text-center text-sm font-bold text-ink-soft sm:-mt-12">
          {abertas.length} de {cartinhas.length} cartinhas abertas
        </p>

        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {cartinhas.map((c, i) => (
            <CartaoCartinha key={c.id} cartinha={c} indice={i} aberta={abertas.includes(c.id)} aoAbrir={() => abrir(c)} />
          ))}
        </ul>
      </div>

      <Dialogo aberto={atual !== null} aoFechar={() => setAtual(null)} rotulo={atual ? atual.titulo : 'Cartinha'}>
        {atual && (
          <div className={`papel overflow-hidden rounded-[1.75rem] shadow-lift ${paleta[atual.cor].papel}`}>
            <div className="h-3" style={{ background: paleta[atual.cor].aba }} />
            <div className="px-7 pt-10 pb-8 sm:px-10">
              <p className="pr-10 font-hand text-[1.7rem] leading-tight text-cherry">{atual.titulo}</p>
              <p className="mt-5 font-serif text-[1.38rem] leading-relaxed font-medium text-ink">{t(atual.mensagem)}</p>
              <p className="mt-6 text-right font-hand text-2xl text-ink-soft">— {site.assinatura}</p>
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setAtual(null)} className="btn-amor">
                  Fechar e continuar explorando
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialogo>
    </section>
  )
}
