import { useEffect, useState } from 'react'
import { site } from './config/site'
import { ProvedorMusica } from './context/Musica'
import { Navegacao, type ItemMenu } from './components/Navegacao'
import { Entrada } from './sections/Entrada'
import { Destaque } from './sections/Destaque'
import { Motivos } from './sections/Motivos'
import { Contador } from './sections/Contador'
import { Trilha, trilhaVisivel } from './sections/Trilha'
import { Carta } from './sections/Carta'
import { Cartinhas } from './sections/Cartinhas'
import { Final } from './sections/Final'

const itensMenu: ItemMenu[] = [
  { id: 'motivos', rotulo: 'Motivos' },
  { id: 'contador', rotulo: 'Contador' },
  ...(trilhaVisivel ? [{ id: 'musica', rotulo: 'Música' }] : []),
  { id: 'carta', rotulo: 'Carta' },
  { id: 'carinhos', rotulo: 'Carinhos' },
  { id: 'final', rotulo: 'Para você' },
]

export default function App() {
  const [entrou, setEntrou] = useState(false)

  useEffect(() => {
    document.title = `${site.titulo} · ${site.assinatura} & ${site.nomeDela}`
  }, [])

  const aoEntrar = () => {
    setEntrou(true)
    window.scrollTo(0, 0)
    requestAnimationFrame(() => document.getElementById('inicio-titulo')?.focus({ preventScroll: true }))
  }

  return (
    <ProvedorMusica>
      {!entrou && <Entrada aoEntrar={aoEntrar} />}

      <div inert={!entrou} aria-hidden={!entrou}>
        <a
          href="#motivos"
          className="sr-only z-50 rounded-full bg-cherry px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <Navegacao itens={itensMenu} />
        <main>
          <Destaque />
          <Motivos />
          <Contador />
          {trilhaVisivel && <Trilha />}
          <Carta />
          <Cartinhas />
          <Final />
        </main>
      </div>
    </ProvedorMusica>
  )
}
