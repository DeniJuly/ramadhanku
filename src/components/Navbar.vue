<template>
    <nav class="navbar fixed-bottom navbar-light bg-light m-navbar">
        <router-link to="/" class="item">
            <!-- icon active -->
            <div class="active" v-if="this.url.name === 'home'">
                <div class="icon">
                    <img :src="icons.HomeGreen" alt="home green">
                </div>
                <p>Home</p>
            </div>
            <!-- icon disable -->
            <div class="disable" v-else>
                <div class="icon">
                    <img :src="icons.HomeGrey" alt="home grey">
                </div>
                <p>Home</p>
            </div>
        </router-link>
        <router-link to="/ibadah" class="item">
            <!-- icon active -->
            <div class="active" v-if="this.url.name === 'ibadah'">
                <div class="icon">
                    <img :src="icons.IbadahGreen" alt="ibadah green">
                </div>
                <p>Ibadahku</p>
            </div>
            <!-- icon disable -->
            <div class="disable" v-else>
                <div class="icon">
                    <img :src="icons.IbadahGrey" alt="ibadah grey">
                </div>
                <p>Ibadahku</p>
            </div>
        </router-link>
        <router-link to="/quran" class="item">
            <!-- icon active -->
            <div class="active" v-if="this.url.name === 'quran'">
                <div class="icon">
                    <img :src="icons.QuranGreen" alt="quran green">
                </div>
                <p>Baca al quran</p>
            </div>
            <!-- icon disable -->
            <div class="disable" v-else>
                <div class="icon">
                    <img :src="icons.QuranGrey" alt="quran grey">
                </div>
                <p>Baca al quran</p>
            </div>
        </router-link>
        <router-link to="/doa" class="item">
            <!-- icon active -->
            <div class="active" v-if="this.url.name === 'doa'">
                <div class="icon">
                    <img :src="icons.DoaGreen" alt="doa green">
                </div>
                <p>Doa-doa</p>
            </div>
            <!-- icon disable -->
            <div class="disable" v-else>
                <div class="icon">
                    <img :src="icons.DoaGrey" alt="doa grey">
                </div>
                <p>Doa-doa</p>
            </div>
        </router-link>
        <router-link to="/" class="item">
            <div class="active" v-if="this.url.name === 'profile'">
                <div class="icon">
                    <img :src="icons.UserGreen" alt="doa green">
                </div>
                <p>Profile</p>
            </div>
            <div class="disable" v-else>
                <div class="icon">
                    <img :src="icons.UserGrey" alt="doa grey">
                </div>
                <p>Profile</p>
            </div>
        </router-link>
    </nav>
</template>
<script>
// icons
import HomeGrey from '../assets/img/icons/home-grey-15.svg';
import HomeGreen from '../assets/img/icons/home-green-15.svg';
import IbadahGrey from '../assets/img/icons/ibadahku-grey-15.svg';
import IbadahGreen from '../assets/img/icons/ibadahku-green-15.svg';
import QuranGrey from '../assets/img/icons/quran-grey-15.svg';
import QuranGreen from '../assets/img/icons/quran-green-15.svg';
import DoaGrey from '../assets/img/icons/doa-grey-15.svg';
import DoaGreen from '../assets/img/icons/doa-green-15.svg';
import UserGrey from '../assets/img/icons/user-grey-15.svg';
import UserGreen from '../assets/img/icons/user-green-15.svg';

export default {
    data(){
        return{
            icons: {
                HomeGrey: HomeGrey,
                HomeGreen: HomeGreen,
                IbadahGrey: IbadahGrey,
                IbadahGreen: IbadahGreen,
                QuranGrey: QuranGrey,
                QuranGreen: QuranGreen,
                DoaGrey: DoaGrey,
                DoaGreen: DoaGreen,
                UserGrey: UserGrey,
                UserGreen: UserGreen,
            },
            url: {
                name: this.$route.name,
            }
        }
    },
}
</script>

<style>
    .navbar.m-navbar {
        background: #FFFFFF!important;
        box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.1);
        padding-bottom: 15px;
    }
    .m-navbar .item{
        text-align: center;
    }
    .m-navbar .item .active p{
        color: #42B883;
    }
    .m-navbar .item img{
        height: 21px;
    }
    .m-navbar .item p{
        font-size: 12px;
        margin: 0px;
        color: rgba(0, 0, 0, 0.8);
    }
    .m-navbar .item:hover{
        text-decoration: none;
    }
</style>