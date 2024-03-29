const { description } = require('../../package')

module.exports = {
  locales: {
    '/': {
      lang: 'ja',
    }
  },
  
  /**
   * 　日本語設定
   */
  lang: 'ja',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'おがさわら行政書士事務所',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: '最終更新日',
    nav: [
      {
        text: 'BLOG',
        link: '/blog/',
      },

      {
        text: '業務案内',
        link: '/guide/',
      },
      {
        text: '報酬表',
        link: '/fee/'
      },
      
    ],

    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'zizen-kakunin.md',
          ]
        }
      ],
      
      '/fee/': [
        {
          title: 'Fee',
          collapsable: false,
        children: [
          '',
        ]
        }
      ],

      '/blog/': [
        {
          title: '',
          collapsable: false,
        children: [
          '',
          'haka-jimai',
        ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/google-analytics',
    {
      'ga': 'UA-43569182-17' // UA-00000000-0      
    }
  ],

  markdown: {
    anchor: {
      permalink: false
    }
  }

}
