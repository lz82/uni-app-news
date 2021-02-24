<template>
  <view class="tab-wrapper">
      <scroll-view class="tab-container" scroll-x>
       <ul>
        	<li 
            v-for="(item, index) in label" 
            :key="index" 
            :class="{active: index === current}"
            @click="onTabClick(item, index)"
           >
            {{item.name}}
           </li>
        </ul>
      </scroll-view>
    <view class="icon">
       <uni-icons type="gear" size="28" color="#666" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: Array,
      default() {
        return []
      }
    },
    current: {
       type: Number,
       default: 0
    }
  },
  
  data() {
    return {
    };
  },
  
  methods: {
    onTabClick(item, index) {
      this.$emit('tab-click', item, index)
    }
  }
};
</script>

<style lang="scss">
.tab-wrapper {
  height: 45px;
  box-sizing: border-box;
  
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  
  border-bottom: solid 1px #f5f5f5;
  
  .tab-container {
    flex: 1 1 auto;
    
    ul {
      height: 45px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1 1 auto;
      
      li {
        padding: 0 10px;
        display: flex;
        flex-flow: row nowrap;
        flex: 0 0 auto;
        color: #333;
        font-size: 14px;
        
        &.active {
          color: $primary-color;
        }
      }
    }
  }
  
  .icon {
    flex: 0 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
      width: 1px;
      height: 21px;
      background: #ddd;
    }
  }
}
</style>
