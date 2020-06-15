<template>
    <div class="page">
        <!-- header -->
        <nav class="navbar navbar-light fixed-top m-navbar">
            <router-link to="/user" class="navbar-brand">
                <img :src="icons.LeftArrow" alt="left arrow">
            </router-link>
            <div class="text-center judul">
                <h6 class="m-0">Edit Profile</h6>
            </div>
        </nav>
        <!-- content -->
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-10 col-md-10">
                    <!-- upload foto profile -->
                    <div class="media">
                        <div class="foto-profile">
                            <img class="mr-3" :src="user.profile" :alt="user.nama">
                        </div>
                        <div class="media-body">
                            <form @submit.prevent="checkFoto()">
                                <span class="text-danger warning" v-if="foto.error">{{ foto.error }}</span>
                                <input type="file" ref="foto-profile" name="foto-profile" id="foto-profile" class="form-control" accept="image/x-png,image/jpeg" required>
                                <button type="submit" class="btn btn-upload" :class="{ disabled: foto.submit }">Upload</button>
                                <br>
                                <span class="text-danger warning">ukuran file maksimal 800kb</span>
                            </form>
                        </div>
                    </div>
                    <!-- edit profile -->
                    <section>
                        <h5 class="title">Edit Data Profile</h5>
                        <form class="form">
                            <input type="text" placeholder="Nama Lengkap" class="form-control m-form-control" v-model="user.nama" required autofocus>
                            <input type="text" placeholder="Username" class="form-control m-form-control" v-model="user.username" required>
                            <select name="tinggal" id="tinggal" class="form-control" v-model="user.id_tinggal" required>
                                <option value="" disabled>Tempat Tinggal</option>
                                <option :value="kota.id" v-for="kota in kota" :key="kota.id">{{ kota.nama }}</option>
                            </select>
                            <button type="submit" class="btn btn-submit" :class="{ disabled: simpan}">SIMPAN</button>
                        </form>
                    </section>
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
export default {
    data(){
        return{
            icons: {
                LeftArrow: LeftArrow
            },
            user: {
                id_user : 0,
                nama: '',
                profile: '',
                username: '',
                id_tinggal: '',
                kota: ''
            },
            kota: [],
            simpan: false,
            foto: {
                submit: false,
                error: ''
            }
        }
    },
    methods: {
        getUser: function () {
            axios.get(`${url.api}user`,{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.user.id_user = res.data.id
                this.user.nama = res.data.nama
                this.user.username = res.data.username
                this.user.id_tinggal = res.data.id_tinggal
                this.user.profile = url.fotoProfile + res.data.foto_profile
                this.getKota(res.data.id_tinggal)
            })
        },
        getKota: function (id_kota) {
            axios.get(`${url.apiKota}${id_kota}`)
            .then(res => {
                this.user.kota = res.data.kota[0].nama
            })
        },
        getAllKota: function () {
            axios.get(`${url.apiAllKota}`)
            .then(res => {
                this.kota = res.data.kota
            })
        },
        checkFoto: function () {
            this.foto.error = '';
            var foto = this.$refs['foto-profile'].files[0];
            if(foto.size > 800000){
                this.foto.error = 'ukuran foto terlalu besar';
            } else {
                this.submitFoto()
            }
        },
        submitFoto: function(){
            this.foto.submit = true;
            var form = new FormData();
            form.append('foto-profile', this.$refs['foto-profile'].files[0])
            form.append('id_user', this.user.id_user);
            axios.post(`${url.api}user/edit-foto`, form, {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.foto.submit = false;
                if(res.data.success) {
                    this.getUser()
                    this.$refs['foto-profile'].value = null
                } else {
                    this.foto.error = res.data.message
                }
            })
        }
    },
    created(){
        this.getUser()
        this.getAllKota()
    }
}
</script>

<style scoped>
    /* header */
    .m-navbar {
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    }
    .m-navbar .judul {
        position: relative;
        margin: 0 auto;
        padding-right: 15px;
        font-family: 'poppins-medium';
    }
    /* edit foto profile */
    .media {
        margin-top: 80px;
    }
    .media .foto-profile {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 5px;
        margin-right: 10px;
    }
    .media .foto-profile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .media form .form-control {
        height: max-content;
        font-size: 15px;
    }
    .btn-upload {
        background-color: #50D890;
        margin-top: 10px;
        color: #FFFFFF;
    }
    .media form .warning {
        font-size: 12px;
    }
    /* edit data profile */
    section{
        margin-top: 20px;
    }
    section .title{
        font-family: 'poppins-medium';
        font-size: 15px;
        color: rgba(0, 0, 0, 0.8);
    }
    .form .m-form-control{
        margin-bottom: 15px;
        background: #F7F7F7;
        border-radius: 5px;
        border: none;
        padding: 23px 15px;
    }
    .form select.form-control{
        background: #F7F7F7;
        border: none;
        padding: 10.5px 15px;
        height: max-content;
    }
    .form .btn-submit{
        background: #50D890;
        border-radius: 5px;
        margin-top: 30px;
        color: #ffffff;
        width: 100%;
    }
</style>