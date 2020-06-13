<template>
  <div class="page">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 col-md-8 offset-lg-2 offset-md-2">
          <div class="app">
            <div class="background"></div>
            <h6>Ramadhaku</h6>
          </div>
          <div class="title-page">
            <p class="title">Daftar</p>
            <p>Yuk gabung sama kami</p>
          </div>
          <form class="form" @submit.prevent="submitForm()">
            <input type="text" placeholder="Nama Lengkap" class="form-control m-form-control" v-model="form.nama" required autofocus>
            <input type="text" placeholder="Username" class="form-control m-form-control" v-model="form.username" required>
            <input type="password" placeholder="Password" class="form-control m-form-control" v-model="form.password" required>
            <select name="tinggal" id="tinggal" class="form-control" v-model="form.id_tinggal" required>
              <option value="" disabled>Tempat Tinggal</option>
              <option :value="kota.id" v-for="kota in kota" :key="kota.id">{{ kota.nama }}</option>
            </select>
            <button type="submit" class="btn btn-submit">DAFTAR</button>
          </form>
          <div class="daftar mb-3">
            <p>Kamu sudah punya akun?</p>
            <router-link to="masuk" class="link">MASUK</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// libarary
import axios from 'axios';

export default {
  data(){
    return{
      form: {
        nama: '',
        username: '',
        password: '',
        id_tinggal: ''
      },
      daftar: false,
      kota: []
    }
  },
  methods: {
    submitForm: function(){
      this.daftar = true;
      axios.post('http://127.0.0.1:8000/api/auth/daftar', this.form)
      .then(res => {
        console.log(res);
        this.form = {
          nama: '',
          username: '',
          password: '',
          id_tinggal: ''
        }
      })
      .catch(e => {
        console.log(e);
      })
    },
    getKota: function(){
      axios.get('https://api.banghasan.com/sholat/format/json/kota')
      .then(res => {
        this.kota = res.data.kota
      })
    }
  },
  created(){
    this.getKota()
  }
}
</script>

<style scoped>
  .app{
    display: flex;
    align-items: center;
  }
  .app .background{
    width: 25px;
    height: 25px;
    background-color: #50D890;
    border-radius: 100%;
  }
  .app h6{
    font-family: 'poppins-medium';
    margin: 0;
    margin-left: -15px;
  }
  .title-page{
    margin-top: 80px;
  }
  .title-page p{
    margin: 0;
    font-size: 15px;
  }
  .title-page .title{
    font-size: 30px;
  }
  /* form */
  .form{
    margin-top: 30px;
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
  /* daftar */
  .daftar{
    margin-top: 30px;
    width: 100%;
    text-align: center;
  }
  .daftar p{
    font-size: 15px;
    margin: 0;
  }
  .daftar .link{
    font-size: 16px;
    font-family: 'poppins-medium';
    color: #50D890;
  }
</style>