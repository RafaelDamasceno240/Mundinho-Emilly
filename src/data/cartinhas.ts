/**
 * "Abra quando..." — cartinhas para momentos diferentes.
 * Cada uma tem um título (o que aparece no envelope) e uma mensagem.
 * `cor` muda o tom do envelope: 'rosa', 'lavanda', 'pessego', 'creme'.
 */

export type CorCartinha = 'rosa' | 'lavanda' | 'pessego' | 'creme'

export interface Cartinha {
  id: string
  titulo: string
  mensagem: string
  cor: CorCartinha
}

export const cartinhas: Cartinha[] = [
  {
    id: 'saudade',
    titulo: 'Abra quando estiver com saudade.',
    mensagem:
      'Saudade é só o amor lembrando que existe. Enquanto a gente não se vê, fecha os olhos um pouquinho e pensa na próxima vez — porque ela vai chegar, e eu vou estar contando os minutos tanto quanto você.',
    cor: 'rosa',
  },
  {
    id: 'sorrir',
    titulo: 'Abra quando precisar sorrir.',
    mensagem:
      'Missão desta cartinha: te arrancar um sorriso. Imagina eu aqui, digitando código romântico de madrugada e testando se o coraçãozinho flutuava bonitinho. Pois é. Tudo isso por você. Pode rir, eu deixo.',
    cor: 'pessego',
  },
  {
    id: 'especial',
    titulo: 'Abra quando quiser lembrar o quanto é especial.',
    mensagem:
      'Você não precisa fazer nada de extraordinário para ser especial. Você já é — do jeito que fala, do jeito que sente, do jeito que é. Eu admiro você muito mais do que consigo dizer em voz alta.',
    cor: 'lavanda',
  },
  {
    id: 'abraco',
    titulo: 'Abra quando quiser um abraço, mesmo de longe.',
    mensagem:
      'Considere esta cartinha um abraço apertado, daqueles demorados. Se ainda não for suficiente, me chama: o abraço de verdade está guardado e é todo seu.',
    cor: 'creme',
  },
  {
    id: 'dia-dificil',
    titulo: 'Abra quando o dia estiver pesado.',
    mensagem:
      'Nem todo dia precisa ser bom. Hoje você pode só respirar, ir devagar e ser gentil com você mesma. Eu estou do seu lado — nos dias leves e, principalmente, nos que pesam.',
    cor: 'lavanda',
  },
  {
    id: 'insonia',
    titulo: 'Abra quando não conseguir dormir.',
    mensagem:
      'Deita, respira fundo três vezes e lembra: tem alguém nesse mundo que pensa em você com muito carinho antes de dormir também. Boa noite, meu amor. Amanhã a gente continua.',
    cor: 'rosa',
  },
  {
    id: 'duvida',
    titulo: 'Abra quando duvidar de você.',
    mensagem:
      'Se hoje você não está enxergando o quanto é capaz, empresta um pouquinho do meu olhar. Eu vejo uma pessoa forte, linda e que merece todas as coisas boas que estão por vir.',
    cor: 'pessego',
  },
  {
    id: 'futuro',
    titulo: 'Abra quando pensar no futuro.',
    mensagem:
      'Eu não sei tudo o que vem pela frente, mas sei que quero descobrir junto com você — um dia de cada vez, com calma, com carinho e com muita vontade de ver no que isso tudo vai dar.',
    cor: 'creme',
  },
]
