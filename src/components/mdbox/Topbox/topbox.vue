<template>
  <div class="top">
    <div class="input">
      <input
        type="text"
        class="search-input"
        placeholder="搜索音乐"
        v-model.trim="searchtext"
        @change="searchSong"
        @input="isShowSearchHistory = true"
      />
      <div class="search-history-box" v-show="isShowSearchHistory">lish</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchtext: "",
      isShowSearchHistory: false,
    };
  },
  methods: {
      searchSong(){
          this.isShowSearchHistory=false
          if(searchtext!==""){
               //防止无输入搜索
               this.$router.push("searchPage")
               this.$store.commit("handleSearchSong", this.searchtext)
          }
      }
  },
};
</script>

<style>
.top {
  width: 100%;
  height: 50px;
  position: relative;
}

.input {
  position: absolute;
  width: 400px;
  height: 30px;
  float: left;
  left:50%;
  margin-left: -200px;
  margin-top: 10px;
}
.search-input {
  border: none;
  width: 400px;
  height: 30px;
  color: var(--font-color);
  box-sizing: border-box;
  padding-left: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.search-input:focus {
  outline: 0;
  box-shadow: 0 0 5px var(--highlight-deep-color);
  background-color: rgba(255, 255, 255, 0.6);
}
.search-history-box {
  width: 400px;
  max-height: 100px;
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 0 0 5px var(--highlight-deep-color);
}
</style>
