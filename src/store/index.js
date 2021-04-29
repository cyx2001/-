import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { request } from "@/network/request.js";
import getSearchList from '@/network/getSearchList.js'
import getDiscoverList from '@/network/getDiscoverList.js'
import { Message } from 'element-ui'
export default new Vuex.Store({
    state: {
        currentList: [], //当前歌单
        currentListIndex: null, //当前歌曲
        currentSongUrl: '', //当前歌曲播放链接
        searchList: [], //搜索歌单
        searchtext: '', //用户搜索内容
        discoverList: [], //发现歌单
        likedList: [], //喜欢歌单
        markList: [], //收藏歌单
        markListIndex: 0,
        lyric: [], //歌词
        isInputFocus: false, //用户是否正在输入，用于决定是否移除快捷键监听
        isSearchPageBlur: false, //搜索页面是否模糊
        selectedSong: {}, //被选中的歌曲，用于暂存需要收藏的歌曲
        currentTime: null, //当前歌曲正在播放的时刻
        playMode: 'listForwardMode', //播放模式
        albumImgRotateStyle: {}, //控制专辑图片旋转
    },
    mutations: {
        getHistoryData(state) {
            if (localStorage.hasOwnProperty('likedList')) {
                state.likedList = JSON.parse(localStorage.getItem('likedList'))
            }

            if (localStorage.hasOwnProperty('markList')) {
                state.markList = JSON.parse(localStorage.getItem('markList'))
            }
        },
        sendCurrentIndex(state, payload) {
            state.currentListIndex = payload.index
                //将点击歌曲所在的歌单复制一份给当前歌单
                //不要直接两者相等，不然两歌单可能会相互干扰
            state.currentList = []
            state.currentList.push(...payload.list)
        },
        //播放当前歌曲
        playCurrentSong() {
            this.commit('getSongUrlAndLyric')
        },
        sendSelectedSong(state, selectedSong) {
            state.selectedSong = selectedSong
        },
        //获取歌单
        getSongUrlAndLyric(state) {
            request({
                url: 'song',
                params: {
                    songmid: state.currentList[state.currentListIndex].songmid,
                    guid: '126548448',
                    lyric: 1
                },
            }).then(res => {

                //获取歌曲播放链接
                console.log(res)
                state.currentSongUrl = res.data.data.musicUrl
                if (state.currentSongUrl === "https://ws.stream.qqmusic.qq.com/") {
                    Message({
                        showClose: true,
                        type: 'error',
                        message: "请求数据出错：" + err
                    });
                    this.commit('albumRotatePaused')
                }

                //处理歌词
                let lyric = res.data.data.lyric

                //歌词按行切开变成数组
                lyric = lyric.split('\n')

                //去掉前面五个没用的歌词
                lyric.splice(0, 5)

                //清除上一首的歌词
                state.lyric = []

                //将歌词与时间分离
                lyric.forEach(eachLine => {
                    let t = eachLine.substring(eachLine.indexOf("[") + 1, eachLine.indexOf("]"))
                    let lyricTextLineObj = {
                        time: (parseInt(t.split(":")[0]) * 60 + parseFloat(t.split(":")[1])).toFixed(2),
                        text: eachLine.substring(eachLine.indexOf("]") + 1, eachLine.length)
                    }

                    state.lyric.push(lyricTextLineObj)
                })
            }).catch(err => {
                console.log(err)
                Message({
                    showClose: true,
                    type: 'error',
                    message: "请求数据出错：" + err
                });
                this.commit('albumRotatePaused')
            })
        },
        sendLikedSong(state, item) {

            let isThisSongLiked = false
            let likedSongIndex = null

            //检测当前歌曲是否已在喜欢的列表中
            state.likedList.forEach((likedItem, index) => {
                if (likedItem.songmid === item.songmid) {
                    isThisSongLiked = true
                    likedSongIndex = index
                }
            })

            if (isThisSongLiked === false) {

                //喜欢列表没有此歌曲，则加入喜欢列表
                state.likedList.unshift(item)

            } else {

                //喜欢列表已有此歌曲，则将此歌曲从喜欢列表移除
                state.likedList.splice(likedSongIndex, 1)

            }

            localStorage.setItem('likedList', JSON.stringify(state.likedList))
        },
        //收藏歌曲只能从收藏页面移除
        removeMarkSong(state, songIndex) {
            state.markList[state.markListIndex].list.splice(songIndex, 1)
            Message({
                showClose: true,
                type: 'success',
                message: "已将此歌曲从收藏列表移除"
            });
            localStorage.setItem('markList', JSON.stringify(state.markList))
        },
        handleDiscoverList(state) {
            getDiscoverList().then(res => {
                //console.log(res)
                state.discoverList = res.data.data.list

            }).catch(err => {
                //console.log(err)
                Message({
                    showClose: true,
                    type: 'error',
                    message: "请求数据出错：" + err
                });
            })
        },
        //修改专辑图片样式，使专辑图片暂停转动（保持已转动的角度）
        albumRotatePaused(state) {
            state.albumImgRotateStyle = {
                'animation': 'albumRotate 20s linear infinite paused'
            }
        },
        handleSearchSong(state, searchText) {
            state.searchText = searchText
            state.isSearchPageBlur = true
            getSearchList(state.searchText, 1)
                .then(res => {
                    let searchList = res.data.data.list
                        //有一些无id歌曲，将其剔除掉。因为没id根本无法得到歌曲资源
                    state.searchList = searchList.filter(item => item.songmid.length === 14)
                    console.log(state.searchList)
                        //搜索后再显示loadMore
                    state.haveSearched = true
                    state.isSearchPageBlur = false
                })
                .catch(err => {
                    console.log(err)
                    Message({
                        showClose: true,
                        type: 'error',
                        message: "请求数据出错：" + err

                    });
                    state.isSearchPageBlur = false
                })
        },
        sendCurrentTime(state, currentTime) {
            state.currentTime = currentTime
        },
        sendPlayMode(state, mode) {
            state.playMode = mode
        },
        //修改专辑图片样式，使专辑图片开始转动
        albumRotateRunning(state) {
            state.albumImgRotateStyle = {
                'animation': 'albumRotate 20s linear infinite running'
            }
        },
        addMarkSong(state, markListIndex) {
            state.markList[markListIndex].list.unshift(state.selectedSong)
            Message({
                showClose: true,
                type: "success",
                message: "收藏成功，歌曲已加入歌单",

            });
            localStorage.setItem('markList', JSON.stringify(state.markList))
        },
        //处理随机播放模式下的下一首
        handleRandomMode(state) {
            let randomIndex = Math.floor(Math.random() * state.currentList.length)
            state.currentListIndex = randomIndex
            this.commit('getSongUrlAndLyric')
        },
        playPreviousSong(state) {
            //各个列表上一首到头则index重新置零
            state.currentListIndex -= 1
            if (state.currentListIndex >= 0) {
                this.commit('getSongUrlAndLyric')
            } else {
                state.currentListIndex = 0
            }
        },

        playCurrentSong() {
            this.commit('getSongUrlAndLyric')
        },

        playNextSong(state) {
            //各个列表下一首到头了，则将index停留在最后一位
            state.currentListIndex += 1
            if (state.currentListIndex < state.currentList.length) {
                this.commit('getSongUrlAndLyric')
            } else {
                //当播放列表index超出，如果是列表循环模式，则将index置零，从头开始播放
                if (state.playMode === "listCycleMode") {
                    state.currentListIndex = 0
                    this.commit('getSongUrlAndLyric')
                } else {
                    //如果不是列表循环模式，则index停留在最后
                    state.currentListIndex = state.currentList.length - 1
                    this.commit('albumRotatePaused')
                }
            }
        },
        sendInputFocus(state, isInputFocus) {
            state.isInputFocus = isInputFocus
        },
    },
    actions: {},
    modules: {}

})