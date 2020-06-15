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
            <p class="title">Masuk</p>
            <p>Masukkan username dan password kamu</p>
          </div>
          <form class="form" @submit.prevent="submitForm()">
            <span class="text-danger error" v-if="error">{{ error }}</span>
            <input type="text" placeholder="Username" class="form-control mt-1" v-model="form.username" required autofocus>
            <input type="password" placeholder="Password" class="form-control" v-model="form.password" required>
            <button type="submit" class="btn btn-submit" :class="{disabled: masuk}">MASUK</button>
          </form>
          <div class="daftar mb-4">
            <p>Kamu belum punya akun?</p>
            <router-link to="daftar" class="link">DAFTAR</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// library
import { mapActions } from 'vuex';

export default {
  data(){
    return{
      form: {
        username: '',
        password: '',
      },
      masuk: false,
      error: ''      
    }
  },
  methods: {
    ...mapActions({
      submitMasuk: 'auth/submitMasuk',
    }),
    submitForm: function(){
      this.masuk = true;
      this.submitMasuk(this.form)
      .then(() => {
        this.$router.replace({
          name: 'home'
        })
      }).catch(() =>{
        this.masuk = false
        this.form.password = ''
        this.error = '*username atau password salah'
      })
    }
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
  .error{
    font-size: 13px;
  }
  .form{
    margin-top: 30px;
  }
  .form .form-control{
    margin-bottom: 15px;
    background: #F7F7F7;
    border-radius: 5px;
    border: none;
    padding: 23px 15px;
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