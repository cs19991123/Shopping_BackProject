import {memberlist} from '../../util/axios'
const state = {
    memberList:[]
}

const getters = {
    getMemberList(state){
        return state.memberList
    }
}

const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload
    }
}

const actions = {
    getMemberListAction({commit}){
        memberlist().then(res=>{
            if(res.data.code==200){
                commit('REQ_MEMBERLIST',res.data.list)
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