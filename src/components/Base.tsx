import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { useNaTela } from '../hooks/hooks'
import { semEmojiFinal } from '../lib/texto'
import { Rabisco } from './Decoracao'
import { IcFechar } from './Icones'

/** Faz o conteúdo surgir suavemente quando entra na tela. */
export function Surge({
  children,
  atraso = 0,
  className = '',
  como: Tag = 'div',
}: {
  children: ReactNode
  atraso?: number
  className?: string
  como?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const visivel = useNaTela(ref)
  return (
    <Tag
      ref={ref}
      data-visivel={visivel}
      className={`surge ${className}`}
      style={{ '--surge-delay': `${atraso}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** Título de seção: chamada manuscrita + título elegante + subtítulo. */
export function CabecalhoSecao({
  chamada,
  titulo,
  subtitulo,
  idTitulo,
  claro = false,
}: {
  chamada: string
  titulo: string
  subtitulo?: string
  idTitulo: string
  claro?: boolean
}) {
  const { corpo, emoji } = semEmojiFinal(titulo)
  return (
    <Surge className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
      <p className={`font-hand text-2xl sm:text-[1.7rem] ${claro ? 'text-blush-200' : 'text-cherry'}`}>{chamada}</p>
      <h2 id={idTitulo} className={`titulo-secao mt-1 ${claro ? 'text-white' : 'text-ink'}`}>
        {corpo}
        {emoji && <span className="ml-2 inline-block text-[0.8em]">{emoji}</span>}
      </h2>
      <Rabisco className={`mx-auto mt-4 ${claro ? 'text-blush-300' : 'text-blush-300'}`} />
      {subtitulo && (
        <p className={`mx-auto mt-4 max-w-xl text-lg ${claro ? 'text-lilac-100' : 'text-ink-soft'}`}>{subtitulo}</p>
      )}
    </Surge>
  )
}

/**
 * Janela (modal) acessível, construída sobre o <dialog> nativo:
 * prende o foco, fecha com Esc e devolve o foco ao botão que a abriu.
 */
export function Dialogo({
  aberto,
  aoFechar,
  rotulo,
  children,
  className = '',
  mostrarFechar = true,
}: {
  aberto: boolean
  aoFechar: () => void
  rotulo: string
  children: ReactNode
  className?: string
  mostrarFechar?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (aberto && !d.open) {
      d.showModal()
      document.body.classList.add('travado')
    } else if (!aberto && d.open) {
      d.close()
    }
    if (!aberto) document.body.classList.remove('travado')
  }, [aberto])

  useEffect(() => () => document.body.classList.remove('travado'), [])

  return (
    <dialog
      ref={ref}
      aria-label={rotulo}
      className={`dialogo ${className}`}
      onCancel={(e) => {
        e.preventDefault()
        aoFechar()
      }}
      onClick={(e) => {
        // Clique fora do conteúdo (no fundo escurecido) fecha.
        if (e.target === e.currentTarget) aoFechar()
      }}
    >
      {aberto && (
        <div className="relative">
          {mostrarFechar && (
            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar"
              className="absolute top-3 right-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-blush-50"
            >
              <IcFechar tamanho={20} />
            </button>
          )}
          {children}
        </div>
      )}
    </dialog>
  )
}
