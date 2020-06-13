<template>
    <div>
        <nav-menu></nav-menu>
        <div class="container">
            <div class="row">
                <!-- banner -->
                <div class="col-12" id="bg-profile">
                    <div class="profile d-flex">
                        <div class="foto-profile">
                            <img :src="user.profile" alt="">
                        </div>
                        <div class="detail-profile">
                            <p class="nama m-0">{{ user.nama }}</p>
                            <p class="kota m-0">{{ user.kota }}</p>
                        </div>
                    </div>
                </div>
                <!-- link -->
                <div class="link col-12">
                    <router-link to="#" class="card m-card-link d-flex">
                        <div class="icon">
                            <img :src="icons.EditProfile" alt="profile-black-20">
                        </div>
                        <p>Edit Profile</p>
                    </router-link>
                    <router-link to="/keluar" class="card m-card-link d-flex">
                        <div class="icon">
                            <img :src="icons.Keluar" alt="logout-black-20">
                        </div>
                        <p>Keluar</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// library
import axios from 'axios';
import url from '@/config/url';

// components
import NavMenu from './Navbar';

// icons
import EditProfile from '../assets/img/icons/user-black-20.svg';
import Keluar from '../assets/img/icons/logout-black-20.svg';

export default {
    data(){
        return{
            user: {
                kota: '',
                nama: '',
                profile: ''
            },
            icons: {
                EditProfile: EditProfile,
                Keluar: Keluar
            }
        }
    },
    methods: {
        getUser: function(){
            axios.get(`${url.api}user`,{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.user.nama = res.data.nama
                this.user.profile = url.fotoProfile + res.data.foto_profile
                this.getKota(res.data.id_tinggal)
            })
        },
        getKota: function(id_kota){
            axios.get(`${url.apiKota}${id_kota}`)
            .then(res => {
                this.user.kota = res.data.kota[0].nama
            })
        }
    },
    created(){
        this.getUser()
    },
    components: {
        'nav-menu': NavMenu
    },
}
</script>

<style scoped>
    /* banner */
    #bg-profile{
        background: url('../assets/img/background-profile.svg');
        background-size: cover;
        background-position: center;
    }
    .profile{
        margin-top: 90px;
    }
    .profile .foto-profile {
        border-radius: 5px;
        overflow: hidden;
        width: 130px;
        height: 130px;
        margin-bottom: -68px;
    }
    .profile .foto-profile img{
        width: 100%;
    }
    .profile .detail-profile {
        margin-left: 10px;
        font-size: 15px;
    }
    .profile .detail-profile .nama{
        font-family: 'poppins-medium';
    }
    /* link */
    .link {
        margin-top: 100px;
    }
    .m-card-link {
        flex-direction: row;
        padding: 10px 20px 15px 20px;
        border: none;
        border-bottom: 1px solid #ECECEC;
        border-radius: 0;
        margin-bottom: 5px;
    }
    .m-card-link p{
        margin: 0;
        margin-left: 10px;
        color: rgba(0, 0, 0, 0.8);
    }
    .m-card-link:hover{
        text-decoration: none;
    }
</style>