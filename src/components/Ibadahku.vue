<template>
    <div class="ibadahku-page">
        <nav-bottom></nav-bottom>
        <div class="container">
            <div class="row">
                <div class="col-12 bg-white">
                    <!-- header -->
                    <div class="header d-flex align-items-center">
                        <div class="detail d-flex">
                            <div class="icon">
                                <img :src="icons.DateGreen" alt="">
                            </div>
                            <div class="tanggal">
                                <p class="hari">Jum'at</p>
                                <p class="tanggal">22 Mei 2020</p>
                            </div>
                        </div>
                        <div class="hari-ini">
                            <button class="btn btn-today btn-sm">hari ini</button>
                        </div>
                    </div>
                    <!-- tanggal -->
                    <div class="list-tanggal">
                        <div class="list d-flex">
                            <div class="item">
                                <p class="day">Sen</p>
                                <p class="date">1</p>
                            </div>
                            <div class="item active">
                                <p class="day">Sel</p>
                                <p class="date">2</p>
                            </div>
                            <div class="item">
                                <p class="day">Rab</p>
                                <p class="date">3</p>
                            </div>
                            <div class="item">
                                <p class="day">Kam</p>
                                <p class="date">4</p>
                            </div>
                            <div class="item">
                                <p class="day">Jum</p>
                                <p class="date">11</p>
                            </div>
                            <div class="item">
                                <p class="day">Sab</p>
                                <p class="date">12</p>
                            </div>
                            <div class="item">
                                <p class="day">Min</p>
                                <p class="date">30</p>
                            </div>
                        </div>
                        <div class="show-all text-center mt-2">
                            <button>
                                <img :src="icons.ArrowDownGrey" alt="arrow down">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-white mt-3 second-content">
                    <!-- chart -->
                    <div class="chart">
                        <div class="header d-flex align-items-center">
                            <p class="dikerjakan">dikerjakan: 4</p>
                            <p class="semua"> semua (6)</p>
                        </div>
                        <div class="chart">
                            <div class="dikerjakan"></div>
                        </div>
                    </div>
                    <!-- list ibadah -->
                    <div class="list-ibadah">
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                        <div class="item d-flex align-items-center">
                            <div class="ibadah">
                                <p class="title">Shalat Subut</p>
                                <div class="detail d-flex align-items-center">
                                    <img :src="icons.ClockGrey" alt="clock grey">
                                    <p class="clock">04:35</p>
                                </div>
                            </div>
                            <div class="status">
                                <img :src="icons.CheckGreen" alt="check green">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// components
import NavBottom from './Navbar.vue';

// icons
import DateGreen from '../assets/img/icons/date-green-15.svg';
import ArrowDownGrey from '../assets/img/icons/arrow-down-grey-15.svg';
import ClockGrey from '../assets/img/icons/clock-grey-11.svg';
import CheckGrey from '../assets/img/icons/check-grey-23.svg';
import CheckGreen from '../assets/img/icons/check-green-23.svg';

export default {
    data(){
        return{
            icons: {
                DateGreen: DateGreen,
                ArrowDownGrey: ArrowDownGrey,
                ClockGrey: ClockGrey,
                CheckGrey: CheckGrey,
                CheckGreen: CheckGreen,
            }
        }
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
    }
    .header .detail .tanggal{
        margin-left: 10px;
    }
    .header .detail .tanggal p{
        margin: 0;
        font-size: 15px;
    }
    .header .detail .tanggal .hari{
        font-family: 'poppins-medium';
    }
    .header .btn-today{
        background: #50D890;
        color: #ffffff;
        font-size: 12px;
    }
    /* tanggal */
    .list-tanggal{
        margin: 20px 0 2px 0;
    }
    .list-tanggal .list{
        justify-content: space-between;
        align-content: center;
        flex-wrap: wrap;
    }
    .list-tanggal .list .item{
        border: 1px solid #ECECEC;
        text-align: center;
        border-radius: 5px;
        padding: 5px;
        width: 43px;
        height: 56px;
        margin-top: 5px;
    }
    .list-tanggal .list .item.active{
        border: 1px solid #42B883;
        background: #A7EBC7;
    }
    .list-tanggal .list .item p{
        margin: 0;
        font-size: 14px;
    }
    .list-tanggal .list .item .day{
        font-family: 'poppins-medium';
    }
    .list-tanggal .show-all button{
        background: #ffffff;
        border: none;
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
        padding: 10px 0px;
        justify-content: space-between;
        margin-top: 10px;
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
        margin-left: 10px;
    }
</style>