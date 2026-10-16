import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'
import { irPara, useRolagem } from '../hooks/hooks'
import { useMusica } from '../context/Musica'
import { IcCoracao, IcFechar, IcMenu, IcPause, IcPlay, IcSetaCima } from './Icones'

export interface ItemMenu {
  id: string
  rotulo: string
}

export function Navegacao({ itens }: { itens: ItemMenu[] }) {
  const [ids] = useState(() => ['inicio', ...itens.map((i) => i.id)])
  const { progresso, ativa, rolou } = useRolagem(ids)
  const [menuAberto, setMenuAberto] = useState(false)
  const botaoMenu = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuAberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuAberto(false)
        botaoMenu.current?.focus()
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [menuAberto])

  const navegar = (id: string) => {
    setMenuAberto(false)
    irPara(id)
  }

  return (
    <>
      {/* Indicador de progresso */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-cherry"
        style={{ transform: `scaleX(${progresso})` }}
        role="progressbar"
        aria-label="Quanto do nosso mundinho você já viu"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progresso * 100)}
      />

      <header
        className={`fixed inset-x-0 top-[3px] z-30 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          rolou || menuAberto ? 'bg-cream/85 shadow-[0_1px_0_rgb(241_167_188/0.35)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav aria-label="Seções" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navegar('topo')}
            className="flex min-h-11 items-center gap-1.5 rounded-full pr-2 font-hand text-2xl text-ink"
          >
            <span>{site.assinatura}</span>
            <IcCoracao tamanho={16} className="text-cherry" />
            <span>{site.nomeDela}</span>
            <span className="sr-only">— voltar ao início</span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {itens.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navegar(item.id)
                  }}
                  aria-current={ativa === item.id ? 'true' : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-3 text-[0.95rem] font-semibold transition-colors ${
                    ativa === item.id ? 'bg-blush-100 text-cherry-deep' : 'text-ink-soft hover:text-cherry'
                  }`}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={botaoMenu}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-ink shadow-soft lg:hidden"
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <IcFechar tamanho={22} /> : <IcMenu tamanho={22} />}
          </button>
        </nav>

        <div
          id="menu-celular"
          hidden={!menuAberto}
          className="border-t border-blush-100 bg-cream/95 px-4 pt-2 pb-5 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto grid max-w-md grid-cols-2 gap-2">
            {itens.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navegar(item.id)
                  }}
                  aria-current={ativa === item.id ? 'true' : undefined}
                  className={`flex min-h-12 items-center justify-center rounded-2xl px-3 text-center font-semibold ${
                    ativa === item.id ? 'bg-blush-100 text-cherry-deep' : 'bg-paper text-ink'
                  }`}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Botão de voltar ao topo */}
      <button
        type="button"
        onClick={() => irPara('topo')}
        aria-label="Voltar ao topo"
        tabIndex={progresso > 0.08 ? 0 : -1}
        aria-hidden={progresso <= 0.08}
        className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid h-12 w-12 place-items-center rounded-full bg-paper text-cherry shadow-lift transition-all duration-300 hover:bg-blush-50 sm:right-6 sm:bottom-6 ${
          progresso > 0.08 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <IcSetaCima tamanho={22} />
      </button>

      <PlayerMini visivel={rolou} />
    </>
  )
}

/** Player flutuante: aparece quando há música configurada. */
function PlayerMini({ visivel }: { visivel: boolean }) {
  const m = useMusica()
  if (!m.configurada || m.estado === 'erro') return null
  const tocando = m.estado === 'tocando'
  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-30 transition-all duration-300 sm:bottom-6 sm:left-6 ${
        visivel || tocando ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={m.alternar}
        aria-label={tocando ? `Pausar ${m.titulo}` : `Tocar ${m.titulo}`}
        aria-pressed={tocando}
        className="flex h-12 items-center gap-2.5 rounded-full bg-paper py-1.5 pr-4 pl-1.5 text-ink shadow-lift transition hover:bg-blush-50"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cherry text-white">
          {tocando ? <IcPause tamanho={16} /> : <IcPlay tamanho={16} />}
        </span>
        <Equalizador ativo={tocando} />
        <span className="max-w-[9rem] truncate text-sm font-bold sm:max-w-[14rem]">{m.titulo}</span>
      </button>
    </div>
  )
}

export function Equalizador({ ativo, claro = false }: { ativo: boolean; claro?: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
      {[0.9, 0.6, 1, 0.75].map((d, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${claro ? 'bg-white' : 'bg-cherry'} ${ativo ? 'eq-barra' : ''}`}
          style={{ height: ativo ? '100%' : '30%', animationDuration: `${d}s`, animationDelay: `${-i * 0.2}s` }}
        />
      ))}
    </span>
  )
}
