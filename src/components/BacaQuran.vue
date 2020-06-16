<template>
    <div class="page">
        <!-- header -->
        <nav class="navbar navbar-light fixed-top m-navbar">
            <router-link to="/quran" class="navbar-brand">
                <img :src="icons.LeftArrow" alt="left arrow">
            </router-link>
            <div class="text-center quran-name">
                <h6 class="m-0">{{ quran.detail.nama }}</h6>
            </div>
        </nav>
        <!-- control page -->
        <nav class="navbar navbar-light m-control fixed-bottom col-lg-8 col-md-8 offset-lg-2 offset-md-2" 
            :class="{active: control}" 
            v-if="paginate.list.length > 1"
            >
            <div class="btn-control text-center">
                <button @click="control = !control"></button>
            </div>
            <div class="control d-flex">
                <router-link 
                    class="btn-control-ayat btn" 
                    :class="{disabled: (params.page - 1) === 0}"
                    :to="paginate.pref"
                    >
                    <img :src="icons.Backward" alt="backward">
                </router-link>
                <p>hal {{ this.$route.params.page }} dari {{ paginate.list.length }}</p>
                <router-link 
                    class="btn-control-ayat btn"
                    :class="{disabled: params.page === paginate.list.length}"
                    :to="paginate.next">
                    <img :src="icons.Forward" alt="forward">
                </router-link>
            </div>
            <div class="list-ayat">
                <p class="surat">{{ quran.detail.nama }} : {{ quran.detail.ayat }} ayat</p>
                <router-link 
                    class="card m-card-list-ayat d-flex" 
                    v-for="(paginate, index) in paginate.list" 
                    :to="paginate.url" 
                    :key="index">
                    <div class="detail d-flex">
                        <div class="icon">
                            <img :src="icons.Doa" alt="doa">
                        </div>
                        <div class="ayat">
                            <p>ayat {{ paginate.awal }} - {{ paginate.akhir }}</p>
                        </div>
                    </div>
                    <div class="go">
                        <img :src="icons.Next" alt="next">
                    </div>
                </router-link>
            </div>
        </nav>
        <!-- list quran -->
        <div class="container">
            <div class="row">
                <div class="col-12 list-quran">
                    <div class="loading text-center mt-3" v-if="quran.ayat.length === 0">
                        <img :src="icons.Loading" alt="loading...">
                    </div>
                    <div class="card m-card-quran" v-for="quran in quran.ayat" :key="quran.nomor">
                        <div class="d-flex row-1">
                            <!-- nomor -->
                            <div class="nomor">
                                <p>{{ quran.nomor }}</p>
                            </div>
                            <!-- ayat -->
                            <p class="ayat">{{ quran.ar }}</p>
                        </div>
                        <p class="tr mt-3" v-html="quran.idt"></p>
                        <p class="arti mt-3">{{ quran.id }}</p>
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
import Backward from '../assets/img/icons/backward-black-20.svg';
import Forward from '../assets/img/icons/forward-black-20.svg';
import Next from '../assets/img/icons/next-grey-15.svg';
import Doa from '../assets/img/icons/doa-green-30.svg';
import Loading from '../assets/img/loading/loading.gif';

