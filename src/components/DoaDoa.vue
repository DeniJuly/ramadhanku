<template>
    <div class="page">
        <nav-bottom></nav-bottom>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- search -->
                        <div class="input-group mb-3 m-search">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <img :src="icons.SearchGrey" alt="search grey">
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="cari surat" v-model="search" aria-describedby="basic-addon1">
                        </div>
                    <!-- list doa -->
                    <div class="list-doa">
                        <div class="loading text-center mt-3" v-if="doa.length === 0">
                            <img :src="icons.Loading" alt="loading...">
                        </div>
                        <router-link 
                            :to="`/doa/${doa.id}`" 
                            class="item card m-card-doa d-flex align-items-center" 
                            v-for="doa in doaFilter" 
                            :key="doa.id">
                                <div class="doa d-flex align-items-center">
                                    <img :src="icons.DoaGreen" alt="doa green">
                                    <p class="title">{{ doa.judul }}</p>
                                </div>
                                <img :src="icons.NextGrey" alt="next grey">
                        </router-link>
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

// components
import NavBottom from './Navbar.vue';

// icons
import SearchGrey from '../assets/img/icons/search-grey-18.svg';
import DoaGreen from '../assets/img/icons/doa-green-30.svg';
import NextGrey from '../assets/img/icons/next-grey-15.svg';
import Loading from '../assets/img/loading/loading.gif';

export default {
    data(){
        return{
            icons: {
                SearchGrey: SearchGrey,
                DoaGreen: DoaGreen,
                NextGrey: NextGrey,
                Loading: Loading
            },
            doa: [],
            search: '',
        }
    },
    components: {
        NavBottom
    },
    computed: {
        doaFilter: function(){
            return this.doa.filter((doa) => {
                return doa.judul.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    created(){
        axios.get(`${url.api}doa`, {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.doa = res.data.doa
        })
    }
}
</script>

<style scoped>
    /* search */
    .m-search span#basic-addon1 {
        background: #F7F7F7!important;
        border-top: 1px solid #C4C4C4;
        border-left: 1px solid #C4C4C4;
        border-bottom: 1px solid #C4C4C4;
    }
    .m-search input.form-control {
        border: none;
        background: #F7F7F7;
        border-top: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-bottom: 1px solid #C4C4C4;
    }
    .m-search input[type='text']:focus{
        box-shadow: none;
        border-top: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        border-bottom: 1px solid #C4C4C4
    }
    /* list doa */
    .list-doa{
        margin-top: 20px;
        margin-bottom: 80px;
    }
    .list-doa .item{
        flex-direction: row;
        justify-content: space-between;
        background: #FFFFFF;
        border: 1px solid #ECECEC;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 10px;
        color: #000000;
        margin-bottom: 10px;
    }
    .list-doa .item:hover{
        text-decoration: none;
    }
    .list-doa .item .doa .title{
        font-family: 'poppins-medium';
        font-size: 15px;
        margin: 0;
        margin-left: 10px;
    }
</style>