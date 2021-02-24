<template>
  <view class="scroll-list-y">
    <scroll-view class="scroll-container" scroll-y="">
      <view class="list-wrapper">
        <slot />
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.scroll-list-y {
  height: 100%;
  display: flex;
  .scroll-container {
    
    .list-wrapper {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-flow: column nowrap;
    }
  }
}
</style>
