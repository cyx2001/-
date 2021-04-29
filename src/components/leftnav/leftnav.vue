<template>
 <div class="left-nav">
     <div class="logo-box">
      <div class="logo">
        <img src="@/assets/logo.svg" width="50px" />
      </div>
      <div class="app-name">迷你音乐</div>
    </div>
    <div class="router-button-box">
      <router-link to="/discoverPage" class="nav-item">
         <img class="nav-icon" src="@/assets/discover.svg" />
        <div class="nav-text">发现</div>
      </router-link>
      <router-link to="/lyricPage" class="nav-item">
         <img class="nav-icon" src="@/assets/lyric.svg" />
        <div class="nav-text">歌词</div>
      </router-link>
       <router-link to="/searchPage" class="nav-item">
         <img class="nav-icon" src="@/assets/search.svg" />
        <div class="nav-text">搜索</div>
      </router-link>
       <router-link to="/likedPage" class="nav-item">
         <img class="nav-icon" src="@/assets/like.svg" />
        <div class="nav-text">喜欢歌单</div>
      </router-link>
        <router-link to="/markPage" class="nav-item">
         <img class="nav-icon" src="@/assets/mark.svg" />
        <div class="nav-text">收藏</div>
      </router-link>
    </div>
    
    <div class="playing-box">
      <div class="album-img-box">
          <album-img></album-img>
      </div>
      <div class="playing-song-name">
        {{ currentList.length === 0 ? "" : currentList[currentListIndex].songname }}
      </div>
      <div class="playing-singer-name">
        {{ currentList.length == 0 ? "" : currentList[currentListIndex].singer.name }}
      </div>
    </div>
 </div>
</template>

<script>
import { mapState } from "vuex";
import AlbumImg from "./album_img/AlbumImg.vue";
export default {
     components: { AlbumImg },
     computed: {
    ...mapState(["currentList", "currentListIndex"]),
  },
}
</script>

<style>
.left-nav {
  width: 200px;
  height: 100%;
  float: left;
  position: relative;
  border-radius: 20px 0 0 20px;
}

.logo-box {
  width: 160px;
  height: 50px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
}

.logo {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
}

.router-button-box {
  width: 100%;
  height: 470px;
  overflow: hidden;
}

.nav-item {
  width: 160px;
  height: 30px;
  display: block;
  margin-left: 20px;
  margin-bottom: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-item:first-child {
  margin-top: 50px;
}

.nav-item:hover {
  background-color: var(--highlight-color);
}

.nav-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
}

.nav-text {
  float: left;
  height: 30px;
  margin-left: 5px;
  line-height: 30px;
  color: var(--font-color);
}

.playing-box {
  width: 200px;
  height: 240px;
}

.album-img-box {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.playing-song-name {
  width: 180px;
  height: 20px;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.playing-singer-name {
  width: 180px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
