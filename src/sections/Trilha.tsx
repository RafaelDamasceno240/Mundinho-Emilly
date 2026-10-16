import { useId } from 'react'
import { musica, site } from '../config/site'
import { secoes } from '../data/textos'
import { t } from '../lib/texto'
import { useMusica } from '../context/Musica'
import { CabecalhoSecao, Surge } from '../components/Base'
import { Equalizador } from '../components/Navegacao'
import { IcCoracao, IcNota, IcPause, IcPlay, IcVolume } from '../components/Icones'

export const trilhaVisivel = site.mostrarEspacosVazios || musica.arquivo.trim().length > 0

function Disco({ girando }: { girando: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-44 shrink-0 animate-[spin_7s_linear_infinite] rounded-full shadow-lift sm:w-52"
      style={{
        animationPlayState: girando ? 'running' : 'paused',
        background:
          'radial-gradient(circle, #b4193f 0 22%, #2b1d3f 22.5% 24%, transparent 24.5%), repeating-radial-gradient(circle, #2b1d3f 0 2px, #3a2752 2.5px 4px)',
      }}
    >
      <span className="absolute inset-0 grid place-items-center text-white">
        <IcCoracao tamanho={22} />
      </span>
      <span className="absolute top-[14%] left-[22%] h-[30%] w-[14%] rotate-[35deg] rounded-full bg-white/10 blur-sm" />
    </div>
  )
}

export function Trilha() {
  const m = useMusica()
  const idVolume = useId()
  const s = secoes.musica
  const tocando = m.estado === 'tocando'

  return (
    <section id="musica" aria-labelledby="musica-titulo" className="relative bg-cream py-20 outline-none sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <CabecalhoSecao idTitulo="musica-titulo" chamada={t(s.chamada)} titulo={t(s.titulo)} subtitulo={t(s.subtitulo)} />

        <Surge>
          {!m.configurada ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[2rem] border-2 border-dashed border-lilac-300 bg-lilac-50 p-8 text-center sm:flex-row sm:text-left">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-paper text-lilac-500 shadow-soft">
                <IcNota tamanho={36} />
              </span>
              <div>
                <p className="font-hand text-[1.7rem] leading-tight text-night-soft">Aqui vai tocar a nossa música.</p>
                <p className="mt-2 text-sm leading-relaxed font-semibold text-ink-soft">
                  Para adicionar: coloque o arquivo de áudio (MP3) em <code className="rounded bg-paper px-1.5 py-0.5 text-cherry-deep">public/audio/</code> e
                  escreva o caminho em <code className="rounded bg-paper px-1.5 py-0.5 text-cherry-deep">src/config/site.ts</code> → <code className="rounded bg-paper px-1.5 py-0.5 text-cherry-deep">musica.arquivo</code>.
                </p>
              </div>
            </div>
          ) : (
            <div className="papel mx-auto flex max-w-2xl flex-col items-center gap-8 rounded-[2rem] p-7 shadow-soft ring-1 ring-blush-100 sm:flex-row sm:p-9">
              <Disco girando={tocando} />
              <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
                <p className="text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
                  {tocando ? 'tocando agora' : m.estado === 'carregando' ? 'carregando…' : 'pronta para tocar'}
                </p>
                <p className="mt-1 font-serif text-[2rem] leading-tight font-semibold text-ink">{m.titulo}</p>
                {m.artista && <p className="font-semibold text-ink-soft">{m.artista}</p>}

                {m.estado === 'erro' ? (
                  <p role="alert" className="mt-5 rounded-2xl bg-blush-50 px-4 py-3 text-sm font-semibold text-cherry-deep">
                    Não consegui carregar a música. Confira se o arquivo está em <code>public/{musica.arquivo}</code>.
                  </p>
                ) : (
                  <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-5 sm:justify-start">
                    <button
                      type="button"
                      onClick={m.alternar}
                      aria-pressed={tocando}
                      aria-label={tocando ? 'Pausar música' : 'Tocar música'}
                      className="grid h-16 w-16 place-items-center rounded-full bg-cherry text-white shadow-lift transition hover:bg-cherry-deep active:scale-95"
                    >
                      {tocando ? <IcPause tamanho={28} /> : <IcPlay tamanho={28} />}
                    </button>
                    <Equalizador ativo={tocando} />
                    {m.podeVolume && (
                      <div className="flex min-w-[10rem] flex-1 items-center gap-2 text-ink-soft">
                        <IcVolume mudo={m.volume === 0} tamanho={22} />
                        <label htmlFor={idVolume} className="sr-only">
                          Volume
                        </label>
                        <input
                          id={idVolume}
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={m.volume}
                          onChange={(e) => m.definirVolume(Number(e.target.value))}
                          className="h-11 w-full cursor-pointer accent-cherry"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Surge>
      </div>
    </section>
  )
}
