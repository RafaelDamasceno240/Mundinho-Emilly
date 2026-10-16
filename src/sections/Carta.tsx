import { useEffect, useRef, useState } from 'react'
import { carta } from '../data/carta'
import { secoes } from '../data/textos'
import { t } from '../lib/texto'
import { useMovimentoReduzido } from '../hooks/hooks'
import { CabecalhoSecao, Surge } from '../components/Base'
import { Onda } from '../components/Decoracao'
import { IcCoracao } from '../components/Icones'

type Estado = 'fechado' | 'abrindo' | 'aberto'

export function Carta() {
  const [estado, setEstado] = useState<Estado>('fechado')
  const reduzido = useMovimentoReduzido()
  const tituloCarta = useRef<HTMLParagraphElement>(null)
  const botaoEnvelope = useRef<HTMLButtonElement>(null)
  const primeiraVez = useRef(true)

  useEffect(() => {
    if (estado !== 'abrindo') return
    const id = window.setTimeout(() => setEstado('aberto'), 1400)
    return () => window.clearTimeout(id)
  }, [estado])

  // Leva o foco junto: para a carta ao abrir, de volta ao envelope ao fechar.
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false
      return
    }
    if (estado === 'aberto') tituloCarta.current?.focus({ preventScroll: true })
    if (estado === 'fechado') botaoEnvelope.current?.focus({ preventScroll: true })
  }, [estado])

  const abrir = () => setEstado(reduzido ? 'aberto' : 'abrindo')
  const fechar = () => {
    setEstado('fechado')
    document.getElementById('carta')?.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="carta" aria-labelledby="carta-titulo" className="relative outline-none">
      <Onda cor="var(--color-blush-50)" />
      <div className="bg-blush-50 pt-14 pb-24 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <CabecalhoSecao idTitulo="carta-titulo" chamada={t(secoes.carta.chamada)} titulo={t(carta.envelope)} />

          {estado !== 'aberto' ? (
            <Surge className="flex flex-col items-center pt-16 sm:pt-20">
              <button
                ref={botaoEnvelope}
                type="button"
                onClick={abrir}
                disabled={estado === 'abrindo'}
                aria-label="Abrir a carta"
                className="envelope group block rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1deg] disabled:cursor-default"
                data-estado={estado}
              >
                <span className="envelope-fundo shadow-lift" />
                <span className="envelope-folha linhas-carta" />
                <span className="envelope-bolso" />
                <span className="envelope-aba" />
                {/* selo de cera */}
                <span
                  className={`absolute top-[46%] left-1/2 z-[5] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cherry text-white shadow-lift transition-all duration-500 ${
                    estado === 'abrindo' ? 'scale-50 opacity-0' : 'group-hover:scale-110'
                  }`}
                >
                  <IcCoracao tamanho={24} />
                </span>
                <span className="absolute right-0 bottom-[10%] left-0 z-[5] text-center font-hand text-2xl text-cherry-deep">
                  para você
                </span>
              </button>
              <p className="mt-6 text-sm font-bold tracking-[0.16em] text-ink-soft uppercase" aria-hidden="true">
                {estado === 'abrindo' ? 'abrindo…' : t(carta.dicaEnvelope)}
              </p>
            </Surge>
          ) : (
            <article className="frase-surge papel linhas-carta relative mx-auto max-w-2xl rounded-[1.25rem] px-6 pt-10 pb-10 shadow-lift ring-1 ring-blush-100 sm:px-14 sm:pt-14">
              {/* margem vermelha e coraçõezinhos de canto */}
              <span aria-hidden="true" className="absolute top-0 bottom-0 left-4 w-px bg-blush-300 sm:left-9" />
              <IcCoracao tamanho={16} className="absolute top-5 right-5 text-blush-300" />
              <IcCoracao tamanho={12} className="absolute top-10 right-10 text-lilac-300" />
              <IcCoracao tamanho={14} className="absolute bottom-6 left-8 text-blush-200 sm:left-14" />

              <p
                ref={tituloCarta}
                tabIndex={-1}
                className="pl-3 font-hand text-[2rem] leading-[2.1rem] text-cherry sm:pl-2"
              >
                {t(carta.saudacao)}
              </p>
              <div className="mt-[2.1rem] space-y-[2.1rem] pl-3 font-serif text-[1.28rem] leading-[2.1rem] font-medium text-ink sm:pl-2 sm:text-[1.36rem]">
                {carta.paragrafos.map((p, i) => (
                  <p key={i}>{t(p)}</p>
                ))}
              </div>
              <p className="mt-[2.1rem] pl-3 font-serif text-[1.28rem] leading-[2.1rem] text-ink italic sm:pl-2">
                {t(carta.despedida)}
              </p>
              <p className="pl-3 font-hand text-[2.1rem] leading-[2.1rem] text-cherry sm:pl-2">{t(carta.assinatura)}</p>

              <div className="mt-10 flex justify-center">
                <button type="button" onClick={fechar} className="btn-suave">
                  {t(carta.botaoFechar)}
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
      <Onda cor="var(--color-blush-50)" invertida />
    </section>
  )
}
