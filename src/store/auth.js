import axios from 'axios';

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },

    getters: {
        authenticated (state) {
            return state.token
        },
        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, token){
            state.token = token
        },
        SET_USER (state, user){
            state.user = user
        }
    },

    actions: {
        async submitMasuk ({ dispatch },credential) {
            let response = await axios.post('http://127.0.0.1:8000/api/auth/login', credential)
            localStorage.setItem('token', response.data.token)
            return dispatch('attempt', response.data.token)
        },
        attempt ({ commit,state }, token) {
            if(token){
                commit('SET_TOKEN', token);
            }
            if(!state.token){
                return
            }
            try {
                axios.get('http://127.0.0.1:8000/api/user',{
                    headers: {
                        'Authorization': 'bearer ' + token
                    }
                })
                .then(res => {
                    commit('SET_USER', res.data)
                })
            } catch (error) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },
        keluar({ commit }){
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        }
    },
}