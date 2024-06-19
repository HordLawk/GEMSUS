// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    routeRules: { '/': { redirect: '/medicamentos' } },
    nitro: { experimental: { websocket: true } },
});
