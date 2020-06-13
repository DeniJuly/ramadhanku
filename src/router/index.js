// component
import Home from '../components/Home.vue';
import Ibadahku from '../components/Ibadahku.vue';
import Quran from '../components/Quran.vue';
import DoaDoa from '../components/DoaDoa.vue';
import BacaQuran from '../components/BacaQuran.vue';
import Masuk from '../components/Masuk.vue';
import Daftar from '../components/Daftar.vue';
import Keluar from '../components/Keluar.vue';
import NotFound from '../components/NotFound.vue';

export default [
    { 
        path: '/', 
        component: Home, 
        name: 'home',
        meta: {
            auth: true
        }
    },
    { 
        path: '/ibadah', 
        component: Ibadahku, 
        name: 'ibadah',
        meta: {
            auth: true
        }
    },
    { 
        path: '/quran', 
        component: Quran, 
        name: 'quran',
        meta: {
            auth: true
        }
    },
    { 
        path: '/doa', 
        component: DoaDoa, 
        name: 'doa',
        meta: {
            auth: true
        }
    },
    { 
        path: '/baca/:nomor/:page', 
        component: BacaQuran, 
        name: 'baca-quran',
        meta: {
            auth: true
        }
    },
    { 
        path: '/masuk', 
        component: Masuk, 
        name: 'masuk',
        meta: {
            auth: false
        }
    },
    { 
        path: '/daftar', 
        component: Daftar, 
        name: 'daftar',
        meta: {
            auth: false
        }
    },
    { 
        path: '/keluar', 
        component: Keluar, 
        name: 'keluar',
        meta: {
            auth: true
        }
    },
    { 
        path: '*', 
        component: NotFound 
    }
]