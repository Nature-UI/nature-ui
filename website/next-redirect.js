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
  ]
}

module.exports = redirect
