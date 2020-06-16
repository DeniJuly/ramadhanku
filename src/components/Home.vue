<template>
  <div>
    <nav-bottom></nav-bottom>
    <div class="container">
      <div class="row row-home justify-content-center">
        <div class="col-12 col-lg-10 col-md-10 banner">
          <!-- profile -->
          <div class="media profile">
              <div class="img-profile">
                <img :src="user.profile" :alt="user.nama">
              </div>
            <div class="media-body">
              <p class="salam">Assalamu'allaikum,</p>
              <p class="nama">{{ user.nama || '...' }}</p>
            </div>
          </div>

          <!-- waktu puasa -->
          <div class="card m-card">
            <div class="card-header">
              <div class="city d-flex align-items-center">
                <img :src="require('../assets/img/icons/location.svg')" alt="">
                <p class="m-0 location">{{ user.kota || '...' }}</p>
              </div>
            </div>
            <div class="card-body d-flex align-items-center">
              <div class="item item-left">
                <p class="m-0">Waktu Imsak</p>
                <h4>{{ shalat.imsak || '00:00'}}</h4>
              </div>
              <div class="item item-right">
                <p class="m-0">Waktu Buka</p>
                <h4>{{ shalat.maghrib || '00:00' }}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-10 col-md-10">
          <!-- fitur -->
          <div class="card m-card-fitur d-flex align-items-center">
            <router-link to="/quran" class="item">
              <img :src="icons.Quran" alt="quran" class="icon">
              <p class="name m-0">al qur'an</p>
            </router-link>
            <router-link to="/ibadah" class="item">
              <img :src="icons.Ibadah" alt="ibadah" class="icon">
              <p class="name m-0">ibadahku</p>
            </router-link>
            <router-link to="/doa" class="item">
              <img :src="icons.Doa" alt="doa-doa" class="icon">
              <p class="name m-0">doa-doa</p>
            </router-link>
            <router-link to="#" class="item">
              <img :src="icons.More" alt="more" class="icon">
              <p class="name m-0">lainnya</p>
            </router-link>
          </div>
          <!-- baca al qur'an -->
          <router-link :to='`/baca/${surat.nomor}/1`' class="card m-card-quran d-flex" v-if="surat.id_quran != ''">
            <div class="icon">
              <img :src="icons.BacaQuran" alt="baca quran">
            </div>
            <div class="info">
              <p class="title">baca al quran yuk? surat terakhir dibaca</p>
              <p class="quran">{{ surat.nama }}</p>
            </div>
          </router-link>
          <!-- doa-doa -->
          <section>
            <h5 class="title">Doa-doa harian</h5>
            <div class="content">
              <carousel
                :nav="false"
                :dots="false"
                :items="doa.jml"
                class="owl-theme"
                v-if="doa.data.length > 0"
              >
                <router-link :to="`/doa/${doa.id}`" class="card m-card-doa" v-for="doa in doa.data" :key="doa.id">
                  <p class="title">{{ doa.judul }}</p>
                </router-link>
              </carousel>
            </div>
          </section>
          <!-- artikel -->
          <section>
            <h5 class="title">Artikel islami</h5>
            <div class="content">
              <div class="card m-card-article">
                <div class="thumbnail">
                  <img :src="require('../assets/img/thumbnail.jpg')" alt="">
                </div>
                <div class="card-body">
                  <h4 class="title">Islam Makin Diterima, Idul Fitri Jadi Hari Libur Nasional di Filipina</h4>
                  <p class="website">liputan6.com</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// plugin
import carousel from 'vue-owl-carousel';
import url from '@/config/url';
import axios from 'axios';

// components
import NavBottom from './Navbar.vue';

// icons
import Quran from '../assets/img/icons/quran-green-25.svg';
import Ibadah from '../assets/img/icons/ibadahku-green-25.svg';
import Doa from '../assets/img/icons/doa-green-25.svg';
import More from '../assets/img/icons/more-green-25.svg';
import BacaQuran from '../assets/img/icons/baca-quran-green-55.svg';

