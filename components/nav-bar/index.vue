<template>
  <view class="nav-bar-wrapper">
    <view class="nav-bar-fixed">
      <!-- 客户端及小程序独有的状态栏 -->
      <view class="status-bar" :style="{ height: statusBarHeight + 'px' }" />
      <!-- 搜索框 -->
      <view class="nav-bar-content" :style="{height: navBarHeight + 'px' }">
        <view class="nav-bar-search" :style="{height: searchHeight + 'px', width: searchWidth + 'px' }">
          <uni-icons type="search" size="18" color="#999" style="margin-right: 10px;"></uni-icons>
          <view class="search-txt">uni-app, vue</view>
        </view>
      </view>
    </view>
    <view class="nav-bar-placeholder" :style="{ height: statusBarHeight + navBarHeight + 'px' }"></view>
  </view>
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      statusBarHeight: 20,
      navBarHeight: 45,
      searchHeight: 30,
      searchWidth: 375
    };
  },

  created(){
    // 获取手机系统信息
    const systemInfo = uni.getSystemInfoSync()
    // 设置状态栏高度
    this.statusBarHeight = systemInfo.statusBarHeight;
    console.log(systemInfo)
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    // 获取胶囊信息
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    console.log(menuButtonInfo )
    // 导航栏的高度 = （胶囊底部高度 - 状态栏高度） + （胶囊顶部高度 - 状态栏的高度）
    this.navBarHeight = (menuButtonInfo.bottom - systemInfo.statusBarHeight) + (menuButtonInfo.top - systemInfo.statusBarHeight)
    console.log(this.navBarHeight)
    this.searchHeight = menuButtonInfo.height
    this.searchWidth = menuButtonInfo.left - 15
    // #endif 
  }
};
</script>

<style lang="scss">
.nav-bar-wrapper {
  .nav-bar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background: $primary-color;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 0 15rpx;
    box-sizing: border-box;

    .nav-bar-content {
      height: 45px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .nav-bar-search {
        background: #fff;
        color: #999;
        width: 100%;
        height: 30px;
        border-radius: 15px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0 15rpx;
        box-sizing: border-box;

        .icon-search {
          width: 20px;
          height: 20px;
          background: url(img/search.png) no-repeat;
          background-size: 20px 20px;
          margin-right: 15rpx;
        }

        .search-txt {
          font-size: 14px;
        }
      }
    }
  }

  .nav-bar-placeholder {
    height: 65px;
  }
}
</style>
