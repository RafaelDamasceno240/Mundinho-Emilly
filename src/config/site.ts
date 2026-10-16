/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURAÇÃO PRINCIPAL DO MUNDINHO
 *  Tudo o que é "de vocês" (nomes, data, música) mora aqui.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Nome dela — aparece na abertura, no destaque e na declaração final. */
  nomeDela: 'Emilly',

  /** Sua assinatura. */
  assinatura: 'Damasco',

  /** Título curto que aparece no menu e na aba do navegador. */
  titulo: 'Nosso pequeno universo',

  /**
   * Data em que a história de vocês começou.
   * O mês vai de 1 a 12 (agosto = 8). Hora e minuto são opcionais.
   */
  dataInicio: { ano: 2026, mes: 8, dia: 31, hora: 0, minuto: 0 },

  /** Fuso usado para interpretar a data acima, em qualquer aparelho. */
  fusoHorario: 'America/Sao_Paulo',

  /**
   * Enquanto a música ainda não estiver configurada, `true` mostra na seção
   * "trilha sonora" as instruções de como adicioná-la.
   * Antes de mandar o link para ela, mude para `false`: se não houver música,
   * a seção some (e sai do menu).
   */
  mostrarEspacosVazios: true,
} as const

export const musica = {
  /**
   * Caminho do arquivo dentro de `public/`.
   * Exemplo: coloque o arquivo em `public/audio/nossa-musica.mp3`
   * e escreva aqui: 'audio/nossa-musica.mp3'.
   * Deixe vazio ('') enquanto não tiver a música.
   */
  arquivo: 'audio/nossa-musica.mp3',

  /** Nome da música e de quem canta, para mostrar no player. */
  titulo: 'I Was Made For Loving You',
  artista: 'Kiss',

  /** Volume inicial, de 0 a 1. */
  volumeInicial: 0.1,

  /**
   * Se `true`, a música começa quando ela tocar em "Entrar no nosso mundinho"
   * (é um clique dela, então os navegadores permitem).
   * Se `false`, ela só toca quando apertar o play.
   */
  tocarAoEntrar: true,
} as const
