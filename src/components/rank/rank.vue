<template>
	<div>
		<scroll class="content" :data='topList'>
			<div>
				<ul class="wraps">
					<li class="portrait" v-for='item in topList' @click='selecteRank(item)'>
						<div class="wrap">
							<img v-lazy="item.picUrl" />
							<p class="initText">
								<span class="icon-headphones"></span>
								<span>{{Math.round(parseFloat(item.listenCount/1000))/10||'0'}}万</span>
							</p>
						</div>
						<div class="right">
							<h1>{{item.topTitle||''}}</h1>
							<ol>
								<li v-for='(items,index) in item.songList'>
									{{index+1}}&nbsp;
									<span>{{items.songname||'无名'}}</span> -&nbsp;{{items.singername||''}}
								</li>
							</ol>
						</div>
					</li>
				</ul>
			</div>
			<div class="loading" v-show="!topList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>
<script>
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import { getRank } from 'common/js/recommend'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				topList: []
			}
		},
		created() {
			setTimeout(() => {
				this._getRank()
			}, 20)
		},
		methods: {
			_getRank() {
				getRank().then((res) => {
					if(res.code === 0) {
						const newList = res.data.topList
						newList.splice(12, 1)
						this.topList = newList
					}
				})
			},
			selecteRank(item) {
				this.$router.push({
					path: `/rank/${item.id}`
				})
				this.storeRankList(item)
				this.rgbList(this.topList)
			},
			...mapMutations({
				storeRankList: 'storerank',
				rgbList: 'RgbList'
			})
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
 @import '~common/stylus/base'
 .content
  position:absolute
  width:100%
  top:80px
  bottom:0
  background:$bkg
  overflow:hidden
  .wraps
   width:95%
   margin:10px auto 0
   height:100%
   .portrait
    width:100%
    margin-bottom:10px
    background:#FFF
    height:100px
    overflow:hidden
    position:relative
    .wrap
     width:100px
     overflow:hidden
     position:relative
     img
      width:100%
     .initText
      position:absolute
      left:4px
      bottom:6px
      color:#fff
      opacity:0.6
      font-size:10px
    .right
     position:absolute
     left:100px
     right:0
     top:0
     height:100%
     padding-left:5px
     h1
      font-size:$fn
      height:30px
      line-height:30px
     ol
      display:flex
      height:70px
      justify-content:space-around
      flex-direction:column
      font-size:$fn
      li 
       wraps()
       color:$text
       span
        color:#000
  .loading
   position:absolute
   top:48%
   width:100%
</style>