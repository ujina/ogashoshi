import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  title: 'おがさわら行政書士事務所',
  description: '広島市南区の行政書士事務所です。許認可申請、相続・遺言、法人設立などの行政手続と書類作成を取り扱っています。',

  // 最終更新日の表示（Git の履歴から取得）
  lastUpdated: true,

  // ブログ記事に共通の設定（記事ごとの frontmatter に書いた値が優先される）
  transformPageData(pageData) {
    if (pageData.relativePath.startsWith('blog/')) {
      pageData.frontmatter = {
        next: false,
        ...pageData.frontmatter,
      }
    }
  },

  markdown: {
    container: {
      tipLabel: 'ヒント',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '情報',
      detailsLabel: '詳細',
    },
  },

  themeConfig: {
    logo: '/ogashoshi_logo.jpeg',

    nav: [
      { text: 'BLOG', link: '/blog/' },
      { text: '業務案内', link: '/guide/' },
      { text: '報酬表', link: '/fee/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '業務案内',
          items: [
            { text: '事務所案内', link: '/guide/' },
            { text: '事業復活支援金の事前確認', link: '/guide/zizen-kakunin' },
          ],
        },
      ],
      '/fee/': [
        {
          text: '報酬表',
          items: [
            { text: '報酬・費用について', link: '/fee/' },
          ],
        },
      ],
    },

    footer: {
      message: 'Made by Toru Ogasawara with ❤️',
    },

    // 画面の文言を日本語にする
    lastUpdated: { text: '最終更新日' },
    outline: { level: [2, 3], label: '目次' },
    docFooter: { prev: '前のページ', next: '次のページ' },
    returnToTopLabel: 'ページの先頭へ',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: '表示モード',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    notFound: {
      title: 'ページが見つかりません',
      quote: 'お探しのページは移動または削除された可能性があります。',
      linkText: 'トップページへ',
    },
  },
})
