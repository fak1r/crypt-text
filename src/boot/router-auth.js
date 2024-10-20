import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (loggedIn && to.path === '/auth') {
      next('/')
    } else {
      next()
    }
  })
  return false
})
