const baseUrl = 'https://github.com/nature-ui/nature-ui';

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} Divine Hycenth. All`,
  author: {
    name: 'Divine Hycenth',
    github: 'https://github.com/dnature',
    twitter: 'https://twitter.com/DivineHycenth',
    linkedin: 'https://linkedin.com/in/dnature',
    email: 'contact@divinehycenth.com',
    website: 'https://divinehycenth.com',
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/develop/website`,
    blogUrl: `${baseUrl}/blog/develop`,
  },
  discord: {
    url: 'https://discord.gg/ZA7NgwkeQ4',
  },
  seo: {
    title: 'Nature UI',
    titleTemplate: '%s - Nature UI',
    description:
      'Modular React based component library with built in support for tailwindcss',
    siteUrl: 'https://nature-ui.com',
    twitter: {
      handle: '@nature-ui',
      site: '@nature-ui',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://nature-ui.com',
      title: 'Nature UI',
      description:
        'Modular React based component library with built in support for tailwindcss',
      site_name:
        'Nature UI: Modular React based component library with built in support for tailwindcss',
      images: [
        {
          url: '/og-image.png',
          width: 1240,
          height: 480,
          alt:
            'Nature UI: Modular React based component library with built in support for tailwindcss',
        },
        {
          url: '/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt:
            'Nature UI: Modular React based component library with built in support for tailwindcss',
        },
      ],
    },
  },
};

export default siteConfig;
