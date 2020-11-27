import { userlist, usercount } from '../../util/axios'

const state = {
    userlist: [],
    size: 2,
    page: 1,
    count: 0
}

const getters = {
    getUserlist(state) {
        return state.userlist
    },
    getUserCount(state) {
        return state.count
    },
    getUserSize(state) {
        return state.size
    }
}

const mutations = {
    REQ_USERLIST(state, payload) {
        state.userlist = payload
    },
    REQ_USERCOUNT(state, payload) {
        state.count = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    getUserListAction(context) {
        userlist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let data = res.data.list ? res.data.list : []
                context.commit('REQ_USERLIST', data)
                context.dispatch('getUserCountAction')

                if (data.length == 0 && context.state.page != 1) {
                    context.dispatch('getPageAction',context.state.page - 1)
                }
            }
        })
    },
    getUserCountAction({ commit }) {
        usercount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_USERCOUNT', res.data.list[0].total)
            }
        })
    },
    getPageAction(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getUserListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}