<template>
  <section class="app-main" >
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"  />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */

  position: relative;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0px 0px 10px 2px rgb(184, 184, 184);
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
