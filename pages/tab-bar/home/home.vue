<template>
  <view class="home">
    <nav-bar />
    <tab :label="tabList" :current="currentTab" @tab-click="onTabClick" />
    <scroll-list-y class="scroll-list">
      <view v-for="item in 5">
        <list-card></list-card>
      </view>
    </scroll-list-y>
  </view>
</template>

<script>
import NavBar from '../../../components/nav-bar';
import Tab from '../../../components/tab';
import ScrollListY from '../../../components/scroll-list-y'
import ListCard from '../../../components/list-card'
import { homeApi } from '../../../services';

export default {
  name: 'Home',

  components: {
    NavBar,
    Tab,
    ScrollListY,
    ListCard
  },

  data() {
    return {
      tabList: [],
      currentTab: 0
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  methods: {
    async init() {
      try { 
        const res = await homeApi.getLabel();
        this.tabList = res;
      } catch (err) {
        console.log(err);
      }
    },
    
    onTabClick(item, index) {
      this.currentTab = index
    }
  }
};
</script>

<style lang="scss">
  page {
    height: 100%;
  }
  .home {
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    
    .scroll-list {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
