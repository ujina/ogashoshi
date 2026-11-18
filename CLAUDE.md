# おがさわら行政書士事務所 ウェブサイト

VuePress 1 で作っていた旧サイト（GitHub: ujina/ogashoshi）を VitePress で作り直したもの。

## 構成
- `docs/` がサイトの中身。`docs/.vitepress/config.mts` が設定。
- 画像は `docs/public/` に置き、`/ファイル名` で参照する。
- ブログ記事は `docs/blog/*.md`。ファイル名は日付形式（例: `20261112.md`、同じ日に2本目なら `20261112-2.md`）。
- 記事の frontmatter に `title` と `date`（例: `2026-11-12 13:17`、時刻は半角スペース区切り）を書くと、一覧（`docs/blog/posts.data.ts`）に日付の新しい順で並ぶ。`draft: true` の記事は一覧に出ない。
- 一覧ページと記事ページの作りは練習用サイト（vitepress-macmini）に合わせている。記事ごとのサイドバー登録は不要。
- 記事ページの上には frontmatter の `title` と `date` が自動で表示される（`docs/.vitepress/theme/BlogTitle.vue`）。本文に `# タイトル` は書かない。
- ブログ記事ページの見た目は note 風（`docs/.vitepress/theme/blog-note.css`）。PC は本文 18px・行の高さ 36px・幅 620px、スマホは本文 16px・行の高さ 32px。記事ページには右側の目次を出さない。
- ブログ一覧ページは `docs/blog-index.md`。`config.mts` の `rewrites` で `/blog/` として公開している。`docs/blog/` には記事（と `posts.data.ts`）だけを置く。

## ブログ管理画面（Sveltia CMS）
- https://ogashoshi.com/admin/ からブラウザで記事を書ける。GitHub アカウントでログイン（Netlify の OAuth 経由）。
- 設定は `docs/public/admin/config.yml`。保存すると `vitepress` ブランチに直接コミットされ、Netlify が公開する。
- 管理画面で入れた画像は `docs/public/images/` に保存され、`/images/ファイル名` で参照される。
- ブラウザで記事を書いた後に Mac で作業するときは、必ず最初に `git pull` する。

## 記事の中で使える部品（docs/.vitepress/theme/components/）
- `<LinkCard url="https://..." />` … 相手のページのサムネイル画像・タイトル・説明の付いたカード。中身はビルド時に `docs/.vitepress/linkcard.ts` が取ってくる（取れないときは URL だけのカード）。
- 管理画面では本文を Markdown のモードで書けば、そのまま使える（管理画面のプレビューには表示されない）。

## 作業の約束
- 旧サイトと同じ URL を保つ（`/guide/zizen-kakunin.html` など）。`cleanUrls` は使わない。
- 2台の Mac（Mac mini、MacBook Air）で作業する。受け渡しは GitHub（push / pull）で行い、Dropbox や iCloud などの同期フォルダには置かない。
- `node_modules` とビルド結果は Git に入れない（`.gitignore` 済み）。

## 公開
- Netlify で公開している。ビルド設定はリポジトリ直下の `netlify.toml`。
- 公開先は https://ogashoshi.com 。GitHub は旧サイトと同じ ujina/ogashoshi で、Netlify の本番ブランチは `vitepress`（2026-11-12 に VuePress 版から切り替え）。`vitepress` に push すると自動で公開される。
- 旧 VuePress 版は `master` ブランチに残している。

## コマンド
- `npm install` … 初回のみ
- `npm run docs:dev` … 開発サーバー（http://localhost:5173）
- `npm run docs:build` … 公開用にビルド（`docs/.vitepress/dist` に出力）
