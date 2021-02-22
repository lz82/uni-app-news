<template>
	<view>
		<nav-bar />
    <view v-for="item in 100">{{item }} 的内容</view>
	</view>
</template>

<script>
  import NavBar from '../../../components/nav-bar'
	export default {
    name: 'Home',
    
    components: {
      NavBar
    },
    
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
