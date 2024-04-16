import Home from './pages/Home.svelte'
import Teams from './pages/Teams.svelte'
import Statistics from './pages/Statistics.svelte'
import Matches from './pages/Matches.svelte'
import Profile from './pages/Profile.svelte'
import Bets from './pages/Bets.svelte'
import NotFound from './pages/NotFound.svelte'


export default {
  '/': Home,
  '/teams/': Teams,
  '/matches/': Matches,
  '/statistics/': Statistics,
  '/profile/': Profile,
  '/bets/': Bets,
  // The catch-all route must always be last
  '*': NotFound
} 