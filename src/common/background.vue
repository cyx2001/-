<template>
 <div class="background-color">
    <div class="background-box">
      <div :class="[{themeChange : (index === 0)},item]" v-for="(item, index) in backgroundList" :style="{zIndex: -index}" :key="item + item.length">
        <img v-if="item == 'chameleon-theme'" :src="getAlbumImg" />
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>

</style>