import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/league',
    name: 'Liga',
    component: () => import('@/views/LeagueTablePage.vue')
  },       
  {
    path: '/matches',
    name: 'Matches',
    component: () => import('@/views/MatchesPage.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import('@/views/TeamsPage.vue')
  },  
  {
    path: '/mytipps',
    name: 'Meine Tipps',
    component: () => import('@/views/TippsPage.vue')
  },   
  {
    path: '/result/:playerId',
    name: 'Spieler Details',
    component: () => import('@/views/PlayerResultPage.vue')
  },     
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/TeamPage.vue')
  },       
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import('@/views/DocumentationPage.vue')
  },        
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('@/views/ImpressumPage.vue')
  },     
  {
    path: '/:pathMatch(.*)*', // or '/:catchAll(.*)' for Vue Router 3
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  }  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
