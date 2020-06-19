<template>
    <div class="page">
        <!-- header -->
        <nav class="navbar navbar-light fixed-top m-navbar d-flex">
            <router-link to="/user" class="navbar-brand">
                <img :src="require('../assets/img/icons/left-arrow-black-15.svg')" alt="left arrow">
            </router-link>
            <div class="text-center doa-name">
                <h6 class="m-0">Beri Saran</h6>
            </div>
        </nav>
        <div class="container">
            <div class="row justify-content-center mt-2">
                <div class="col-12 col-lg-10 col-md-10 mt-5">
                    <div class="alert alert-danger" v-if="error != ''">{{ error }}</div>
                    <form @submit.prevent="submitSaran()">
                        <textarea cols="30" rows="6" v-model="saran.isi" placeholder="Saran kamu" class="form-control"></textarea>
                        <button type="submit" class="btn btn-submit" :class="{ disabled: submit}">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// librarys
import axios from 'axios';
import url from '@/config/url';

export default {
    data(){
        return{
            saran: {
                isi: ''
            },
            submit: false,
            user: {
                id_user: ''
            },
            error: ''
        }
    },
    methods: {
        submitSaran: function () {
            axios.post(`${url.apiRamadhanku}saran/tambah`, {
                isi: this.saran.isi,
                id_user: this.user.id_user
            })
            .then( res => {
                if( res.data.success ){
                    alert('saran berhasil tersampaikan terimakasih')
                    this.submit = false;
                    this.saran.isi = '';
                } else {
                    this.submit = false;
                    this.error = 'gagal menyimpan saran'
                }
            })

        },
        getUser: function () {
            axios.get(`${url.apiRamadhanku}user`,{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.user.id_user = res.data.id
            })
        }
    },
    created(){
        this.getUser()
    }
}
</script>

<style>
    /* header */
    .m-navbar{
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        padding-bottom: 0.5rem!important;
    }
    .m-navbar .doa-name {
        position: relative;
        margin: 0 auto;
        padding-right: 15px;
        font-family: 'poppins-medium';
    }
    .m-navbar .doa-name{
        flex: 1;
    }
    /* form */
    .btn.btn-submit{
        background: #50D890;
        border-radius: 5px;
        margin-top: 30px;
        color: #ffffff;
        width: 100%;
    }
</style>