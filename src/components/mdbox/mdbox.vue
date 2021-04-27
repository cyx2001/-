<template>
 <div class="middle-box">
   <top-box> </top-box>
    <view-box></view-box>
    <bottom-box></bottom-box>
 </div>
</template>

<script>
import TopBox from './Topbox/topbox'
import ViewBox from './router-view/viewbox'
import BottomBox from './bottombox/bottombox'
export default{
   name: 'middle-box',
  components: {
    TopBox,
    ViewBox,
    BottomBox
  }
}

</script>

<style>
.middle-box {
  width: 1260px;
  height: 100%;
  float: left;
}

</style>
