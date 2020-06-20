// library
import axios from 'axios';
import url from '@/config/url';
import router from '@/router';

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
            let response = await axios.post(`${url.apiRamadhanku}auth/login`, credential)
            localStorage.setItem('token', response.data.token)
            return dispatch('attempt', response.data.token)
        },
        async submitDaftar ({ dispatch }, credential) {
            let response = await axios.post(`${url.apiRamadhanku}auth/daftar`, credential);
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
                axios.get(`${url.apiRamadhanku}user`,{
                    headers: {
                        'Authorization': 'bearer ' + token
                    }
                })
                .then(res => {
                    commit('SET_USER', res.data)
                })
                .catch(e => {
                    if(e.response.status == 401){
                        commit('SET_TOKEN', null)
                        commit('SET_USER', null)
                        localStorage.removeItem('token')
                        router.push('/masuk')
                    }
                })
            } catch (error) {
                if(error.response.status == 401){
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                    localStorage.removeItem('token')
                    router.push('/masuk')
                }
            }
        },
        keluar({ commit }){
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        }
    },
}