export default {
    data(){
        return{
            quran:{
                detail:{},
                ayat:[]
            },
            icons: {
                LeftArrow: LeftArrow,
                Loading: Loading,
                Backward: Backward,
                Forward: Forward,
                Doa: Doa,
                Next: Next
            },
            paginate: {
                pref: '',
                next: '',
                list: []
            },
            control: false,
            params: {
                page: this.$route.params.page,
                nomor: this.$route.params.nomor
            }
        }
    },
    methods: {
        getQuranList: function(id, page){
            let paginate = this.paginate.list[page-1];
            let awal = 1;
            let akhir = this.paginate.list[0].akhir;            
            if(typeof paginate != 'undefined'){
                akhir = paginate.akhir;
                awal = paginate.awal;
            }
            axios.get(`${url.apiSurat}/${id}/ayat/${awal}-${akhir}`)
            .then(res => {
                let surat = [];
                for (let i = 0; i < res.data.ayat.data.ar.length; i++) {
                    surat[i] = {
                        ar: res.data.ayat.data.ar[i].teks,
                        id: res.data.ayat.data.id[i].teks,
                        idt: res.data.ayat.data.idt[i].teks,
                        nomor: res.data.ayat.data.idt[i].ayat
                    }
                }
                this.quran.ayat = surat;
            })
        },
        getQuranDetail: function(id){
            this.quran.ayat = [];
            axios.get(`${url.apiSurat}/${id}`)
            .then(res=>{
                this.quran.detail = res.data.hasil[0];
                this.makePaginationAyat();
            })
        },
        makePaginationAyat: function(){
            let ayat = this.quran.detail.ayat;
            let loop = Math.ceil(ayat / 10);
            let awal = 1;
            let pagination = {
                pref: '',
                next: '',
                list: []
            }
            for (let i = 0; i < loop; i++) {
                if(i != loop - 1){
                    pagination.list[i] = {
                        awal: awal,
                        akhir: awal + 9,
                        url: `/baca/${this.params.nomor}/${i+1}`
                    }
                    awal = pagination.list[i].akhir + 1;
                }else{
                    pagination.list[i] = {
                        awal: awal,
                        akhir: ayat,
                        url: `/baca/${this.params.nomor}/${i+1}`
                    }
                }
            }
            pagination.pref = `/baca/${this.$route.params.nomor}/${parseInt(this.$route.params.page) - 1}`;
            pagination.next = `/baca/${this.$route.params.nomor}/${parseInt(this.$route.params.page) + 1}`;
            this.paginate = pagination;
            this.getQuranList(this.params.nomor, this.params.page)
        },
        getUser: function () {
            axios.get(`${url.api}user`, {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.editUser(res.data.id)
            })
        },
        editUser: function (id_user) {
            let quran = {
                id_quran: this.params.nomor,
                id_user: id_user
            }
            axios.post(`${url.api}user/edit_quran`, quran, {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
        }
    },
    created(){
        this.getUser();
        this.getQuranDetail(this.params.nomor);
    },
    watch: {
        '$route.params': {
            handler(newValue) {
                this.params = newValue
                this.getQuranDetail(newValue.nomor)
            },
            immediate: true,
        }
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
    .m-navbar .quran-name {
        position: relative;
        margin: 0 auto;
        padding-right: 15px;
        font-family: 'poppins-medium';
    }
    /* container */
    .container{
        margin-top: 80px;
    }
    /* list quran */
    .list-quran{
        margin-bottom: 60px;
    }
    .card.m-card-quran{
        border: none;
        border-bottom: 1px solid #ECECEC;
        padding: 20px 0;
    }
    .card.m-card-quran p{
        margin: 0;
        font-size: 14px;
    }
    .m-card-quran .row-1 {
        justify-content: space-between;
        align-content: center;
    }
    .m-card-quran .row-1 .ayat{
        font-size: 20px;
        margin-left: 10px;
        text-align: right;
    }
    .m-card-quran .row-1 .nomor {
        background: #ECECEC;
        border-radius: 2px;
        padding: 5px 10px;
        text-align: center;
        font-size: 15px;
        margin: 0;
        height: max-content;
    }
    /* navbar bottom */
    .m-control{
        background: #FFFFFF;
        box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.1);
        border-radius: 20px 20px 0px 0px;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: -60vh;
        transition: 0.3s;
    }
    .m-control.active{
        margin-bottom: 0px;
    }
    .m-control .btn-control{
        width: 100%;
        margin-top: -10px;
    }
    .m-control .btn-control button{
        width: 40px;
        height: 6px;
        background: #ECECEC;
        border-radius: 5px;
        border: none;
    }
    .m-control .btn-control button:focus{
        outline: none;
    }
    .m-control .control{
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 5px;
    }
    .m-control .control button{
        border: none;
        background: #FFFFFF;
        box-shadow: none;
    }
    .m-control .control p{
        font-size: 15px;
        font-family: 'poppins-medium';
        margin: 0px;
    }
    .m-control .control .btn-control-ayat.btn{
        padding: 0px;
    }
    .m-control .control .btn-control-ayat.btn:focus{
        box-shadow: none;
    }
    .m-control .list-ayat {
        margin-top: 10px;
        width: 100%;
        height: 60vh;
        overflow-y: scroll;
    }
    .m-control .list-ayat .surat{
        font-size: 15px;
        font-family: 'poppins-medium';
        margin-top: 5px;
    }
    .m-control .list-ayat .m-card-list-ayat{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        border: 1px solid #ECECEC;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 10px;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 10px;
    }
    .m-card-list-ayat:hover{
        text-decoration: none;
    }
    .m-card-list-ayat.router-link-exact-active.router-link-active {
        border: 1px solid #42B883;
        color: #42B883;
    }
    .m-control .list-ayat .m-card-list-ayat .detail{
        align-items: center;
    }
    .m-control .list-ayat .m-card-list-ayat .detail .ayat p{
        font-family: 'poppins-medium';
        font-size: 15px;
        margin: 0;
        margin-left: 10px;
    }
</style>