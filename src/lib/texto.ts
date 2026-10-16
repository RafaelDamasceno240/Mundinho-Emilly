import { site } from '../config/site'

/** Troca `{nome}` e `{assinatura}` pelos valores configurados. */
export function t(texto: string, extras: Record<string, string> = {}): string {
  const valores: Record<string, string> = {
    nome: site.nomeDela,
    assinatura: site.assinatura,
    ...extras,
  }
  return texto.replace(/\{(\w+)\}/g, (trecho, chave: string) => valores[chave] ?? trecho)
}

/** Separa o emoji final (se houver) para estilizá-lo à parte. */
export function semEmojiFinal(texto: string): { corpo: string; emoji: string } {
  const m = texto.match(/^(.*?)(\s*\p{Extended_Pictographic}[\p{Extended_Pictographic}️‍]*)$/u)
  if (!m) return { corpo: texto, emoji: '' }
  return { corpo: m[1], emoji: m[2].trim() }
}
