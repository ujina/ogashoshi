# おがさわら行政書士事務所 ウェブサイト

VuePress 1 で作っていた旧サイト（GitHub: ujina/ogashoshi）を VitePress で作り直したもの。

## 構成
- `docs/` がサイトの中身。`docs/.vitepress/config.mts` が設定。
- 画像は `docs/public/` に置き、`/ファイル名` で参照する。
- ブログ記事は `docs/blog/*.md`。ファイル名は日付形式（例: `20261112.md`、同じ日に2本目なら `20261112-2.md`）。
- 記事の frontmatter に `title` と `date`（例: `2026-11-12 13:17`、時刻は半角スペース区切り）を書くと、一覧（`docs/blog/posts.data.ts`）に日付の新しい順で並ぶ。`draft: true` の記事は一覧に出ない。
- 一覧ページと記事ページの作りは練習用サイト（vitepress-macmini）に合わせている。記事ごとのサイドバー登録は不要。

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
