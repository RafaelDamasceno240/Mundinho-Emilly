import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react'

/* Preferência de movimento reduzido ------------------------------------- */
const QUERY_MOVIMENTO = '(prefers-reduced-motion: reduce)'

function assinarMovimento(callback: () => void) {
  const mq = window.matchMedia(QUERY_MOVIMENTO)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

export function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(
    assinarMovimento,
    () => window.matchMedia(QUERY_MOVIMENTO).matches,
    () => false,
  )
}

/* Elemento visível na tela ---------------------------------------------- */
export function useNaTela<T extends Element>(
  ref: RefObject<T | null>,
  { umaVez = true, margem = '0px 0px -12% 0px', limiar = 0.12 } = {},
): boolean {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          if (umaVez) obs.disconnect()
        } else if (!umaVez) {
          setVisivel(false)
        }
      },
      { rootMargin: margem, threshold: limiar },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, umaVez, margem, limiar])

  return visivel
}

/* Relógio que bate a cada segundo, alinhado à virada do segundo ---------- */
export function useAgora(): number {
  const [agora, setAgora] = useState(() => Date.now())

  useEffect(() => {
    let timeout: number
    const tick = () => {
      const n = Date.now()
      setAgora(n)
      timeout = window.setTimeout(tick, 1000 - (n % 1000) + 5)
    }
    timeout = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5)
    // Ao voltar para a aba, atualiza na hora (celulares pausam timers).
    const aoVoltar = () => {
      if (document.visibilityState === 'visible') setAgora(Date.now())
    }
    document.addEventListener('visibilitychange', aoVoltar)
    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('visibilitychange', aoVoltar)
    }
  }, [])

  return agora
}

/* Rolagem: progresso da página e seção ativa ----------------------------- */
export function useRolagem(ids: readonly string[]) {
  const [estado, setEstado] = useState({ progresso: 0, ativa: '', rolou: false })

  useEffect(() => {
    let frame = 0
    const medir = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const y = window.scrollY
      const progresso = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      const linha = window.innerHeight * 0.35
      let ativa = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= linha) ativa = id
      }
      setEstado((anterior) =>
        anterior.progresso === progresso && anterior.ativa === ativa && anterior.rolou === y > 40
          ? anterior
          : { progresso, ativa, rolou: y > 40 },
      )
    }
    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [ids])

  return estado
}

/* Rolagem suave que respeita movimento reduzido -------------------------- */
export function irPara(id: string) {
  const el = id === 'topo' ? document.body : document.getElementById(id)
  if (!el) return
  const reduzido = window.matchMedia(QUERY_MOVIMENTO).matches
  if (id === 'topo') {
    window.scrollTo({ top: 0, behavior: reduzido ? 'auto' : 'smooth' })
  } else {
    el.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'start' })
  }
  // Move o foco para o destino, para quem navega por teclado/leitor de tela.
  const alvo = id === 'topo' ? document.getElementById('inicio') : el
  if (alvo) {
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1')
    alvo.focus({ preventScroll: true })
  }
}

/* Guarda pequena no navegador (falha em silêncio) ------------------------ */
export function lerLocal<T>(chave: string, padrao: T): T {
  try {
    const bruto = window.localStorage.getItem(chave)
    return bruto ? (JSON.parse(bruto) as T) : padrao
  } catch {
    return padrao
  }
}

export function gravarLocal(chave: string, valor: unknown) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    /* sem armazenamento disponível — tudo bem */
  }
}
