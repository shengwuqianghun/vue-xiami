<template>
	<div>
		<scroll ref='scroll' class='recommend' :data='hotlists&&sliders'>
			<div>
				<div class="slider-wrap">
					<slider v-if='sliders.length' @watchs=watchs>
						<div v-for='item in sliders'>
							<a :href='item.linkUrl'>
								<img :src="item.picUrl" @load='loadImage' />
							</a>
						</div>
					</slider>
				</div>
				<hot-list :hotlists='hotlists' @selectList='selectRouter'></hot-list>
				<div class="loading" v-show="!hotlists.length">
					<loading></loading>
				</div>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>
<script>
	import Loading from 'base/loading/loading'
	import Slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import { getRecommend, getHotList } from 'common/js/recommend'
	import HotList from 'components/hot-list/hot-list'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				sliders: [],
				hotlists: []
			}
		},
		created() {
			setTimeout(() => {
				this._getRecommend()
			}, 20)
		},
		methods: {
			watchs(argue){
				if(argue){
					this.$refs.scroll.refresh()
				}
			},
			callbacks() {
				let randoms = Math.random().toString().substr(2)
				return 'GetRecomListCallback' + randoms
			},
			_getRecommend() {
				getHotList(this.callbacks()).then((res) => {
					if(res.code === 0) {
						this.hotlists = res.data.hotdiss.list.splice(0, 8)
					}
				})
				getRecommend().then((res) => {
					if(res.code === 0) {
						this.sliders = res.data.slider
					}
				})
			},
			loadImage() {
				if(!this.checkOut) {
					this.checkOut = true
					this.$refs.scroll.refresh()
				}
			},
			selectRouter(item) {
				this.$router.push({
					path: `/recommend/${item.id}`
				})
				this.storeSongList(item)
			},
			...mapMutations({
				storeSongList: 'storesong'
			})
		},
		components: {
			Slider,
			Scroll,
			HotList,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
@import "~common/stylus/base"
.recommend
 position:absolute
 width:100%
 top:80px
 bottom:0
 background:$bkg
 overflow:hidden
 .loading
  padding-top:35%
  width:100%
</style>