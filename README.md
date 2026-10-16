# Nosso pequeno universo — Damasco ❤️ Emilly

Um site romântico, interativo e responsivo feito em **React + TypeScript + Vite + Tailwind CSS**.
Funciona sem backend: todo o conteúdo (textos, música, data) fica em arquivos fáceis de editar.

---

## 1. Como rodar

Precisa do **Node.js 20.19 ou mais novo** (https://nodejs.org) e do **pnpm**
(se ainda não tiver: `corepack enable` ou `npm install -g pnpm`).

```bash
pnpm install       # instala as dependências (só na primeira vez)
pnpm dev           # abre em http://localhost:5173 e atualiza ao salvar
pnpm build         # verifica os tipos e gera a versão final em dist/
pnpm preview       # mostra a versão final localmente
pnpm test          # testa o cálculo do contador (antes, durante e depois da data)
pnpm typecheck     # só a verificação de TypeScript
```

O `package.json` já autoriza os scripts de instalação do `esbuild` e do `@tailwindcss/oxide`
(`pnpm.onlyBuiltDependencies`), então o pnpm 10 não vai bloqueá-los.

Para testar no celular enquanto edita: `pnpm dev --host` e abra no celular o endereço "Network" que aparecer (mesmo Wi‑Fi).

---

## 2. Onde fica cada coisa

| O que você quer mudar | Arquivo |
|---|---|
| Nome dela, sua assinatura, **data de início**, fuso, música | `src/config/site.ts` |
| Textos da abertura, destaque, títulos, segredo, final | `src/data/textos.ts` |
| Motivos (e os cartões secretos) | `src/data/motivos.ts` |
| A carta do envelope | `src/data/carta.ts` |
| Cartinhas "Abra quando…" | `src/data/cartinhas.ts` |
| Música | `public/audio/` |
| Cores e fontes | `src/index.css` (bloco `@theme`) |

Em qualquer texto, `{nome}` vira "Emilly" e `{assinatura}` vira "Damasco" automaticamente.

---

## 3. Música

1. Coloque o arquivo (MP3 é o mais compatível) em `public/audio/`, ex.: `nossa-musica.mp3`.
2. Em `src/config/site.ts`:
   ```ts
   export const musica = {
     arquivo: 'audio/nossa-musica.mp3',
     titulo: 'Nome da música',
     artista: 'Quem canta',
     volumeInicial: 0.6,
     tocarAoEntrar: true,
   }
   ```
- Com `tocarAoEntrar: true`, a música começa quando ela toca em **"Entrar no nosso mundinho"** (é um clique dela, então os navegadores permitem). Com `false`, só toca quando ela apertar o play.
- Aparece um player na seção "trilha sonora" e um mini player flutuante que acompanha a navegação.
- No iPhone o volume é controlado pelos botões do aparelho (a Apple não deixa sites mudarem), então lá o controle de volume some sozinho.
- Use uma música que você tenha direito de usar (comprada/licenciada, de uso livre ou gravada por você).

---

## 4. Personalizar carta e mensagens

- **Carta**: `src/data/carta.ts` — cada item de `paragrafos` é um parágrafo.
- **Motivos**: `src/data/motivos.ts` — adicione/remova linhas. Ícones disponíveis estão listados no topo do arquivo.
- **Cartinhas "Abra quando…"**: `src/data/cartinhas.ts` — cada uma tem `titulo`, `mensagem` e `cor` (`'rosa'`, `'lavanda'`, `'pessego'`, `'creme'`).
- **Segredo escondido** e **declaração final**: `src/data/textos.ts` (`segredo` e `final`).
- **Data de início**: `src/config/site.ts` → `dataInicio` (mês de 1 a 12). O contador usa o fuso `America/Sao_Paulo`, então mostra o mesmo tempo em qualquer aparelho. Antes da data, vira contagem regressiva; na hora certa, muda sozinho.

### Antes de mandar para ela ⚠️
Em `src/config/site.ts`, mude **`mostrarEspacosVazios` para `false`**.
Assim, se você ainda não tiver colocado a música, o espaço com as instruções de como adicionar some (e a seção sai do menu).

---

## 5. Publicar e mandar o link

Rode `pnpm build`. A pasta `dist/` é o site pronto.

**Jeito mais rápido — Netlify Drop (sem conta de GitHub):**
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `dist/` para a página.
3. Pronto: você recebe um link. Em "Site settings → Change site name" dá para trocar para algo como `nosso-mundinho-emilly.netlify.app`.

**Vercel (recomendado se for atualizar sempre):**
1. Suba o projeto para um repositório no GitHub (inclua o `pnpm-lock.yaml` gerado pelo `pnpm install`).
2. Em https://vercel.com → "Add New Project" → importe o repositório (ele detecta Vite e usa pnpm sozinho por causa do lockfile).
3. Cada vez que você fizer `git push`, o site atualiza.

**GitHub Pages** também funciona (o projeto já usa caminhos relativos).

O site já pede para não aparecer no Google (`noindex`), mas qualquer pessoa com o link consegue abrir — mande só para ela. 💗

---

## 6. O que tem no site

- **Abertura** com coraçãozinho personagem acenando, estrelas, corações flutuando e transição suave.
- **Destaque** com ilustração original de dois personagens de mãos dadas (um damasco 🍑 e uma nuvenzinha rosa).
- **Motivos** em cartões animados + **cartões secretos** que viram ao toque.
- **Contador de amor** em tempo real (dias/horas/minutos/segundos), com regressiva automática antes da data.
- **Trilha sonora** com disco girando, play/pause, volume e mini player.
- **Carta** em envelope que abre com animação e vira papel de carta (o texto fica parado para leitura).
- **8 cartinhas "Abra quando…"** com estado de "já aberta" lembrado no navegador dela.
- **Easter egg**: um coraçãozinho escondido entre as estrelas do contador. 😉
- **Grande final** em céu noturno, frases aparecendo uma a uma, botão "Quero guardar esse momento 💗" com mensagem secreta e volta ao início.
- Menu compacto, barra de progresso, voltar ao topo, navegação por teclado, foco visível, contraste adequado e respeito a "reduzir movimento" do aparelho.

Fontes (Quicksand, Cormorant Garamond e Caveat) estão incluídas no projeto (licença OFL em `src/assets/fonts/licencas/`), então o site não depende de serviços externos.
