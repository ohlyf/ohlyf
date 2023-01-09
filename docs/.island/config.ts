import { defineConfig } from "islandjs";

function getI18nHelper(lang: "zh" | "en") {
  const cn = lang === "zh";
  const prefix = cn ? "/zh" : "/en";
  // 用于生成带语言前缀的链接
  const getLink = (str: string) => `${prefix}${str}`;
  // 用于生成不同语言的文本
  const getText = (cnText: string, enText: string) => (cn ? cnText : enText);
  return { getText, getLink };
}

function getNavbar(lang: "zh" | "en") {
  const { getLink, getText } = getI18nHelper(lang);
  return [
    {
      text: getText("主页", "Home"),
      link: getLink("/"),
    },
  ];
}

function getSidebar(lang: "zh" | "en") {
  const { getLink, getText } = getI18nHelper(lang);

  return {
    [getLink("/guide/")]: [
      {
        text: getText("介绍", "Getting Started"),
        items: [
          {
            text: getText("快速开始", "Getting Started"),
            link: getLink("/zh/"),
          },
        ],
      },
    ],
  };
}
export default defineConfig({
  // 具体内容
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
      },
    ],
    sidebar: {
      "/guide": [
        {
          text: "Guide",
          items: [
            {
              text: "Getting Started",
              link: "/guide/getting-started",
            },
          ],
        },
      ],
    },
    locales: {
      "/en/": {
        lang: "en",
        title: "My Site",
        description: "My Site",
        navbar: getNavbar("en"),
        sidebar: getSidebar("en"),
      },
      "/zh/": {
        lang: "zh",
        title: "我的站点",
        description: "我的站点",
        navbar: getNavbar("zh"),
        sidebar: getSidebar("zh"),
      },
    },
  },
});
