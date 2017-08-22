<template>
	<div class="box">
		<div class="backgrounds">
			<img :src="picUrls" />
		</div>
		<p class="box-header">播放队列&nbsp;&nbsp;<span>({{currentList.length+1||0}}首)</span></p>
		<scroll class="wrap" ref='scroll'>
			<div>
				<p ref='listP' class="box-list" v-for='(item,index) in currentList' @click="selectMini(item,index)" :class="{'currentStyle':index===currentIndex}">
					<span class="song">{{item.songname||item.title}}</span>
					<span class="singer" :class="{'currentStyle':index===currentIndex}">-&nbsp;&nbsp;{{item.singer[0].name||'无名'}}</span>
				</p>
			</div>
		</scroll>
		<p class="box-footer" @click='toggless'>关闭</p>
	</div>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				miniList: []
			}
		},
		props: {
			picUrls: {
				type: String,
				default: ''
			},
			toggleMiniPlay: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters([
				'currentList',
				'currentIndex',
				'playingState',
			])
		},
		methods: {
			toggless() {
				let el = this.$refs.listP[this.currentIndex]
				this.$refs.scroll.scrollToElement(el, 1000)
				this.$emit('togglePlaying')
			},
			selectMini(item, index) {
				this.selectItemPlayers({
					list: this.currentList,
					index,
				})
			},
			...mapActions([
				'selectItemPlayers'
			])
		},
		components: {
			Scroll
		},
		watch: {
			toggleMiniPlay() {
				this.$refs.scroll.refresh()
			}
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
@import '~common/stylus/base'
 .box
  width:100%
  position:absolute
  bottom:0
  height:55%
  color:$rgb1
  text-align:center
  z-index:300
  overflow:hidden
  .box-header
   background:$rgb3
   height:15%
   width:100%
   box-sizing:$boxs
   border-bottom:1px solid $rgb2 
   font-size:$fg
   padding-top:4%
   z-index:300
   span
    font-size:$fn
    color:$rgb2
  .backgrounds
   z-index:-1
   text-align:left
   background:#000
   position:absolute
   filter:blur(20px)
   width:100%
   height:100%
   overflow:hidden
   img
    position:absolute
    bottom:0
    height:160%
  .wrap
   z-index:300
   width:100%
   height:70%
   overflow:hidden
   background:$rgb3
   .box-list
    background:$rgb4
    width:100%
    height:43px
    border-bottom:1px solid $hr
    box-sizing:$boxs  
    font-size:$fn
    line-height:43px
    text-align:left
    padding-left:4%
    &.currentStyle
     color:$theme
    .song
     max-width:40%
     float:left
     wraps()
    .singer
     wraps()
     max-width:40%
     font-size:$fm
     float:left
     color:$rgb2
     padding-left:6px
     &.currentStyle
      color:$theme
  .box-footer
   background:$rgb3
   z-index:300
   width:100%
   height:15%
   border-top:1px solid $rgb2 
   box-sizing:$boxs
   font-size:$fg
   padding-top:4%
</style>