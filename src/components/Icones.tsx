import type { JSX, SVGProps } from 'react'
import type { IconeMotivo } from '../data/motivos'

type P = SVGProps<SVGSVGElement> & { tamanho?: number }

function Base({ tamanho = 24, children, ...rest }: P) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const caminhoCoracao =
  'M12 20.5c-5.2-3.4-8.6-6.7-8.6-10.6C3.4 7.2 5.4 5 8 5c1.6 0 3 .8 4 2.2C13 5.8 14.4 5 16 5c2.6 0 4.6 2.2 4.6 4.9 0 3.9-3.4 7.2-8.6 10.6z'

export const IcCoracao = ({ cheio = true, ...p }: P & { cheio?: boolean }) => (
  <Base {...p}>
    <path d={caminhoCoracao} fill={cheio ? 'currentColor' : 'none'} />
  </Base>
)

export const IcEstrela = (p: P) => (
  <Base {...p}>
    <path
      d="M12 3.5l2.4 5.1 5.6.7-4.1 3.8 1.1 5.5L12 15.9l-5 2.7 1.1-5.5L4 9.3l5.6-.7z"
      fill="currentColor"
      stroke="none"
    />
  </Base>
)

export const IcBrilho = (p: P) => (
  <Base {...p}>
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" fill="currentColor" stroke="none" />
    <path d="M19 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z" fill="currentColor" stroke="none" />
  </Base>
)

export const IcPlay = (p: P) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
  </Base>
)
export const IcPause = (p: P) => (
  <Base {...p}>
    <rect x="6.5" y="5" width="3.8" height="14" rx="1.2" fill="currentColor" stroke="none" />
    <rect x="13.7" y="5" width="3.8" height="14" rx="1.2" fill="currentColor" stroke="none" />
  </Base>
)
export const IcVolume = ({ mudo, ...p }: P & { mudo?: boolean }) => (
  <Base {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
    {mudo ? <path d="M16 9.5l5 5m0-5l-5 5" /> : <path d="M16 9a4.5 4.5 0 010 6m2.5-8.5a8 8 0 010 11" />}
  </Base>
)
export const IcFechar = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
)
export const IcSetaCima = (p: P) => (
  <Base {...p}>
    <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
  </Base>
)
export const IcSetaBaixo = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5.5 12.5L12 19l6.5-6.5" />
  </Base>
)
export const IcMenu = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
)
export const IcNota = (p: P) => (
  <Base {...p}>
    <path d="M9 17.5V6l10-2v11.5" />
    <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" />
    <circle cx="16.5" cy="15.5" r="2.5" fill="currentColor" />
  </Base>
)

/* Ícones dos motivos ----------------------------------------------------- */
const iconesMotivo: Record<IconeMotivo, (p: P) => JSX.Element> = {
  sol: (p) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity=".18" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
      <path d="M10.3 12.8c.5.7 1 1 1.7 1s1.2-.3 1.7-1" />
    </Base>
  ),
  brilho: IcBrilho,
  xicara: (p) => (
    <Base {...p}>
      <path d="M5 10h11v4a5 5 0 01-5 5h-1a5 5 0 01-5-5z" fill="currentColor" fillOpacity=".18" />
      <path d="M16 11.5h1.5a2.3 2.3 0 010 4.6H16" />
      <path d="M9 3.5c-.8 1 .8 1.8 0 3M12.5 3.5c-.8 1 .8 1.8 0 3" />
    </Base>
  ),
  semente: (p) => (
    <Base {...p}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 2.5-6.5 7-6.5 0 4.5-2.8 6.5-7 6.5z" fill="currentColor" fillOpacity=".18" />
      <path d="M12 15c0-3-2-5-6-5 0 3.6 2.2 5 6 5z" fill="currentColor" fillOpacity=".18" />
    </Base>
  ),
  flor: (p) => (
    <Base {...p}>
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
      <path d="M12 7.8c-1.4-3 2.2-4.6 2.6-1.6M14.2 10c3 -1.4 4.6 2.2 1.6 2.6M12 12.2c1.4 3-2.2 4.6-2.6 1.6M9.8 10c-3 1.4-4.6-2.2-1.6-2.6" fill="currentColor" fillOpacity=".18" />
      <path d="M12 12.5V21M12 18c-1.6-1.8-3.4-2-4.5-1.5" />
    </Base>
  ),
  coracao: (p) => <IcCoracao {...p} />,
  livro: (p) => (
    <Base {...p}>
      <path d="M12 6.5C10 5 7.5 4.6 4 5v13c3.5-.4 6 0 8 1.5 2-1.5 4.5-1.9 8-1.5V5c-3.5-.4-6 0-8 1.5z" fill="currentColor" fillOpacity=".14" />
      <path d="M12 6.5v13" />
    </Base>
  ),
  lua: (p) => (
    <Base {...p}>
      <path d="M19.5 14.5A8 8 0 019.5 4.5a8 8 0 1010 10z" fill="currentColor" fillOpacity=".18" />
      <path d="M17 4l.5 1.5L19 6l-1.5.5L17 8l-.5-1.5L15 6l1.5-.5z" fill="currentColor" stroke="none" />
    </Base>
  ),
  estrela: IcEstrela,
  nuvem: (p) => (
    <Base {...p}>
      <path d="M7 18.5h10a4 4 0 00.6-8 5.5 5.5 0 00-10.6-1A4.5 4.5 0 007 18.5z" fill="currentColor" fillOpacity=".16" />
    </Base>
  ),
}

export function IconeMotivoSvg({ nome, ...p }: P & { nome: IconeMotivo }) {
  const Comp = iconesMotivo[nome] ?? iconesMotivo.coracao
  return <Comp {...p} />
}
