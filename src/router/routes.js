
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: 'Strona Główna' },
      { path: '/about', component: () => import('pages/AboutPage.vue'), name: 'Informacje o Aplikacji' },
      {path: '/register', component: () => import('pages/RegisterPage.vue'), name: "Zarejestruj Nowe Konto"},
      {path: '/editprofile', component: () => import('pages/UserProfileEditPage.vue'), name: "Edycja Profilu"},
      {path: '/:userHandle', component: () => import('pages/UserProfilePage.vue'), name: "Profil Użytkownika"},
      {path: '/:userHandle/:cooId', component: () => import("pages/CooPage.vue"), name: "Gruchnięcie"}
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
