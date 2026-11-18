// docs/.vitepress/linkcard.ts
// 記事に書いた <LinkCard url="..." /> の相手ページを、ビルド時（と開発サーバーで開いたとき）に読みに行き、
// サムネイル画像・タイトル・説明（OGP）を取り出して、そのページの frontmatter.linkCards に入れる。
// 表示は theme/components/LinkCard.vue が行う。
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface LinkCardData {
  url: string
  title: string
  description: string
  image: string
  siteName: string
}

// 同じ URL を何度も読みに行かないよう、動いている間だけ覚えておく
const cache = new Map<string, Promise<LinkCardData>>()

// 記事の中の <LinkCard url="..."> をすべて拾う
const TAG_RE = /<LinkCard\b[^>]*?\burl\s*=\s*(["'])(https?:\/\/[^"']+)\1/g

export async function collectLinkCards(
  srcDir: string,
  filePath: string,
): Promise<Record<string, LinkCardData> | undefined> {
  let source: string
  try {
    source = await readFile(join(srcDir, filePath), 'utf-8')
  } catch {
    return undefined
  }
  const urls = [...new Set([...source.matchAll(TAG_RE)].map((m) => m[2]))]
  if (urls.length === 0) return undefined

  const entries = await Promise.all(urls.map(async (url) => [url, await getLinkCard(url)] as const))
  return Object.fromEntries(entries)
}

export function getLinkCard(url: string): Promise<LinkCardData> {
  let p = cache.get(url)
  if (!p) {
    p = fetchLinkCard(url)
    cache.set(url, p)
  }
  return p
}

async function fetchLinkCard(url: string): Promise<LinkCardData> {
  const fallback: LinkCardData = { url, title: '', description: '', image: '', siteName: hostname(url) }
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VitePress-LinkCard/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    if (!res.ok) {
      console.warn(`[LinkCard] ${url} を読めませんでした（HTTP ${res.status}）`)
      return fallback
    }
    const html = decodeHtml(new Uint8Array(await res.arrayBuffer()), res.headers.get('content-type') || '')
    return { ...parseOgp(html, res.url || url), url }
  } catch (e) {
    console.warn(`[LinkCard] ${url} を読めませんでした（${(e as Error).message}）`)
    return fallback
  }
}

// 文字コード（UTF-8 / Shift_JIS / EUC-JP など）を見分けて文字列にする
export function decodeHtml(bytes: Uint8Array, contentType: string): string {
  let charset = /charset\s*=\s*["']?([\w-]+)/i.exec(contentType)?.[1]
  if (!charset) {
    const head = new TextDecoder('latin1').decode(bytes.slice(0, 4096))
    charset =
      /<meta[^>]+charset\s*=\s*["']?([\w-]+)/i.exec(head)?.[1] ||
      /<meta[^>]+content\s*=\s*["'][^"']*charset=([\w-]+)/i.exec(head)?.[1]
  }
  try {
    return new TextDecoder(charset || 'utf-8').decode(bytes)
  } catch {
    return new TextDecoder('utf-8').decode(bytes)
  }
}

export function parseOgp(html: string, pageUrl: string): LinkCardData {
  const head = html.slice(0, 200_000)
  const meta: Record<string, string> = {}
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    const attrs = parseAttrs(tag)
    const key = (attrs.property || attrs.name || '').toLowerCase()
    if (key && attrs.content !== undefined && !(key in meta)) meta[key] = decodeEntities(attrs.content).trim()
  }
  const titleTag = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head)?.[1]
  const title = meta['og:title'] || meta['twitter:title'] || (titleTag ? decodeEntities(titleTag).trim() : '')
  const description = meta['og:description'] || meta['twitter:description'] || meta['description'] || ''
  const rawImage = meta['og:image'] || meta['og:image:url'] || meta['twitter:image'] || meta['twitter:image:src'] || ''
  let image = ''
  if (rawImage) {
    try {
      image = new URL(rawImage, pageUrl).href
    } catch {
      image = ''
    }
  }
  const siteName = meta['og:site_name'] || hostname(pageUrl)
  return { url: pageUrl, title: title.replace(/\s+/g, ' '), description: description.replace(/\s+/g, ' '), image, siteName }
}

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g
  let m: RegExpExecArray | null
  while ((m = re.exec(tag))) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? ''
  return attrs
}

function decodeEntities(s: string): string {
  const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
  return s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (all, code: string) => {
    if (code[0] === '#') {
      const n = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : all
    }
    return named[code.toLowerCase()] ?? all
  })
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}
