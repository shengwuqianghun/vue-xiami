<template>
	<div id="app">
		<nav-list></nav-list>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>
<script type="text/javascript">
	import NavList from 'components/nav-list/nav-list'
	import Player from 'components/player/player'
	export default{
		components:{
			NavList,
			Player
		}
	}
</script>
