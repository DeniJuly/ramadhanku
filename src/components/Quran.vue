<template>
    <div class="page">
        <nav-bottom></nav-bottom>
        <div class="container">
            <div class="row">
                <!-- header -->
                <div class="col-12">
                    <div class="m-header d-flex">
                        <div class="icon">
                            <img :src="require('@/assets/img/icons/quran-black-25.svg')" alt="quran black">
                        </div>
                        <div class="title">
                            <h5>Al Qur'an</h5>
                        </div>
                    </div>
                </div>
                <!-- terakhir dibaca -->
                <router-link :to="`baca/${user.nomor}/1`" class="terakhir-dibaca col-12 d-flex align-items-center" v-if="user.nomor != ''">
                    <div class="info">
                        <p class="title">Terakhir Dibaca:</p>
                        <p class="surat">{{ user.nama }}</p>
                    </div>
                    <div class="icon">
                        <img :src="require('@/assets/img/icons/next-black-10.svg')" alt="next black">
                    </div>
                </router-link>
                <!-- list surat -->
                <div class="col-12 list-surat">
                    <div class="loading text-center mt-4" v-if="surat.length === 0">
                        <img :src="require('@/assets/img/loading/loading.gif')" alt="loading...">
                    </div>
                    <router-link :to="`baca/${surat.nomor}/1`" class="card m-card-surat d-flex align-items-center" v-for="surat in surat" :key="surat.nomor">
                        <div class="surat d-flex align-items-center">
                            <div class="nomor-surat">{{ surat.nomor}}</div>
                            <div class="detail">
                                <p class="name">{{ surat.nama }}</p>
                                <p class="arti">{{ surat.arti }} ({{ surat.ayat }})</p>
                            </div>
                        </div>
                        <div class="asma">
                            <p>{{ surat.asma }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// librarys
import axios from 'axios';
import url from '@/config/url';

// components
import NavBottom from './Navbar.vue';

export default {
    data(){
        return{
            surat: [],
            user: {
                nomor: '',
                nama: ''
            }
        }
    },
    components: {
        NavBottom
    },
    methods: {
        getAllSurat: function(){            
            axios.get(`${url.apiSurat}`)
            .then(res=> {
                this.surat = res.data.hasil
                this.getUser();
            })
        },
        getUser: function () {
            axios.get(`${url.apiRamadhanku}user`, {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                if(res.data.id_quran != null){
                    this.user.nomor = this.surat[res.data.id_quran - 1].nomor
                    this.user.nama = this.surat[res.data.id_quran - 1].nama
                }
            })
        }
    },
    created(){
        this.getAllSurat();
    }
}
</script>

<style scoped>
    /* header */
    .m-header .title{
        font-family: 'poppins-medium';
        font-size: 20px;
        color: rgba(0, 0, 0, 0.8);
    }
    /* terakhir dibaca */
    .terakhir-dibaca{
        margin-top: 10px;
        background: #A7EBC7;
        padding: 10px 20px;
        justify-content: space-between;
        color: rgba(0, 0, 0, 0.9);
    }
    .terakhir-dibaca:hover{
        text-decoration: none;
    }
    .terakhir-dibaca .title{
        font-family: 'poppins-medium';
        font-size: 15px;
        margin: 0px;
    }
    .terakhir-dibaca .surat{
        margin: 0;
        font-size: 14px;
    }
    /* list surat */
    .list-surat{
        margin-top: 10px;
        padding-bottom: 80px;
    }
    .card.m-card-surat{
        border: 0;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ECECEC;
        border-radius: 0;
        padding: 8px 0px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
    }
    .card.m-card-surat:hover{
        text-decoration: none;
    }
    .m-card-surat .surat p{
        margin: 0;
    }
    .m-card-surat .surat .nomor-surat,
    .m-card-surat .surat .detail .name{
        font-family: 'poppins-medium';
    }
    .m-card-surat .surat .detail{
        margin-left: 15px;
    }
    .m-card-surat .asma p{
        margin: 0;
    }
</style>