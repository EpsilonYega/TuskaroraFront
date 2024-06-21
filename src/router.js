import { createRouter, createWebHistory } from 'vue-router';

import RegPage from './page/RegPage.vue';
import LogPage from './page/LogPage.vue';
import HomePage from './page/HomePage.vue';
import MainPage from './page/MainPage.vue';
import Notes from './page/Notes.vue';
import Account from './page/Account.vue';
import SearchResults from '@/page/SearchResults.vue';
import Adminka from '@/page/Adminka.vue';
import AdminkaCreate from '@/page/AdminkaCreate.vue';
import AdminkaUpdate from '@/page/AdminkaUpdate.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: HomePage, alias: '/' },
    { path: '/register', component: RegPage },
    { path: '/login', component: LogPage },
    { path: '/auth/main', component: MainPage },
    { path: '/auth/account', component: Account },
    { path: '/search', component: SearchResults },
    { path: '/auth/notes', component: Notes},
    { path: '/admin', component: Adminka},
    { path: '/admin/create', component: AdminkaCreate},
    { path: '/admin/update', component: AdminkaUpdate},
  ],
});
