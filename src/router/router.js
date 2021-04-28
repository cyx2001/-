import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverPage = () =>
    import ('../components/mdbox/router-view/discoverPage/discoverPage.vue')
const SearchPage = () =>
    import ('../components/mdbox/router-view/searchPage/searchPage.vue')
const LikedPage = () =>
    import ('../components/mdbox/router-view/likedPage/likedPage.vue')
Vue.use(VueRouter)
const routes = [{
    path: '*',
    redirect: '/discoverPage',
}, {
    name: '发现',
    path: '/discoverPage',
    components: {
        nav: DiscoverPage
    }
}, {
    name: '搜索',
    path: '/searchPage',
    components: {
        nav: SearchPage
    }
}, {
    name: '喜欢歌单',
    path: '/likedPage',
    components: {
        nav: LikedPage
    }
}, ]

export default new VueRouter({
    routes,
})