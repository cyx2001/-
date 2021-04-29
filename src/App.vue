<template>
  <div id="app">
    <div class="app-background">
     <back-ground></back-ground>
    </div>
    <div class="app-background-above">
      <left-nav></left-nav>
      <middle-box></middle-box>
    </div>
  </div>
</template>

<script>
import MiddleBox from "./components/mdbox/mdbox";
import LeftNav from "./components/leftnav/leftnav";
import BackGround from "./common/background"
export default {
  name: "app",
  components: {
   LeftNav,
   MiddleBox,
   BackGround,
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
  --progress-bar-color: rgba(255,255,255, 0.1)
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
