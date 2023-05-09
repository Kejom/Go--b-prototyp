
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'Strona Główna' },
      { path: '/about', component: () => import('pages/AboutPage.vue'), name: 'Informacje o Aplikacji' },
      {path: '/register', component: () => import('pages/RegisterPage.vue'), name: "Zarejestruj Nowe Konto"}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
