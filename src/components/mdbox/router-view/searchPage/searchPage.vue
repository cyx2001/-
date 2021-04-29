<template>
  <div class="search-list-page">
    <song-list
      :list="searchList"
      :class="{ blur: isSearchPageBlur }"
      ref="searchList"
    ></song-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "../../../../common/songlist";
export default {
  components: { SongList },
  data() {
    return {};
  },
  computed: {
    ...mapState(["searchList", "isSearchPageBlur"]),
  },
  methods: {playThisSong(item, index) {
      var payload = {
        index: index,
        activatedPage: "SearchPage",
      };

      this.$store.commit("sendCurrentIndex", payload);
      this.$store.commit("playCurrentSong");
    },

    likeSong(item, index) {
      this.$store.commit("sendLikedSong", item);
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

    backTop() {
      this.$refs.searchListBoxDom.scrollTop = 0;
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
</style>
