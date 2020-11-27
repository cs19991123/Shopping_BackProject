import { specslist, specscount } from '../../util/axios'

const state = {
    specsList: [],
    size: 3,
    page: 1,
    count: 0
}

const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getSpecsCount(state) {
        return state.count
    },
    getSpecsSize(state) {
        return state.size
    }
}

const mutations = {
    REQ_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    REQ_SPECSPAGE(state, payload) {
        state.page = payload
    },
    REQ_SPECSCOUNT(state, payload) {
        state.count = payload
    }
}

const actions = {
    getSpecsListAction(context) {
        specslist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let data = res.data.list ? res.data.list : []
                context.commit('REQ_SPECSLIST', data)
                context.dispatch('getSpecsCountAction')

                if (data.length == 0 && context.state.page != 1) {
                    context.dispatch('getSpecsPageAction', context.state.page - 1)
                }
            }
        })
    },
    getAllSpecsListAction({ commit }) {
        specslist().then(res => {
            if (res.data.code == 200) {
                commit('REQ_SPECSLIST', res.data.list)
            }
        })
    },
    getSpecsCountAction({ commit }) {
        specscount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_SPECSCOUNT', res.data.list[0].total)
            }
        })
    },
    getSpecsPageAction(context, payload) {
        context.commit('REQ_SPECSPAGE', payload)
        context.dispatch('getSpecsListAction')
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}