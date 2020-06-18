<template>
    <div class="ibadahku-page">
        <nav-bottom></nav-bottom>
        <div class="container">
            <div class="row">
                <div class="col-12 bg-white pb-2">
                    <!-- header -->
                    <div class="header d-flex align-items-center">
                        <div class="detail d-flex">
                            <div class="icon">
                                <img :src="icons.DateGreen" alt="">
                            </div>
                            <div class="tanggal">
                                <p class="tanggal"> {{ jadwal.tanggal }} </p>
                            </div>
                        </div>
                    </div>
                    <!-- ibadah selanjutnya -->
                    <div class="ibadah-selanjutnya" v-if="dikerjakan.nama != ''">
                        <div class="card next-ibadah">
                            <div class="card-body d-flex">
                                <div class="ibadah">
                                    <div class="detail">
                                        <p class="nama">Shalat {{ upperCase(dikerjakan.nama) }}</p>
                                        <p class="waktu">{{ dikerjakan.waktu }}</p>
                                    </div>
                                    <div class="countdown">
                                        <p v-if="dikerjakan.status">sudah dikerjakan</p>
                                        <p v-else>{{ dikerjakan.countdown }} menuju Shalat {{ upperCase(dikerjakan.nama) }}</p>
                                    </div>
                                </div>
                                <div class="icon">
                                    <img :src="icons.Mosque" alt="mosque">
                                </div>
                            </div>
                        </div>
                        <div class="ask" v-if=" waktu > dikerjakan.waktu">
                            <p>udah kamu kerjain ?</p>
                            <button class="btn btn-belum" v-if="dikerjakan.status" @click="changeStatusIbadah(false)" :class="{ disabled: submit }">BELUM</button>
                            <button class="btn btn-sudah" v-else @click="changeStatusIbadah(true)" :class="{ disabled: submit }">SUDAH</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-white mt-3 second-content">
                    <!-- chart -->
                    <div class="chart">
                        <div class="header d-flex align-items-center">
                            <p class="dikerjakan">dikerjakan: {{ chart.dikerjakan || '0' }}</p>
                            <p class="semua"> semua ({{ ibadah.length || '0' }})</p>
                        </div>
                        <div class="chart">
                            <div class="dikerjakan" :style="{width: chart.dikerjakan + '0' + '%'}"></div>
                        </div>
                    </div>
                    <!-- list ibadah -->
                    <div class="list-ibadah">
                        <div class="loading text-center mt-3" v-if="ibadah.length === 0">
                            <img :src="icons.Loading" alt="loading...">
                        </div>
                        <div class="item d-flex align-items-center" v-for="ibadah in ibadah" :key="ibadah.id" @click="viewIbadah(ibadah)">
                            <div class="ibadah" :class="{active: dikerjakan.nama == ibadah.nama }">
                                <p class="title">Shalat {{ upperCase(ibadah.nama) }}</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">{{ jadwal[ibadah.nama] }}</p>
                                </div>
                            </div>
                            <div class="status" v-if="ibadah.dikerjakan">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                            <div class="status" v-else>
                                <img :src="icons.CheckGrey" alt="check green">
                            </div>
                        </div>
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
import DateGreen from '../assets/img/icons/date-green-15.svg';
import ArrowDownGrey from '../assets/img/icons/arrow-down-grey-15.svg';
import ClockGrey from '../assets/img/icons/clock-grey-11.svg';
import CheckGrey from '../assets/img/icons/check-grey-23.svg';
import CheckGreen from '../assets/img/icons/check-green-23.svg';
import Mosque from '../assets/img/icons/mosque-70.svg';
import Loading from '../assets/img/loading/loading.gif';

