<template>
  <div id="app">
    <div class="app-background">
      <background-color></background-color>
    </div>
    <div class="app-background-above">
      <component v-if="isShowDialog" :is="dialog"></component>
      <left-nav></left-nav>
      <middle-box></middle-box>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MiddleBox from "./components/mdbox/mdbox";
import LeftNav from "./components/leftnav/leftnav";
import BackgroundColor from "./common/background";
import RemoveSongList from "./common/dialog/RemoveSongList.vue";
import AddMarkSong from "./common/dialog/AddMarkSong.vue";
export default {
  name: "app",
  components: {
    LeftNav,
    MiddleBox,
    BackgroundColor,
    RemoveSongList,
    AddMarkSong,
  },
  computed: {
    ...mapState([
      "dialog",
      "isShowDialog",
      "isShowSettingPanel",
      "backgroundTheme",
    ]),
  },
  watch: {
    //绘制设置面板展示和隐藏的翻转动画
    isShowSettingPanel: function (newValue) {
      if (newValue === true) {
        this.appStyle = {
          animation: "Flip_0-90 0.3s linear forwards",
        };
      } else {
        this.appStyle = {
          transform: "rotateY(90deg)",
          animation: "Flip_90-0 0.3s linear 0.3s forwards",
        };
      }
    },
  },
  mounted() {
    this.$store.commit("getHistoryData");
    this.$router.push("discoverPage");
  },
};
</script>

<style>
:root {
  --highlight-color: #c5b5f0;
  --highlight-deep-color: #7e57c2;
  --font-size: 16px;
  --font-color: black;
  --background-color: #fdfdfd;
  --progress-bar-color: rgba(255, 255, 255, 0.1);
}
body {
  position: relative;
  perspective: 20000px;
}
#app {
  width: 1500px;
  height: 830px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  color: var(--font-color);
  margin: 0;
  padding: 0;
}
.app-background {
  width: 1470px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  background-color: rgb(158, 158, 204);
  overflow: hidden;
}
.app-background-above {
  width: 1470px;
  height: 800px;
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

/* 下面修改全局滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
