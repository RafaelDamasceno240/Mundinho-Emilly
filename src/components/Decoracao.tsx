import { useMemo, type CSSProperties } from 'react'
import { caminhoCoracao } from './Icones'

/** Gerador pseudoaleatório estável: as decorações não "pulam" entre renderizações. */
function sementeAleatoria(semente: number) {
  let s = semente
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

type CSSVars = CSSProperties & Record<`--${string}`, string | number>

const coresCoracao = ['#f1a7bc', '#e8809e', '#f8c9d6', '#c3b0e8', '#ffcfb4']

/** Corações subindo devagar ao fundo (decorativo, ignorado por leitores de tela). */
export function CoracoesFlutuantes({ quantidade = 12, semente = 7, className = '' }: { quantidade?: number; semente?: number; className?: string }) {
  const itens = useMemo(() => {
    const r = sementeAleatoria(semente)
    return Array.from({ length: quantidade }, (_, i) => ({
      left: `${(i / quantidade) * 100 + r() * (100 / quantidade)}%`,
      size: 10 + Math.round(r() * 18),
      dur: `${14 + r() * 12}s`,
      delay: `${-r() * 20}s`,
      drift: `${Math.round((r() - 0.5) * 60)}px`,
      rot: `${Math.round((r() - 0.5) * 40)}deg`,
      op: (0.35 + r() * 0.45).toFixed(2),
      cor: coresCoracao[Math.floor(r() * coresCoracao.length)],
    }))
  }, [quantidade, semente])

  return (
    <div aria-hidden="true" className={`so-com-movimento pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {itens.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={c.size}
          height={c.size}
          className="animate-float-up absolute -bottom-8"
          style={{ left: c.left, '--dur': c.dur, '--delay': c.delay, '--drift': c.drift, '--rot': c.rot, '--op': c.op } as CSSVars}
        >
          <path d={caminhoCoracao} fill={c.cor} />
        </svg>
      ))}
    </div>
  )
}

/** Estrelinhas piscando. */
export function Estrelinhas({
  quantidade = 18,
  semente = 3,
  cor = '#f8cf86',
  className = '',
}: {
  quantidade?: number
  semente?: number
  cor?: string
  className?: string
}) {
  const itens = useMemo(() => {
    const r = sementeAleatoria(semente)
    return Array.from({ length: quantidade }, () => ({
      left: `${r() * 100}%`,
      top: `${r() * 100}%`,
      size: 6 + Math.round(r() * 10),
      dur: `${2.4 + r() * 3}s`,
      delay: `${-r() * 4}s`,
      ponto: r() > 0.55,
    }))
  }, [quantidade, semente])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {itens.map((e, i) => (
        <span
          key={i}
          className="animate-twinkle absolute block"
          style={{ left: e.left, top: e.top, width: e.size, height: e.size, '--dur': e.dur, '--delay': e.delay } as CSSVars}
        >
          {e.ponto ? (
            <span className="block h-1/2 w-1/2 translate-x-1/2 translate-y-1/2 rounded-full" style={{ background: cor }} />
          ) : (
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path d="M12 2c.7 5.6 2.4 7.3 8 8-5.6.7-7.3 2.4-8 8-.7-5.6-2.4-7.3-8-8 5.6-.7 7.3-2.4 8-8z" fill={cor} />
            </svg>
          )}
        </span>
      ))}
    </div>
  )
}

/** Explosão de corações e estrelas a partir do centro do elemento pai. */
export function Explosao({ quantidade = 22, semente = 11 }: { quantidade?: number; semente?: number }) {
  const itens = useMemo(() => {
    const r = sementeAleatoria(semente)
    return Array.from({ length: quantidade }, (_, i) => {
      const angulo = (i / quantidade) * Math.PI * 2 + r() * 0.4
      const dist = 120 + r() * 160
      return {
        dx: `${Math.cos(angulo) * dist}px`,
        dy: `${Math.sin(angulo) * dist}px`,
        s: (0.7 + r() * 0.8).toFixed(2),
        r: `${Math.round((r() - 0.5) * 300)}deg`,
        delay: `${(r() * 0.25).toFixed(2)}s`,
        estrela: i % 3 === 0,
        cor: i % 3 === 0 ? '#f8cf86' : coresCoracao[i % coresCoracao.length],
        tam: 14 + Math.round(r() * 14),
      }
    })
  }, [quantidade, semente])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {itens.map((f, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={f.tam}
          height={f.tam}
          className="faisca"
          style={{ '--dx': f.dx, '--dy': f.dy, '--s': f.s, '--r': f.r, '--delay': f.delay } as CSSVars}
        >
          {f.estrela ? (
            <path d="M12 2c.7 5.6 2.4 7.3 8 8-5.6.7-7.3 2.4-8 8-.7-5.6-2.4-7.3-8-8 5.6-.7 7.3-2.4 8-8z" fill={f.cor} />
          ) : (
            <path d={caminhoCoracao} fill={f.cor} />
          )}
        </svg>
      ))}
    </div>
  )
}

/** Divisória ondulada desenhada à mão entre seções. */
export function Onda({ cor, invertida = false, className = '' }: { cor: string; invertida?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`block h-8 w-full sm:h-12 ${invertida ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M0 34C120 14 240 12 360 26s240 30 360 18 240-34 360-30 240 26 360 22V60H0z"
        fill={cor}
      />
    </svg>
  )
}

/** Rabisco desenhado à mão para sublinhar títulos. */
export function Rabisco({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 14" className={`h-3 w-32 ${className}`} preserveAspectRatio="none">
      <path
        d="M3 9c22-6 40-6 56-2s30 5 46 0 36-6 52-2 26 4 40 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
