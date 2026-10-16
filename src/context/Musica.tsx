import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { musica } from '../config/site'

export type EstadoMusica = 'sem-arquivo' | 'pronta' | 'carregando' | 'tocando' | 'pausada' | 'erro'

interface ContextoMusica {
  estado: EstadoMusica
  configurada: boolean
  volume: number
  /** iPhone/iPad não deixam sites mudarem o volume: lá o controle fica oculto. */
  podeVolume: boolean
  titulo: string
  artista: string
  alternar: () => void
  tocar: () => void
  definirVolume: (v: number) => void
}

const Ctx = createContext<ContextoMusica | null>(null)

export function ProvedorMusica({ children }: { children: ReactNode }) {
  const configurada = musica.arquivo.trim().length > 0
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [estado, setEstado] = useState<EstadoMusica>(configurada ? 'pronta' : 'sem-arquivo')
  const [volume, setVolume] = useState<number>(musica.volumeInicial)
  const [podeVolume] = useState(() => {
    if (typeof Audio === 'undefined') return false
    const teste = new Audio()
    teste.volume = 0.5
    return teste.volume === 0.5
  })

  // Cria o elemento de áudio uma única vez (só se houver arquivo configurado).
  useEffect(() => {
    if (!configurada) return
    const audio = new Audio()
    audio.src = musica.arquivo
    audio.preload = 'metadata'
    audio.loop = true
    audio.volume = musica.volumeInicial
    const aoTocar = () => setEstado('tocando')
    const aoPausar = () => setEstado((e) => (e === 'erro' ? e : 'pausada'))
    const aoEsperar = () => setEstado('carregando')
    const aoErro = () => setEstado('erro')
    audio.addEventListener('playing', aoTocar)
    audio.addEventListener('pause', aoPausar)
    audio.addEventListener('waiting', aoEsperar)
    audio.addEventListener('error', aoErro)
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeEventListener('playing', aoTocar)
      audio.removeEventListener('pause', aoPausar)
      audio.removeEventListener('waiting', aoEsperar)
      audio.removeEventListener('error', aoErro)
      audio.src = ''
      audioRef.current = null
    }
  }, [configurada])

  const tocar = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setEstado('carregando')
    audio.play().catch(() => {
      // Bloqueado pelo navegador ou arquivo inválido: volta a esperar o clique.
      setEstado(audio.error ? 'erro' : 'pausada')
    })
  }, [])

  const alternar = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) tocar()
    else audio.pause()
  }, [tocar])

  const definirVolume = useCallback((v: number) => {
    const valor = Math.min(1, Math.max(0, v))
    setVolume(valor)
    if (audioRef.current) audioRef.current.volume = valor
  }, [])

  const valor = useMemo<ContextoMusica>(
    () => ({
      estado,
      configurada,
      volume,
      podeVolume,
      titulo: musica.titulo || 'A nossa música',
      artista: musica.artista,
      alternar,
      tocar,
      definirVolume,
    }),
    [estado, configurada, volume, podeVolume, alternar, tocar, definirVolume],
  )

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useMusica(): ContextoMusica {
  const c = useContext(Ctx)
  if (!c) throw new Error('useMusica precisa estar dentro de <ProvedorMusica>')
  return c
}
