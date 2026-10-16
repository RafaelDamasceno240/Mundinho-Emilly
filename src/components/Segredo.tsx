import { segredo } from '../data/textos'
import { t } from '../lib/texto'
import { Dialogo } from './Base'
import { Explosao } from './Decoracao'
import { IcCoracao } from './Icones'

/** Easter egg: o coraçãozinho escondido e a declaração secreta. */
export function SegredoEscondido({
  aberto,
  aoAbrir,
  aoFechar,
  className = '',
}: {
  aberto: boolean
  aoAbrir: () => void
  aoFechar: () => void
  className?: string
}) {
  return (
    <>
      <button
        type="button"
        onClick={aoAbrir}
        aria-label="Um coraçãozinho escondido"
        className={`group grid h-11 w-11 place-items-center rounded-full ${className}`}
      >
        <IcCoracao
          tamanho={15}
          className="animate-twinkle text-blush-300 transition-transform duration-300 group-hover:scale-150 group-hover:text-cherry group-focus-visible:scale-150 group-focus-visible:text-cherry"
          style={{ ['--dur' as string]: '4.5s' }}
        />
      </button>

      <Dialogo aberto={aberto} aoFechar={aoFechar} rotulo={t(segredo.titulo)} className="dialogo-segredo" mostrarFechar={false}>
        <Explosao quantidade={26} />
        <div className="relative z-10 overflow-hidden rounded-[2rem] bg-night px-7 pt-12 pb-8 text-center text-white shadow-lift sm:px-10">
          <div aria-hidden="true" className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cherry/40 blur-3xl" />
          <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-cherry shadow-lift">
            <IcCoracao tamanho={30} className="text-white" />
          </span>
          <p className="relative mt-5 font-hand text-3xl text-blush-200">{t(segredo.titulo)}</p>
          <p className="relative mt-4 font-serif text-[1.45rem] leading-snug font-medium italic sm:text-[1.6rem]">
            {t(segredo.mensagem)}
          </p>
          <button type="button" onClick={aoFechar} className="btn-amor relative mt-8">
            {t(segredo.botao)}
          </button>
        </div>
      </Dialogo>
    </>
  )
}