export default {
  data(){
    return {
      icons: {
        Quran: Quran,
        Ibadah: Ibadah,
        Doa: Doa,
        More: More,
        BacaQuran: BacaQuran,
      },
      user: {
        kota: '',
        nama: '',
        profile: ''
      },
      shalat: {
        imsak: '',
        maghrib: ''
      },
      doa: {
        jml: 0,
        data: []
      },
      surat: {
        id_quran: '',
        nama: ''
      }
    }
  },
  methods: {
    getUser: function () {
      axios.get(`${url.api}user`,{
        headers: {
          'Authorization': 'bearer ' + localStorage.getItem('token')
        }
      }).then(res =>{
        this.user.nama = res.data.nama
        this.user.profile = url.fotoProfile + res.data.foto_profile
        this.getShalat(res.data.id_tinggal)
        this.getKota(res.data.id_tinggal)
        if(res.data.id_quran != null){
          this.getQuran(res.data.id_quran)
        }
      })
    },
    getShalat: function (id_tinggal) {
      axios.get(`${url.apiShalat}${id_tinggal}/tanggal/${this.getDate()}`)
      .then(res => {
        this.shalat = res.data.jadwal.data
      })
    },
    getKota: function (id_kota) {
        axios.get(`${url.apiKota}${id_kota}`)
        .then(res => {
            this.user.kota = res.data.kota[0].nama
        })
    },
    getDoa: function () {
      axios.get(`${url.api}doa/jml/${this.doa.jml + 1}`, {
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        this.doa.data = res.data.doa
      })
    },
    getQuran: function (id) {
      axios.get(`${url.apiSurat}/${id}`)
      .then(res => {
        this.surat = res.data.hasil[0]
      })
    },
    getDate: function () {
      var d = new Date()

      var day = d.getDate()
      var month = d.getMonth() + 1
      var year = d.getFullYear()

      if (day < 10) { 
          day = '0' + day; 
      } 
      if (month < 10) { 
          month = '0' + month; 
      } 
      return year + '-' + month + '-' + day
    }
  },
  components: {
    NavBottom,
    carousel
  },
  created(){
    this.getUser()
    let screen = window.innerWidth
    if(screen < 440){
      this.doa.jml = 3
    } else if(screen < 750){
      this.doa.jml = 4
    } else if (screen < 900) {
      this.doa.jml = 5
    } else if(screen > 900){
      this.doa.jml = 6
    }
    this.getDoa()
  }
}
</script>

<style scoped>
  .row-home {
    margin-bottom: 90px;
  }
  /* banner */
  .banner {
    background: url('../assets/img/banner.svg');
    background-size: cover;
    background-position: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  /* profile */
  .profile {
    margin-top: 10px;
  }
  .profile .img-profile {
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 100%;
  }
  .media.profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .media-body p {
    margin: 0;
    font-size: 14px;
    margin-left: 8px;
    color: #FFFFFF;
  }
  .media-body .salam {
    font-family: 'poppins-medium';
    font-size: 15px;
  }

  /* waktu puasa */
  .m-card {
    margin-top: 50px;
    background: #FFFFFF;
    border-radius: 5px;
    border: none;
  }
  .m-card .card-header {
    background: #FFFFFF;
    border: none;
    padding: 0px 20px;
  }
  .m-card .card-header .city {
    border-bottom: 1px solid #DEDEDE;
    padding: 10px 0px;
  }
  .m-card .card-header .location {
    font-family: 'poppins-medium';
    font-size: 14px;
    margin-left: 8px!important;
  }
  .m-card .card-body {
    padding: 8px;
    justify-content: space-between;
  }
  .m-card .card-body .item {
    text-align: center;
    padding: 0px 20px;
    flex: 1;
  }
  .m-card .card-body .item-left {
    border-right: 1px solid #DEDEDE;
  }
  .m-card .card-body .item p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }
  .m-card .card-body .item h4 {
    font-family: 'poppins-medium';
  }
  /* Fitur */
  .m-card-fitur {
    margin-top: 20px;
    flex-direction: row;
    padding: 10px;
    border: none;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
  .m-card-fitur .item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.8)!important;
  }
  /* Baca quran */
  .m-card-quran {
    border: 1px solid #ECECEC;
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 20px;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
  }
  .m-card-quran:hover {
    text-decoration: none;
  }
  .m-card-quran .info {
    font-size: 14px;
    margin-left: 10px;
  }
  .m-card-quran .info p {
    margin: 0;
  }
  .m-card-quran .info .quran {
    font-family: 'poppins-medium';
  }
  /* section */
  section {
    margin-top: 20px;
  }
  section .title {
    font-family: 'poppins-medium';
    font-size: 15px;
    color: rgba(0, 0, 0, 0.8);
  }
  /* doa-doa */
  .m-card-doa {
    background: url('../assets/img/background-doa.svg');
    background-position: center;
    background-size: cover;
    width: 100px;
    height: 140px;
    border: none;
    padding: 8px 10px;
  }
  .m-card-doa:hover {
    text-decoration: none;
  }
  .m-card-doa .title {
    font-family: 'poppins-medium';
    font-size: 12px;
    margin: 0;
    line-height: 1.3;
    color: rgba(0, 0, 0, 0.8);
  }
  /* article */
  .card.m-card-article {
    border: 0;
    margin-top: 15px;
  }
  .m-card-article .thumbnail {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  .m-card-article .thumbnail img {
    width: 100%;
  }
  .m-card-article .card-body {
    padding: 10px 0px;
  }
  .m-card-article .card-body .title {
    margin: 0px;
  }
  .m-card-article .card-body .website {
    font-size: 12px;
    margin: 0px;
  }
</style>
