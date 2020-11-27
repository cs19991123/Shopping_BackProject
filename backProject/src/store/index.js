import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex);
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
import goods from './modules/goods'
import aside from './modules/aside'

export default new Vuex.Store({
    
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        member,
        banner,
        seck,
        goods,
        aside
    }
})