<template>
  <div class="discover-page">
    <!--回到顶部-->
    <div class="discover-backtop" @click="backTop" v-show="isShowBackTop">
      <img src="@/assets/backtop.svg" width="30px" />
    </div>
    <div class="discover-title">推荐歌曲</div>

    <div class="discover-item-box" ref="discoverItemBoxDOM">
      <div
        class="discover-item"
        v-for="(item, index) in discoverList"
        :key="item.songmid"
        :style="
          currentList.length === 0
            ? ''
            : currentList[currentListIndex].songmid === item.songmid
            ? playingSongStyle
            : ''
        "
      >
        <img
          class="discover-like-img"
          @click="likeSong(item)"
          :src="setLikeImgUrl(item)"
        />
        <img
          class="discover-album-img"
          @click="playThisSong(item, index)"
          :src="item.albumimg"
          width="200px"
        />
        <div class="discover-album-info">
          <div class="discover-song-name">{{ item.songname }}</div>
          <div class="discover-singer-name">{{ item.singer.name }}</div>
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
      scrollerPosition: 0,
      isShowBackTop: false,
      playingSongStyle: {
        transform: "scale(1.1)",
      },
    };
  },
  computed: {
    ...mapState([
      "currentList",
      "currentListIndex",
      "discoverList",
      "likedList",
    ]),
  },
  mounted() {
    this.$store.commit("handleDiscoverList");

    //当滑块滑动到一定距离再出现
    this.$refs.discoverItemBoxDOM.addEventListener("scroll", () => {
      if (this.$refs.discoverItemBoxDOM.scrollTop > 600) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    //记下离开时滑块位置
    this.scrollerPosition = this.$refs.discoverItemBoxDOM.scrollTop;
    next();
  },
  activated() {
    //激活后恢复滑块位置
    this.$refs.discoverItemBoxDOM.scrollTop = this.scrollerPosition;
  },
  methods: {
    playThisSong(item, index) {
      let payload = {
        index: index,
        list: this.discoverList,
      };

      this.$store.commit("sendCurrentIndex", payload);
      this.$store.commit("playCurrentSong");
    },

    likeSong(item) {
      this.$store.commit("sendLikedSong", item);
    },

    setLikeImgUrl(item) {
      //将like的歌曲逐一与likedList中的歌曲对比，如有likedList中的歌曲，则红心点亮
      let isThisSongLiked = false;

      this.likedList.forEach((likedItem) => {
        if (likedItem.songmid === item.songmid) {
          isThisSongLiked = true;
        }
      });
      return isThisSongLiked === true ? this.likedImgUrl : this.likeImgUrl;
    },
    backTop() {
      this.$refs.discoverItemBoxDOM.scrollTop = 0;
    },
  },
};
</script>

<style>
.discover-page {
  position: relative;
  width: 100%;
  height: 100%;
}
.discover-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}
.discover-backtop {
  width: 30px;
  height: 30px;
  margin-left: 1165px;
  margin-top: 640px;
  position: fixed;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 3;
}

.discover-backtop:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.discover-backtop:active {
  transform: scale(1.2);
}
.discover-item-box {
  width: 100%;
  height: 640px;
  overflow: hidden scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.discover-item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

.discover-item:hover {
  transform: scale(1.1);
  z-index: 1;
}
.discover-album-img {
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

.discover-album-img:hover {
  cursor: pointer;
}

.discover-like-img {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 45px;
  left: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 2;
}

.discover-like-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.discover-like-img:active {
  transform: scale(1.5);
}

.discover-album-info {
  width: 100%;
}

.discover-song-name {
  width: 200px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.discover-singer-name {
  width: 200px;
  margin-top: 5px;
  font-size: 13px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
