import Vue from 'vue'
import Vuex from 'vuex'
import Account from './modules/account'
import createPersistedState from "vuex-persistedstate"
import Ybt from './modules/ybt'
import Policy from './modules/policy'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Account,
		Ybt,
        Policy
    },
	plugins: [createPersistedState()]
})
