<template>
  <view class="home">
    <nav-bar />
    <tab :label="tabList" :current="currentTab" @tab-click="onTabClick" />
    <div class="list">
      <swiper class="swiper" :current="currentTab" @change="onSwiperChange">
        <swiper-item class="swiper-item" v-for="i in 6">
          <scroll-list-y class="scroll-list">
            <view v-for="item in cachedList[currentTab]" :key="item._id">
              <list-card
                :title="item.title"
                :cover="item.cover[0]"
                :tag="item.classify"
                :browse="item.browse_count"
              />
            </view>
          </scroll-list-y>
        </swiper-item>
      </swiper>
    </div>
  </view>
</template>

<script>
import NavBar from '../../../components/nav-bar';
import Tab from '../../../components/tab';
import ScrollListY from '../../../components/scroll-list-y';
import ListCard from '../../../components/list-card';
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
      currentTab: 0,
      list: [],
      cachedList: {}
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

        const list = await homeApi.getArticleList(this.currentArticleType);
        // this.list = list.data
        // this.cachedList[0] = list.data
        this.$set(this.cachedList, 0, list.data);
        
      } catch (err) {
        console.log(err);
      }
    },

    onTabClick(item, index) {
      this.currentTab = index;
    },

    onSwiperChange({ detail: { current } }) {
      this.currentTab = current;
    }
  },

  computed: {
    currentArticleType() {
      return this.tabList[this.currentTab].name;
    }
  },

  watch: {
    async currentTab(newVal) {
      try {
        const list = await homeApi.getArticleList(this.currentArticleType);
        // this.list = list.data
        // this.cachedList[newVal] = list.data
        this.$set(this.cachedList, newVal, list.data);
      } catch (err) {
        console.log(err);
      }
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

  .list {
    height: 100%;

    .swiper {
      height: 100%;

      .swiper-item {
        height: 100%;

        .scroll-list {
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
