<template>
  <div></div>
</template>

<script>
// library
import axios from 'axios';
import { mapActions } from 'vuex';
import url from '@/config/url';

export default {
    methods: {
        ...mapActions({
            keluar: 'auth/keluar'
        })
    },
    created(){
        axios.get(`${url.api}auth/logout`, {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            this.keluar();
            this.$router.replace({
                name: 'masuk'
            })
        })
    }
}
</script>

<style>

</style>