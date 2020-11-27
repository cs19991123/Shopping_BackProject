import {catelist} from '../../util/axios'
const state = {
    cateList:[]
}

const getters = {
    getCateList(state){
        return state.cateList
    }
}

const mutations = {
    REQ_CATELIST(state,payload){
        state.cateList = payload
    }
}

const actions = {
    getCateListAction({commit}){
        catelist({
            istree:true
        }).then(res=>{
            if(res.data.code==200){
                commit('REQ_CATELIST',res.data.list)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}