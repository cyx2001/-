import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverPage = () =>
    import ('../components/mdbox/router-view/discoverPage/discoverPage.vue')
const SearchPage = () =>
    import ('../components/mdbox/router-view/searchPage/searchPage.vue')
Vue.use(VueRouter)
const routes = [{
    name: '发现',
    path: '/discoverPage',
    components: {
        nav: DiscoverPage
    }
}, {
    name: '发现',
    path: '/searchPage',
    components: {
        nav: SearchPage
    }
}, ]

export default new VueRouter({
    routes,
})