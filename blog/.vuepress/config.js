const isProd = process.env.NODE_ENV === "production";

module.exports = {
  base:"/blog/",
  title: "yss",
  description: "Just for code.",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`
      }
    ],
    ["meta", { name: "application-name", content: "Sanshi Yin" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Sanshi Yin" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/images/icons/apple-touch-icon.png` }
    ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }]
  ],

  bundler: "@vuepress/vite",

  theme: "vuepress-theme-gungnir",

  themeConfig: {
    repo: "ylighgh/ylighgh.github.io",
    docsDir: "blog",
    docsBranch: "master",
    hitokoto: "https://v1.hitokoto.cn?c=d&c=i", // enable hitokoto (一言) or not?

    // personal information
    personalInfo: {
      name: "Sanshi Yin",
      avatar: "/img/avatar.jpg",
      description: "Learning Miscellaneous.",
      sns: {
        github: "ylighgh",
        email: "yss@gmail.com",
      }
    },

    // header images on home page
    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgba(196, 176, 131, .1)"
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(68, 74, 83, .1)"
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)"
      },
      {
        path: "/img/home-bg/5.jpg"
      }
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "Black Sheep Wall",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "When you are looking at the stars, please put the brightest star shining night sky as my soul.",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
        giscus: {
          repo: "ylighgh/ylighgh.github.io",  // 必须，string，格式：user_name/repo_name
          repoId: "MDEwOlJlcG9zaXRvcnkyNTg3MTE1MTY=",  // 必须，string，在 Giscus 官网上生成
          category: "Q&A",  // 必须，string
          categoryId: "DIC_kwDOD2uf3M4COeAU",  // 必须，string，在 Giscus 官网上生成
          mapping: "pathname",  // 可选，string，default="title"
          reactionsEnabled: "1",  // 可选，boolean，default=true
          lang: "en",  // 可选，string，default="auto"（跟随网站语言，如果 Giscus 不支持你的网站的语言，则会使用 "en"）
          lazyLoad: true,  // 可选，boolean，default=false（如果设为 true，Giscus 的加载将延迟到用户滚动到评论容器附近）
          crossorigin: "anonymous",  // 可选，string，default="anonymous"
          darkTheme: "https://zxh.io/styles/giscus-dark.css"
        },

      mdPlus: {
        all: true,
        mark: true  // 高亮标记（默认：false）
      },
      ga: "G-HCQSX53XFG",
      ba: "75381d210789d3eaf855fa16246860cc",
      chartjs: true,
      mermaid: {
        theme: "default",  // 默认："default"
        darkTheme: "dark"  // 默认："dark"
      }
    },
    // reading time

    navbar: [
      {
        text: "Home",
        link: "/",
        icon: "fa-fort-awesome"
      },
      {
        text: "Tags",
        link: "/tags/",
        icon: "fa-tag"
      },
      {
        text: "Links",
        link: "/links/",
        icon: "fa-satellite-dish"
      },
    ],
      footer:`&nbsp;`

  },

  markdown: {
    extractHeaders: {
      level: [2, 3, 4, 5]
    },
    code: {
      lineNumbers: false
    }
  }

};
