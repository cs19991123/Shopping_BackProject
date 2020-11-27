// 引入接口文件
import { menuList } from '../../util/axios'

const state = {
    menuList: []
}

const getters = {
    getMenuList(state) {
        return state.menuList
    }
}

const mutations = {
    REQ_MENULIST(state, payload) {
        state.menuList = payload
    },
    REQ_MENU(state, payload) {
        state.menuList = payload
    }
}

const actions = {
    getMenuListAction({ commit }, payload) {
        menuList({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                commit('REQ_MENULIST', res.data.list)
            }
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}