/**
 * Textos das telas principais. Edite à vontade — o site se ajusta sozinho.
 * Dica: `{nome}` é trocado pelo nome dela e `{assinatura}` pela sua assinatura
 * (configurados em src/config/site.ts).
 */

export const intro = {
  chamada: 'para {nome}',
  titulo: 'Oi, meu amor... fiz uma coisinha para você. 💗',
  subtitulo: 'Um pequeno universo, feito com muito amor, só para você, {nome}.',
  botao: 'Entrar no nosso mundinho ✨',
  assinatura: 'feito pelo seu {assinatura}',
}

export const destaque = {
  chamada: 'Nosso pequeno universo',
  titulo: '{nome}, você é uma das partes mais bonitas da minha vida. ❤️',
  subtitulo: 'Preparei esse cantinho para te lembrar de uma coisa: você é muito especial para mim.',
  botao: 'Descobrir o quanto eu te amo',
}

export const secoes = {
  motivos: {
    chamada: 'motivos',
    titulo: 'Se eu fosse contar todos os motivos, a gente ficaria aqui para sempre...',
    subtitulo: 'Então separei alguns. E escondi outros — toque nos cartões fechados.',
  },
  contador: {
    chamada: 'nosso contador de amor',
    titulo: 'Cada segundo com você faz parte da nossa história. 💞',
    /** `{data}` vira a data por extenso, ex.: "31 de agosto de 2026". */
    subtitulo: 'Desde {data}, contando os momentos e tudo o que ainda vamos viver.',
    tituloAntes: 'Nosso próximo capítulo está prestes a começar. 💗',
    subtituloAntes: 'Contando cada segundo até {data}.',
  },
  musica: {
    chamada: 'trilha sonora',
    titulo: 'A trilha sonora do nosso amor',
    subtitulo: 'Aperta o play e deixa tocar enquanto passeia pelo nosso mundinho.',
  },
  carta: {
    chamada: 'uma carta para você',
    // o título desta seção é o texto do envelope, em src/data/carta.ts
  },
  carinhos: {
    chamada: 'abra quando quiser um carinho',
    titulo: 'Cartinhas para qualquer momento',
    subtitulo: 'Escolha uma, abra quando precisar. Elas não acabam: pode voltar sempre.',
  },
}

/** Mensagem do coraçãozinho escondido (easter egg). */
export const segredo = {
  titulo: 'Você me achou!',
  mensagem:
    'Você encontrou meu segredinho... mas o segredo mais bonito é que, por trás de cada detalhe deste site, existe alguém que preparou tudo pensando em você. Com amor, {assinatura}. 💗',
  botao: 'Guardar no coração',
}

/** Grande final. As frases aparecem uma de cada vez, nesta ordem. */
export const final = {
  chamado: '{nome}...',
  frases: [
    'Entre tantas pessoas, tantos caminhos e tantas histórias possíveis, existe uma pessoa para quem eu quis criar tudo isso: você.',
    'Este site pode ser feito de códigos, imagens, músicas e animações, mas a intenção por trás de cada detalhe é muito simples: fazer você se sentir amada.',
  ],
  principal: 'Meu lugar favorito não é um lugar. É onde posso compartilhar a vida com você. ❤️',
  euTeAmo: 'Eu te amo, {nome}.',
  assinatura: 'Com amor, do seu {assinatura}.',
  botao: 'Quero guardar esse momento 💗',
  ultimaMensagem: {
    titulo: 'Uma última coisinha',
    texto:
      'Esse mundinho é seu. Pode voltar aqui sempre que quiser lembrar o quanto você é amada — e, se um dia sentir falta de alguma coisa nele, é só me falar que eu construo.',
    assinatura: '{assinatura}',
    voltar: 'Voltar ao início',
  },
}

export const rodape = 'feito com carinho, linha por linha, pelo seu {assinatura}'
