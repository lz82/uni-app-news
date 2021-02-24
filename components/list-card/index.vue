<template>
	<view class="list-card">
		<view class="img">
      <image src="/static/follow-active.png" mode="aspectFill" />
    </view>
    
    <view class="content">
      <view class="title">
        <text>
          uni-app 开发框架
        </text>
      </view>
      <view class="desc">
        <view class="tag-wrapper">
          <view class="tag">前端</view>
          <view class="tag">后端</view>
        </view>
        <view class="cnt">100浏览</view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    props: {
      
    },
    
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.list-card {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px;
  margin: 10px 10px 0;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba($color: #000, $alpha: 0.1);
  box-sizing: border-box;
  
  .img {
    flex: 0 0 60px;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
    
    image {
      width: 100%;
      height: 100%;
    }
  }
  
  .content {
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
    
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    
    .title {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: 1.2;
      
      text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    
    .desc {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      font-size: 12px;
      
      .tag-wrapper {
        display: flex;
        flex-flow: row wrap;
        
        .tag {
          padding: 0 5px;
          margin-right: 5px;
          border: solid 1px $primary-color;
          color: $primary-color;
          border-radius: 5px;
        }
      }
      
      .cnt {
        font-size: 12px;
        color: rgba(0,0,0,0.4);
      }
    }
  }
}
</style>
