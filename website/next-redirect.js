async function redirect() {
  return [
    {
      source: "/discord",
      destination: 'https://discord.gg/ZA7NgwkeQ4',
      permanent: true,
    },
    // GENERAL
    {
      source: "/getting-started",
      destination: "/docs/getting-started",
      permanent: true,
    },
    {
      source: "/docs",
      destination: "/docs/getting-started",
      permanent: true,
    },
    {
      source: "/configuration",
      destination: "/docs/theming/configuration",
      permanent: true,
    },
    {
      source: "/box",
      destination: "/docs/layout/box",
      permanent: true,
    },
    {
      source: "/container",
      destination: "/docs/layout/container",
      permanent: true,
    },
    {
      source: "/stack",
      destination: "/docs/layout/stack",
      permanent: true,
    },
    {
      source: "/button",
      destination: "/docs/form/button",
      permanent: true,
    },
    {
      source: "/checkbox",
      destination: "/docs/form/checkbox",
      permanent: true,
    },
    {
      source: "/form-control",
      destination: "/docs/form/form-control",
      permanent: true,
    },
    {
      source: "/icon-button",
      destination: "/docs/form/icon-button",
      permanent: true,
    },
    {
      source: "/input",
      destination: "/docs/form/input",
      permanent: true,
    },
    {
      source: "/radio",
      destination: "/docs/form/radio",
      permanent: true,
    },
    {
      source: "/badge",
      destination: "/docs/data-display/badge",
      permanent: true,
    },
    {
      source: "/close-button",
      destination: "/docs/components/close-button",
      permanent: true,
    },
    {
      source: "/divider",
      destination: "/docs/data-display/divider",
      permanent: true,
    },
    {
      source: "/alert",
      destination: "/docs/feedback/alert",
      permanent: true,
    },
    {
      source: "/circular-progress",
      destination: "/docs/feedback/circular-progress",
      permanent: true,
    },
    {
      source: "/progress",
      destination: "/docs/feedback/progress",
      permanent: true,
    },
    {
      source: "/spinner",
      destination: "/docs/feedback/spinner",
      permanent: true,
    },
    {
      source: "/toast",
      destination: "/docs/feedback/toast",
      permanent: true,
    },
    {
      source: "/alert-dialog",
      destination: "/docs/overlay/alert-dialog",
      permanent: true,
    },
    {
      source: "/drawer",
      destination: "/docs/overlay/drawer",
      permanent: true,
    },
    {
      source: "/modal",
      destination: "/docs/overlay/modal",
      permanent: true,
    },
    {
      source: "/popover",
      destination: "/docs/overlay/popover",
      permanent: true,
    },
    {
      source: "/breadcrumb",
      destination: "/docs/components/breadcrumb",
      permanent: true,
    },
    {
      source: "/visually-hidden",
      destination: "/docs/components/visually-hidden",
      permanent: true,
    },
    {
      source: "/avatar",
      destination: "/docs/data-display/avatar",
      permanent: true,
    },
    {
      source: "/icon",
      destination: "/docs/components/icon",
      permanent: true,
    },
    {
      source: "/image",
      destination: "/docs/data-display/image",
      permanent: true,
    },
    {
      source: "/transition",
      destination: "/docs/components/transitions",
      permanent: true,
    },
    {
      source: "/use-clipboard",
      destination: "/docs/hooks/use-clipboard",
      permanent: true,
    },
    {
      source: "/use-controllable",
      destination: "/docs/hooks/use-controllable",
      permanent: true,
    },
    {
      source: "/use-disclosure",
      destination: "/docs/hooks/use-disclosure",
      permanent: true,
    },

  ]
}

module.exports = redirect
