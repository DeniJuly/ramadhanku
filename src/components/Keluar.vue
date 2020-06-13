<template>
  <div></div>
</template>

<script>
// library
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions({
            keluar: 'auth/keluar'
        })
    },
    created(){
        axios.get('http://127.0.0.1:8000/api/auth/logout', {
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