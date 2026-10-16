/**
 * Motivos pelos quais eu te amo.
 * - Para adicionar: copie uma linha `{ texto: '...', icone: '...' }` e mude o texto.
 * - Para remover: apague a linha.
 * - Ícones disponíveis: 'sol', 'brilho', 'xicara', 'semente', 'flor', 'coracao', 'livro', 'lua', 'estrela', 'nuvem'
 */

export type IconeMotivo =
  | 'sol'
  | 'brilho'
  | 'xicara'
  | 'semente'
  | 'flor'
  | 'coracao'
  | 'livro'
  | 'lua'
  | 'estrela'
  | 'nuvem'

export interface Motivo {
  texto: string
  icone: IconeMotivo
}

export const motivos: Motivo[] = [
  { texto: 'Amo seu sorriso e a forma como ele pode deixar meu dia mais bonito.', icone: 'sol' },
  { texto: 'Amo os pequenos detalhes que fazem você ser quem é.', icone: 'brilho' },
  { texto: 'Amo poder compartilhar momentos simples com você.', icone: 'xicara' },
  { texto: 'Amo a ideia de construir lembranças e sonhos ao seu lado.', icone: 'semente' },
  { texto: 'Amo seu jeito, suas manias e tudo aquilo que faz você ser única.', icone: 'flor' },
  { texto: 'Amo poder chamar você de meu amor.', icone: 'coracao' },
  { texto: 'Amo pensar em todas as histórias que ainda podemos viver.', icone: 'livro' },
  { texto: 'Amo você por ser você, não por precisar ser perfeita.', icone: 'lua' },
]

/** Cartões secretos: aparecem fechados e só revelam o texto quando ela toca. */
export const motivosSecretos: Motivo[] = [
  { texto: 'Amo que você me faz querer ser uma pessoa melhor todos os dias.', icone: 'estrela' },
  { texto: 'Amo a calma que eu sinto quando penso em você.', icone: 'nuvem' },
  { texto: 'Amo saber que isso tudo ainda é só o começo.', icone: 'semente' },
  { texto: 'Eu ia escrever mais um motivo aqui, mas a verdade é que eu amo você inteira.', icone: 'coracao' },
]
