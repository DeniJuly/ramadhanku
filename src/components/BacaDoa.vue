<template>
    <div class="page">
        <!-- header -->
        <nav class="navbar navbar-light fixed-top m-navbar d-flex">
            <router-link to="/doa" class="navbar-brand">
                <img :src="icons.LeftArrow" alt="left arrow">
            </router-link>
            <div class="text-center doa-name">
                <h6 class="m-0">{{ surat.judul }}</h6>
            </div>
        </nav>
        <!-- banner -->
        <div class="container">
            <div class="row justify-content-center">
                <div class="banner p-0 col-lg-10">
                    <img :src="surat.ilustrasi" :alt="surat.judul">
                </div>
                <div class="col-12">
                    <div class="loading text-center mt-4" v-if="surat.arab == ''">
                        <img :src="icons.Loading" alt="loading...">
                    </div>
                    <div class="arab mt-4">
                        <p class="text-right">{{ surat.arab }}</p>
                    </div>
                    <div class="latin">
                        <p>{{ surat.latin }}</p>
                    </div>
                    <div class="indonesia mb-5">
                        <p>{{ surat.indonesia }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// librarys
import axios from 'axios';
import url from '@/config/url';

// icons 
import LeftArrow from '../assets/img/icons/left-arrow-black-15.svg';
import Loading from '../assets/img/loading/loading.gif';

export default {
    data(){
        return{
            icons: {
                LeftArrow: LeftArrow,
                Loading: Loading
            },
            surat: {
                ilustrasi: '',
                judul: '',
                arab: '',
                indonesia: '',
                latin: ''
            }
        }
    },
    methods: {
        getDoa: function(id){
            axios.get(`${url.api}doa/${id}`, {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.surat.ilustrasi = url.ilustrasi + res.data.doa.ilustrasi
                this.surat.judul = res.data.doa.judul
                this.surat.arab = res.data.doa.arab
                this.surat.indonesia = res.data.doa.indonesia
                this.surat.latin = res.data.doa.latin
            })
        }
    },
    created(){
        this.getDoa(this.$route.params.id);
    }
}
</script>

<style scoped>
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
    /* banner */
    .banner img {
        width: 100%;
    }
    /* doa */
    .col-12 p{
        font-size: 15px;
    }
    .col-12 .arab p{
        font-size: 20px;
    }
</style>