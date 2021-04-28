<template>
  <div class="liked-list-page">
    xi
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["likedList"]),
  },
  methods: {},
};
</script>

<style>
.liked-list-page {
  width: 100%;
  height: 100%;
}
</style>
