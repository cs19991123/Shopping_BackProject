import { goodslist, goodscount } from '../../util/axios'

const state = {
    goodsList: [],
    size: 2,
    page: 1,
    count: 0,
}

const getters = {
    getGoodsList(state) {
        return state.goodsList
    },
    getGoodsCount(state) {
        return state.count
    },
    getGoodsSize(state) {
        return state.size
    }
}

const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload
    },
    REQ_GOODSPAGE(state, payload) {
        state.page = payload
    },
    REQ_GOODSCOUNT(state, payload) {
        state.count = payload
    }
}

const actions = {
    getGoodsListAction(context) {
        goodslist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let data = res.data.list ? res.data.list : []
                context.commit('REQ_GOODSLIST', data)
                context.dispatch('getGoodsCountAction')

                if (data.length == 0 && context.state.page != 1) {
                    context.dispatch('getGoodsPageAction', context.state.page - 1)
                }
            }
        })
    },
    getGoodsCountAction({ commit }) {
        goodscount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_GOODSCOUNT', res.data.list[0].total)
            }
        })
    },
    getGoodsPageAction(context, payload) {
        context.commit('REQ_GOODSPAGE', payload)
        context.dispatch('getGoodsListAction')
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}