import { createStore } from 'vuex'
import {setItem,getItem} from '@/utils/storage.js'

const USER_KEY = 'user'

export default createStore({
  state: {
    user: getItem("USER_KEY")  //当前用户的登录状态
  },
  mutations: {
    setUser(state,data){
      state.user = data
      setItem('USER_KEY',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
