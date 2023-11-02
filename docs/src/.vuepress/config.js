const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'OGASHOSHI',
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
    lastUpdated: true,
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
          title: 'Blog',
          collapsable: false,
        children: [
        //'',
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
  ],

  markdown: {
    anchor: {
      permalink: false
    }
  }

}
