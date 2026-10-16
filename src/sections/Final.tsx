import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { final, rodape } from '../data/textos'
import { semEmojiFinal, t } from '../lib/texto'
import { irPara, useMovimentoReduzido, useNaTela } from '../hooks/hooks'
import { Estrelinhas, Explosao } from '../components/Decoracao'
import { IcCoracao, caminhoCoracao } from '../components/Icones'

/** Corações iluminados que sobem devagar no céu do final. */
function CoracoesDeLuz({ ativos }: { ativos: boolean }) {
  const itens = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${4 + ((i * 37) % 92)}%`,
        size: 12 + ((i * 7) % 16),
        dur: `${9 + (i % 5) * 1.6}s`,
        delay: `${-(i * 1.3)}s`,
        op: 0.35 + ((i * 13) % 40) / 100,
        cor: i % 3 === 0 ? '#f8cf86' : i % 3 === 1 ? '#f1a7bc' : '#e8809e',
      })),
    [],
  )
  if (!ativos) return null
  return (
    <div aria-hidden="true" className="so-com-movimento pointer-events-none absolute inset-0 overflow-hidden">
      {itens.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={c.size}
          height={c.size}
          className="sobe-final absolute -bottom-6"
          style={{ left: c.left, filter: `drop-shadow(0 0 6px ${c.cor})`, '--dur': c.dur, '--delay': c.delay, '--op': c.op } as CSSProperties}
        >
          <path d={caminhoCoracao} fill={c.cor} />
        </svg>
      ))}
    </div>
  )
}

const INTERVALO = 1800

export function Final() {
  const ref = useRef<HTMLDivElement>(null)
  const naTela = useNaTela(ref, { limiar: 0.35, margem: '0px' })
  const reduzido = useMovimentoReduzido()
  const [passo, setPasso] = useState(0)
  const [guardado, setGuardado] = useState(false)
  const ultima = useRef<HTMLDivElement>(null)

  const principal = semEmojiFinal(t(final.principal))
  const mostrarTudo = reduzido

  // Ordem de aparição: chamado → frases → frase principal → "eu te amo" → botão.
  let i = 0
  const iChamado = i++
  const iFrases = final.frases.map(() => i++)
  const iPrincipal = i++
  const iTeAmo = i++
  const iBotao = i++
  const total = i

  useEffect(() => {
    if (!naTela || mostrarTudo) return
    if (passo >= total) return
    const id = window.setTimeout(() => setPasso((p) => p + 1), passo === 0 ? 400 : INTERVALO)
    return () => window.clearTimeout(id)
  }, [naTela, passo, total, mostrarTudo])

  useEffect(() => {
    if (guardado) ultima.current?.focus({ preventScroll: false })
  }, [guardado])

  const visivel = (i: number) => mostrarTudo || passo > i
  const classe = (i: number) => (visivel(i) ? 'frase-surge' : 'opacity-0')

  return (
    <section id="final" aria-labelledby="final-titulo" className="relative outline-none">
      {/* transição suave para o céu */}
      <div aria-hidden="true" className="h-40 bg-gradient-to-b from-cream via-lilac-200 to-night sm:h-56" />

      <div ref={ref} className="relative isolate overflow-hidden bg-night pt-10 pb-28 text-white sm:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-night-soft blur-3xl" />
          <div className="absolute right-[5%] bottom-[10%] h-80 w-80 rounded-full bg-cherry/25 blur-3xl" />
          <div className="absolute top-[45%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-lilac-500/20 blur-3xl" />
        </div>
        <Estrelinhas quantidade={30} semente={77} cor="#fff6e0" className="opacity-70" />
        <CoracoesDeLuz ativos={naTela} />

        <div className="relative mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h2 id="final-titulo" className={`font-hand text-[clamp(2.6rem,2rem+3vw,4rem)] text-blush-200 ${classe(iChamado)}`}>
            {t(final.chamado)}
          </h2>

          {final.frases.map((f, k) => (
            <p
              key={k}
              className={`mt-7 max-w-2xl font-serif text-[clamp(1.35rem,1.1rem+1vw,1.75rem)] leading-relaxed font-medium text-lilac-100 ${classe(iFrases[k])}`}
            >
              {t(f)}
            </p>
          ))}

          <p
            className={`mt-12 max-w-2xl font-serif text-[clamp(2rem,1.3rem+3vw,3.4rem)] leading-[1.15] font-semibold text-white italic [text-shadow:0_0_28px_rgb(232_128_158/0.55)] ${classe(iPrincipal)}`}
          >
            {principal.corpo}
            {principal.emoji && <span className="ml-2 inline-block text-[0.7em] not-italic">{principal.emoji}</span>}
          </p>

          <div className={`mt-12 ${classe(iTeAmo)}`}>
            <p className="font-serif text-[clamp(1.9rem,1.5rem+2vw,2.8rem)] font-semibold text-blush-200">{t(final.euTeAmo)}</p>
            <p className="mt-2 font-hand text-[1.9rem] text-lilac-200">{t(final.assinatura)}</p>
          </div>

          <div className={`relative mt-12 ${classe(iBotao)}`}>
            {!guardado ? (
              <button
                type="button"
                onClick={() => setGuardado(true)}
                className="btn-amor animate-glow text-lg"
                tabIndex={visivel(iBotao) ? 0 : -1}
                aria-hidden={!visivel(iBotao)}
              >
                {t(final.botao)}
              </button>
            ) : (
              <div className="relative">
                <Explosao quantidade={30} semente={99} />
                <div
                  ref={ultima}
                  tabIndex={-1}
                  className="frase-surge relative z-10 mx-auto max-w-md rounded-[2rem] bg-paper px-7 pt-9 pb-8 text-ink shadow-lift"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cherry text-white shadow-lift">
                    <IcCoracao tamanho={26} />
                  </span>
                  <p className="mt-4 font-hand text-[1.9rem] text-cherry">{t(final.ultimaMensagem.titulo)}</p>
                  <p className="mt-3 font-serif text-[1.3rem] leading-relaxed font-medium">{t(final.ultimaMensagem.texto)}</p>
                  <p className="mt-4 font-hand text-2xl text-ink-soft">— {t(final.ultimaMensagem.assinatura)}</p>
                  <button type="button" onClick={() => irPara('topo')} className="btn-suave mt-7">
                    {t(final.ultimaMensagem.voltar)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="relative mt-6 text-center font-hand text-xl text-lilac-200/80">
          {t(rodape)}
        </p>
      </div>
    </section>
  )
}
