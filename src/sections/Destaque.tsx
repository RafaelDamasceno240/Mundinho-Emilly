import { site } from '../config/site'
import { destaque } from '../data/textos'
import { semEmojiFinal, t } from '../lib/texto'
import { irPara } from '../hooks/hooks'
import { CasalIlustracao } from '../components/Ilustracoes'
import { Estrelinhas } from '../components/Decoracao'
import { IcSetaBaixo } from '../components/Icones'
import { Surge } from '../components/Base'

export function Destaque() {
  const { corpo, emoji } = semEmojiFinal(t(destaque.titulo))
  const partes = corpo.split(site.nomeDela)

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden pt-28 pb-16 outline-none sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-blush-100/80 blur-3xl" />
        <div className="absolute bottom-0 left-[-12%] h-[26rem] w-[26rem] rounded-full bg-lilac-100/70 blur-3xl" />
      </div>
      <Estrelinhas quantidade={12} semente={21} className="-z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <div className="text-center lg:text-left">
          <Surge>
            <p className="font-hand text-2xl text-cherry sm:text-3xl">{t(destaque.chamada)}</p>
          </Surge>
          <Surge atraso={120}>
            <h1
              id="inicio-titulo"
              tabIndex={-1}
              className="mt-2 font-serif text-[clamp(2.4rem,1.5rem+4vw,4.4rem)] leading-[1.05] font-semibold tracking-tight text-balance text-ink"
            >
              {partes.map((p, i) => (
                <span key={i}>
                  {i > 0 && <em className="font-semibold text-cherry">{site.nomeDela}</em>}
                  {p}
                </span>
              ))}
              {emoji && <span className="ml-2 inline-block align-middle text-[0.6em]">{emoji}</span>}
            </h1>
          </Surge>
          <Surge atraso={240}>
            <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft sm:text-xl lg:mx-0">{t(destaque.subtitulo)}</p>
          </Surge>
          <Surge atraso={360} className="mt-9">
            <button type="button" className="btn-amor text-lg" onClick={() => irPara('motivos')}>
              {t(destaque.botao)}
              <IcSetaBaixo tamanho={20} />
            </button>
          </Surge>
        </div>

        <Surge atraso={200} className="mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-[8%] -z-10 rounded-full bg-paper shadow-soft" />
            <CasalIlustracao className="w-full" />
          </div>
        </Surge>
      </div>
    </section>
  )
}