export default {
    data(){
        return{
            icons: {
                DateGreen: DateGreen,
                ArrowDownGrey: ArrowDownGrey,
                ClockGrey: ClockGrey,
                CheckGrey: CheckGrey,
                CheckGreen: CheckGreen,
                Mosque: Mosque,
                Loading: Loading
            },
            jadwal: {
                subuh: '',
                imsyak: '',
                dhuha: '',
                dzuhur: '',
                ashar: '',
                maghir: '',
                isya: ''
            },
            ibadah: [],
            ibadahku: [],
            dikerjakan: {
                nama: '',
                waktu: '',
                countdown: '00:00:00',
                status: false,
                id: ''
            },
            chart: {
                dikerjakan: 0
            },
            user: {},
            submit: false
        }
    },
    computed: {
        tanggal: function () {
                var d = new Date()
                var bulan = d.getMonth() + 1;
                if( bulan < 10 ){
                    bulan = '0' + bulan
                }
                var hari  = d.getDate();
                if( hari < 10 ){
                    hari =  '0' + hari
                }
                return d.getFullYear() + '-' + bulan + '-' + hari
        },
        waktu: function () {
            var d = new Date()
            var jam = d.getHours()
            if( jam < 10 ){
                jam = '0' + jam
            }
            var menit = d.getMinutes()
            if( menit < 10 ){
                menit = '0' + menit
            }
            return jam + ':' + menit
        }
    },
    methods: {
        getUser: function () {
            axios.get(`${url.api}user`, {
                headers: {
                    'Authorization' : `bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                this.user = res.data
                this.getJadwalShalat( res.data.id_tinggal,  this.tanggal)
                this.getIbadahUser(res.data.id, this.tanggal);
            })
        },
        getJadwalShalat: function ( id_tinggal, tanggal ) {
            axios.get(`${url.apiShalat}${id_tinggal}/tanggal/${tanggal}`)
            .then(res => {
                this.jadwal = res.data.jadwal.data
                this.getIbadah()
            })
        },
        getIbadah: function () {
            axios.get(`${url.api}ibadah`, {
                headers: {
                    'Authorization' : `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.ibadah = res.data.ibadah
                let dikerjakan = 0;

                for (let x = 0; x < this.ibadahku.length; x++) {
                    
                    for (var y=0; y < this.ibadah.length; y++) {
                        if(!this.ibadah[y].dikerjakan){
                            if (this.ibadah[y].id === this.ibadahku[x].id_ibadah) {
                                this.ibadah[y].dikerjakan = true
                                dikerjakan++
                            } else {
                                this.ibadah[y].dikerjakan = false
                            }
                        }
                    }

                }
                this.akanDikerjakan()
                this.chart.dikerjakan = dikerjakan
            })
        },
        upperCase: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        akanDikerjakan: function () {
            if( this.waktu <= this.jadwal['subuh'] ){
                this.dikerjakan.nama = 'subuh'
                this.dikerjakan.waktu = this.jadwal['subuh']
                // this.countdown()
            } else if( this.waktu <= this.jadwal['dhuha'] ){
                this.dikerjakan.nama = 'dhuha'
                this.dikerjakan.waktu = this.jadwal['dhuha']
                // this.countdown()
            } else if( this.waktu <= this.jadwal['dzuhur'] ){
                this.dikerjakan.nama = 'dzuhur'
                this.dikerjakan.waktu = this.jadwal['dzuhur']
                // this.countdown()
            } else if( this.waktu <= this.jadwal['ashar'] ){
                this.dikerjakan.nama = 'ashar'
                this.dikerjakan.waktu = this.jadwal['ashar']
                // this.countdown()
            } else if( this.waktu <= this.jadwal['maghrib'] ){
                this.dikerjakan.nama = 'maghrib'
                this.dikerjakan.waktu = this.jadwal['maghrib']
                // this.countdown()
            } else if( this.waktu <= this.jadwal['isya'] ){
                this.dikerjakan.nama = 'isya'
                this.dikerjakan.waktu = this.jadwal['isya']
                // this.countdown()
            } else {
                this.dikerjakan.nama = 'subuh'
                this.dikerjakan.waktu = this.jadwal['subuh']
            }
            this.statusIbadah();
        },
        statusIbadah: function () {  
            for (let i = 0; i < this.ibadah.length; i++) {
                if( this.ibadah[i].nama == this.dikerjakan.nama ){
                    this.dikerjakan.id = this.ibadah[i].id
                    if( this.ibadah[i].dikerjakan ){
                        this.dikerjakan.status = true
                    } else {
                        this.dikerjakan.status = false
                    }
                }
            }
            if( this.waktu < this.dikerjakan.waktu ){
                this.countdown()
            }
            this.submit = false
        },
        countdown: function () {
            var waktu   = this.dikerjakan.waktu + ':00'

            var deadline = new Date(this.tanggal + ' ' + waktu).getTime(); 
            var m = this;
            setInterval(function() { 
                var now = new Date().getTime(); 
                var t = deadline - now; 
                var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
                var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
                var seconds = Math.floor((t % (1000 * 60)) / 1000);
                if(hours < 10) {
                    hours = '0' + hours
                }
                if(minutes < 10) {
                    minutes = '0' + minutes
                }
                if(seconds < 10) {
                    seconds = '0' + seconds
                }
                m.dikerjakan.countdown = hours + ':' + minutes + ':' + seconds;
            }, 1000); 
        },
        getIbadahUser: function (id, tanggal) {
            axios.get(`${url.api}ibadah/dikerjakan/${id}/${tanggal}`, {
                headers: {
                    'Authorization' : `bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.ibadahku = res.data.ibadah
            })
        },
        viewIbadah: function (ibadah) {
            this.dikerjakan.nama = ibadah.nama
            this.dikerjakan.waktu = this.jadwal[ibadah.nama]
            this.statusIbadah();
        },
        changeStatusIbadah: function (status) {
            this.submit = true
            axios.post(`${url.api}ibadah/status_ibadah`, {
                id_user: this.user.id,
                id_ibadah: this.dikerjakan.id,
                tanggal: this.tanggal,
                status: status,
                waktu: this.waktu
            }, {
                headers: {
                    'Authorization' : `bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                if(res.data.success){
                    this.getUser()
                } else {
                    alert('gagal mengedit status ibadah')
                }
            })
        }
    },
    created () {
        this.getUser()
    },
    components: {
        NavBottom
    }
}
</script>

<style scoped>
    /* page */
    .ibadahku-page{
        background: #F7F7F7!important;
        min-height: 100vh;
    }
    /* header */
    .header{
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .header .detail .tanggal{
        margin-left: 10px;
    }
    .header .detail .tanggal p{
        margin: 0;
        font-size: 15px;
        font-family: 'poppins-medium';
    }
    .header .detail .tanggal .hari{
        font-family: 'poppins-medium';
    }
    /* ibadah selanjutnya */
    .next-ibadah {
        background: radial-gradient(75.83% 230.31% at 57.46% 34.58%, #42B883 0%, #ffcf2f 100%);
        border-radius: 3px;
        border: none;
        color: #ffffff;
        margin-bottom: 10px;
    }
    .next-ibadah .card-body {
        justify-content: space-between;
        align-items: center;
    }
    .next-ibadah .card-body .ibadah p {
        margin: 0;
        font-size: 15px;
    }
    .next-ibadah .card-body .ibadah .detail p {
        font-family: 'poppins-medium';
        font-size: 25px;
    }
    .btn-belum {
        width: 100%;
        background: #ffffff;
        border: 1px solid rgb(220, 53, 69);
        color: rgb(220, 53, 69);
        margin-bottom: 10px;
    }
    .btn-sudah {
        width: 100%;
        background: #ffffff;
        border: 1px solid #42B883;
        color: #42B883;
        margin-bottom: 10px;
    }
    .btn-belum.focus, .btn-belum:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25)!important;
    }
    .ask p {
        font-size: 15px;
        margin-bottom: 10px!important;
    }
    /* second content */
    .second-content{
        padding-bottom: 80px;
    }
    /* chart */
    .chart .header{
        font-size: 14px;
        font-family: 'poppins-medium';
    }
    .chart .header p{
        margin: 0;
    }
    .chart .chart {
        border-radius: 10px;
        width: 100%;
        height: 10px;
        background: #A7EBC7;
        overflow: hidden;
        margin-top: 10px;
    }
    .chart .chart .dikerjakan {
        height: 100%;
        background: #42B883;
        width: 70%;
    }
    /* list ibadah */
    .list-ibadah{
        margin-top: 10px;
    }
    .list-ibadah .item{
        border-bottom: 1px solid #ECECEC;
        padding: 10px 0px 15px 0px;
        justify-content: space-between;
        margin-top: 5px;
        cursor: pointer;
    }
    .list-ibadah .item .ibadah p{
        margin: 0;
    }
    .list-ibadah .item .ibadah .title {
        font-family: 'poppins-medium';
        font-size: 15px;
    }
    .list-ibadah .item .ibadah .detail .clock{
        font-size: 13px;
        margin-left: 5px;
    }
    .list-ibadah .item .ibadah.active {
        color: #42B883;
    }
</style>