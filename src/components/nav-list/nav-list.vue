<template>
	<div>
		<div class="header">
		</div>
		<nav>
			<router-link tag="a" to='/recommend' >推荐</router-link>
			<router-link tag="a" to='/rank' >排行榜</router-link>
			<router-link tag="a" to='/storehouse' >搜索</router-link>
		</nav>
	</div>
</template>
<script>
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
@import '~common/stylus/base'
.header
 width:100%
 background:$theme
 height:40px
nav
 font-size:$fg
 width:100%
 display:flex
 color:$fonts
 height:40px
 a
  flex:1
  display:block
  padding:10px  
  text-align:center
  &.router-link-active
   border-bottom:2px solid $theme
   color:$theme
</style>