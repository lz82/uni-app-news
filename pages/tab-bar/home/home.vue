<template>
  <view class="home">
    <nav-bar ref="navBar" />
    <tab :label="tabList" :current="currentTab" @tab-click="onTabClick" />
    <div class="list" :style="{ height: listHeight }">
      <swiper class="swiper" :current="currentTab" @change="onSwiperChange">
        <swiper-item class="swiper-item" v-for="i in tabList.length">
          <scroll-list-y class="scroll-list" @scrolltolower="onScrollToLower">
            <view v-for="item in cachedList[currentTab]" :key="item._id">
              <list-card :title="item.title" :cover="item.cover[0]" :tag="item.classify" :browse="item.browse_count" />
            </view>
            <uni-load-more v-show="cachedStatus[currentTab].status === 'loading' || cachedList[currentTab].length > 6" :status="cachedStatus[currentTab].status" />
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
      cachedList: {},
      cachedStatus: {}
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
        this.cachedStatus[0] = {
          status: 'loading',
          pageIndex: 1,
          pageSize: 7
        };
        const res = await homeApi.getLabel();
        this.tabList = [{ _id: 0, name: '全部', user: [] }, ...res];

        const list = await homeApi.getArticleList({
          ...this.cachedStatus[0],
          classify: this.currentArticleType
        });
        console.log(list);
        this.$set(this.cachedList, this.currentTab, list.data);
        if (list.affectedDocs === 0) {
          this.cachedStatus[this.currentTab].status = 'nomore';
        } else {
          this.cachedStatus[this.currentTab].status = 'more';
        }
      } catch (err) {
        console.log(err);
      }
    },

    onTabClick(item, index) {
      this.currentTab = index;
    },

    onSwiperChange({ detail: { current } }) {
      this.currentTab = current;
    },

    onScrollToLower() {
      const { status, pageSize } = this.cachedStatus[this.currentTab];
      if (status === 'more') {
        this.getArticleList(++this.cachedStatus[this.currentTab].pageIndex, pageSize, this.currentTab);
      }
    },

    async getArticleList(pageIndex, pageSize = 6, currentTab) {
      try {
        this.cachedStatus[currentTab]
          ? (this.cachedStatus[currentTab].status = 'loading')
          : (this.cachedStatus[currentTab] = {
              status: 'loading',
              pageIndex,
              pageSize
            });
        this.$forceUpdate();
        const list = await homeApi.getArticleList({
          classify: this.currentArticleType,
          pageIndex,
          pageSize
        });

        const oldList = this.cachedList[currentTab] || [];
        oldList.push(...list.data);
        this.$set(this.cachedList, currentTab, oldList);

        if (list.affectedDocs === 0) {
          this.cachedStatus[currentTab].status = 'nomore';
        } else {
          this.cachedStatus[currentTab].status = 'more';
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  computed: {
    currentArticleType() {
      return this.tabList[this.currentTab].name;
    },

    listHeight() {
      if (this.$refs.navBar) {
        const topHeight = this.$refs.navBar.statusBarHeight + this.$refs.navBar.navBarHeight + 50;
        return `calc(100% - ${topHeight}px)`;
      } else {
        return `calc(100% - 100px)`;
      }
    }
  },

  watch: {
    currentTab(newVal) {
      if (!this.cachedList[newVal] || !this.cachedList[newVal].length) {
        this.getArticleList(1, 7, newVal);
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
