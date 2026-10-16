import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { musica, site } from '../config/site'
import { useMusica } from '../context/Musica'
import { intro } from '../data/textos'
import { t } from '../lib/texto'
import { useMovimentoReduzido } from '../hooks/hooks'
import { CoracaoPersonagem } from '../components/Ilustracoes'
import { CoracoesFlutuantes, Estrelinhas } from '../components/Decoracao'

const atraso = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties

/** Tela de abertura: a surpresa antes de entrar no mundinho. */
export function Entrada({ aoEntrar }: { aoEntrar: () => void }) {
  const [saindo, setSaindo] = useState(false)
  const reduzido = useMovimentoReduzido()
  const botao = useRef<HTMLButtonElement>(null)
  const { configurada, tocar } = useMusica()

  useEffect(() => {
    document.body.classList.add('travado')
    botao.current?.focus({ preventScroll: true })
    return () => document.body.classList.remove('travado')
  }, [])

  const entrar = () => {
    if (saindo) return
    setSaindo(true)
    // O clique dela é a interação que os navegadores exigem para tocar áudio.
    if (musica.tocarAoEntrar && configurada) tocar()
    window.setTimeout(aoEntrar, reduzido ? 0 : 850)
  }

  const [antesDoNome, depoisDoNome] = t(intro.subtitulo).split(site.nomeDela)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="entrada-titulo"
      className={`fixed inset-0 z-50 overflow-y-auto bg-cream ${saindo ? 'entrada-saindo' : ''}`}
    >
      {/* fundo: brilhos suaves, estrelas e corações */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blush-100 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-lilac-100 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-peach/60 blur-3xl" />
      </div>
      <Estrelinhas quantidade={22} semente={5} className="fixed" />
      <CoracoesFlutuantes quantidade={14} semente={9} className="fixed" />

      <div className="relative flex min-h-full flex-col items-center justify-center px-5 pt-10 pb-24 text-center">
        <div className="frase-surge">
          <CoracaoPersonagem className="w-32 animate-bob sm:w-40" />
        </div>

        <p className="frase-surge mt-6 font-hand text-2xl text-ink-soft sm:text-3xl" style={atraso(250)}>
          {t(intro.chamada).replace(site.nomeDela, '').trim()}
        </p>
        <p
          className="frase-surge -mt-1 font-serif text-[clamp(3.6rem,2.4rem+6vw,6.5rem)] leading-none font-semibold text-cherry italic"
          style={atraso(400)}
          aria-hidden="true"
        >
          {site.nomeDela}
        </p>

        <h1
          id="entrada-titulo"
          className="frase-surge mt-6 max-w-xl font-serif text-[clamp(1.75rem,1.3rem+2vw,2.6rem)] leading-tight font-semibold text-balance text-ink"
          style={atraso(700)}
        >
          {t(intro.titulo)}
        </h1>
        <p className="frase-surge mt-4 max-w-md text-lg text-ink-soft" style={atraso(950)}>
          {antesDoNome}
          {depoisDoNome !== undefined && <strong className="font-bold text-cherry-deep">{site.nomeDela}</strong>}
          {depoisDoNome}
        </p>

        <div className="frase-surge mt-9" style={atraso(1200)}>
          <button ref={botao} type="button" onClick={entrar} className="btn-amor animate-glow px-8 text-lg">
            {t(intro.botao)}
          </button>
        </div>

        <p className="frase-surge absolute inset-x-0 bottom-6 font-hand text-xl text-ink-soft" style={atraso(1500)}>
          {t(intro.assinatura)}
        </p>
      </div>
    </div>
  )
}
