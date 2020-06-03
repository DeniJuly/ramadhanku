// component
import Home from '../components/Home.vue'
import Ibadahku from '../components/Ibadahku.vue'
import Quran from '../components/Quran.vue'
import DoaDoa from '../components/DoaDoa.vue';

export default [
    { path: '/', component: Home, name: 'home'},
    { path: '/ibadah', component: Ibadahku, name: 'ibadah'},
    { path: '/quran', component: Quran, name: 'quran'},
    { path: '/doa', component: DoaDoa, name: 'doa'},
]