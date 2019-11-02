import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        avatarUrl: ''
    },
    mutations: {
        //改变头像
        changeAvatarUrl(state, url) {
            state.avatarUrl = url
        }
    },
})