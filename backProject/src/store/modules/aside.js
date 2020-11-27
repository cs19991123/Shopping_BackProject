const state = {
    userInfo:sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
}
const getters = {
    getMenu(state) {
        return state.userInfo
    }
}
const mutations = {
    REQ_MENU(state, payload) {
        state.userInfo = payload
        if(payload){
            sessionStorage.setItem('userInfo',JSON.stringify(payload))
        }else{
            sessionStorage.removeItem('userInfo')
        }
    }
}
const actions = {
    getMenuAction({ commit }, payload) {
        commit('REQ_MENU', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}