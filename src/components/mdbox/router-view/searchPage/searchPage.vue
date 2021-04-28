<template>
  <div class="search-list-page" ref="searchList"  :class="{ blur: isSearchPageBlur }">
    <div class="search-list">
      <div class="song-list-backtop" @click="backTop" v-show="isShowBackTop">
        <img src="@/assets/backtop.svg" width="30px" />
      </div>
      <div class="song-list-title">
        <div></div>
        <div>歌名</div>
        <div>歌手</div>
        <div>专辑</div>
      </div>
      <div class="song-list-box" @scroll="scroll" ref="songListBoxDOM">
        <div
          class="song-list-item"
          v-for="(item, index) in searchList"
          @click.right="mouseRightClick($event, item, index)"
          :key="item.songmid"
          :style="
            (currentList.length === 0
              ? ''
              : currentList[currentListIndex].songmid === item.songmid
              ? playingSongStyle
              : '') || (selectSongIndex === index ? selectSongStyle : '')
          "
        >
          <div class="mark-img" >
            <img
              :src="setMarkImgUrl(item)"
              @click="removeMarkSong(index)"
              width="18px"
            />
          </div>
          <div class="like-img" >
            <img
              :src="setLikeImgUrl(item)"
              @click="likeSong(item)"
              width="18px"
            />
          </div>
          <div class="song-list-song-name" @click="playThisSong(item, index)">
            {{ item.songname }}
          </div>
          <div class="song-list-singer-name" @click="playThisSong(item, index)">
            {{ item.singer.name }}
          </div>
          <div class="song-list-album-name" @click="playThisSong(item, index)">
            {{ item.albumname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      likeImgUrl: require("@/assets/like.svg"),
      likedImgUrl: require("@/assets/liked.svg"),
      markImgUrl: require("@/assets/mark.svg"),
      markedImgUrl: require("@/assets/marked.svg"),
      scrollerPosition: 0,
      isShowBackTop: false,
      playingSongStyle: { 
        "background-color": "var(--highlight-color)",
        "border-radius": "10px",
      },
      selectSongIndex: null,
      selectSongStyle: {
        "border-radius": "10px",
        "background-color": "rgba(197, 181, 240, 0.5)",
      },
    };
  },
  activated() {
    //重新进入页面后，保持原来的滚动位置
    this.$refs.songListBoxDOM.scrollTop = this.scrollerPosition;
  },
  computed: {
    ...mapState([
      "searchList",
      "currentList",
      "currentListIndex",
      "likedList",
      "markList",
      "isSearchPageBlur"
    ]),
  },
  methods: {
    playThisSong(item, index) {
      let payload = {
        index: index,
        list: searchList,
        activatedPage: "SearchPage",
      };

      //将用户点击的歌曲index连带歌单一起发送至vuex
      this.$store.commit("sendCurrentIndex", payload);
      this.$store.commit("playCurrentSong");
    },

    likeSong(item) {
      this.$store.commit("sendLikedSong", item);
    },

    removeMarkSong(index) {
      this.$store.commit("removeMarkSong", index);
    },

    setLikeImgUrl(item) {
      let isThisSongLiked = false;

      //将已like的歌曲逐一与搜索列表对比，如有likedList中的歌曲，则红心点亮
      this.likedList.forEach((likedItem) => {
        if (likedItem.songmid === item.songmid) {
          isThisSongLiked = true;
        }
      });

      return isThisSongLiked ? this.likedImgUrl : this.likeImgUrl;
    },

    setMarkImgUrl(item) {
      let isThisSongMarked = false;

      //检测当前歌曲是否已在收藏列表中
      //在，则点亮star。否则不点亮。
      this.markList.forEach((songList) => {
        songList.list.forEach((markItem) => {
          if (markItem.songmid === item.songmid) {
            isThisSongMarked = true;
          }
        });
      });

      return isThisSongMarked ? this.markedImgUrl : this.markImgUrl;
    },
    backTop() {
      //如丝般流畅地滑到顶端
      let timer = setInterval(() => {
        this.$refs.songListBoxDOM.scrollTop -= 100;
        if (this.$refs.songListBoxDOM.scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 10);
      this.$refs.searchListBoxDom.scrollTop = 0;
    }, //监听页面滚动事件
    scroll(e) {
      //当滑块滑动到一定距离一键回顶才出现
      this.scrollerPosition = e.target.scrollTop;

      if (this.scrollerPosition > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    mouseRightClick(e, item, index) {
      //将右键选中的歌曲绘制出橙色边框
      this.selectSongIndex = index;
      this.$store.commit("sendSelectedSong", item);

      //右键显示弹出窗口
      this.$popbox.showPopBox({
        positionX: e.pageX,
        positionY: e.pageY,
      });
    },
  },
};
</script>

<style>
.search-list-page {
  position: relative;
  width: 100%;
  height: 100%;
}
.search-list {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.song-list-backtop {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 45px;
  right: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}

.song-list-backtop:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.song-list-backtop:active {
  transform: scale(1.2);
}

.song-list-title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  display: flex;
  font-weight: bold;
}

.song-list-title div:nth-child(1) {
  width: 4%;
}

.song-list-title div:nth-child(2) {
  width: 40%;
}

.song-list-title div:nth-child(3) {
  width: 16%;
}

.song-list-title div:nth-child(4) {
  width: 4;
}

.song-list-box {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.song-list-item {
  height: 40px;
  line-height: 40px;
  display: flex;
  box-sizing: border-box;
}

.like-img {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.like-img:active {
  transform: scale(1.5);
}

.mark-img {
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.mark-img:active {
  transform: scale(1.5);
}

.song-list-song-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.song-list-singer-name {
  width: 16%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.song-list-album-name {
  width: 40%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.load-more:hover {
  cursor: pointer;
}
.blur {
  filter: blur(10px);
}
</style>
