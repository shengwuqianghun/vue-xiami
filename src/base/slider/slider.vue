<template>
	<div class="slider" ref='slider'>
		<div class="slider-group" ref='sliderGroup'>
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class='{active:currentPageIndex===index}'></span>
		</div>
	</div>
</template>
<script>
	import { addClass, hasClass } from 'common/js/dom'
	import BSscroll from 'better-scroll'
	export default {
		data() {
			return {
				dots: [],
				currentPageIndex: 0,
				autoPlay: true,
				interval: 4000
			}
		},
		mounted() {
			setTimeout(() => {
				this._setSliderWidth()
				this._initdots()
				this._initSlider()
				if(this.autoPlay) {
					this._play()
				}
			}, 20)
			window.addEventListener('resize', () => {
				if(!this.slider) {
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
		},
		methods: {
			_setSliderWidth(isResize) {
				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				this.children = this.$refs.sliderGroup.children
				for(let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					addClass(child, 'slider-item')
					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}
				if(!isResize) {
					width += 2 * sliderWidth
				}
				this.$refs.sliderGroup.style.width = width + 'px'
				this.$emit('watchs',true)
			},
			_initSlider() {
				this.slider = new BSscroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: true,
					snapThreshold: 0.3,
					snapSpeed: 400
				})
				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX
					pageIndex -= 1
					this.currentPageIndex = pageIndex
					if(this.autoPlay) {
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			_initdots() {
				this.dots = new Array(this.children.length)
			},
			_play() {
				let pageIndex = this.currentPageIndex + 1
				pageIndex += 1
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		},
		destroyed() {
			clearTimeout(this.timer)
		}
	}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
 @import "~common/stylus/base"
  .slider
   min-height: 1px
   position:relative
   overflow:hidden
   .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
     float: left
     box-sizing: border-box
     overflow: hidden
     text-align: center
     a
      display: block
      width: 100%
      overflow: hidden
      text-decoration: none
      img
       display: block
       width: 100%
   .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
     display: inline-block
     margin: 0 4px
     width: 8px
     height: 8px
     border-radius: 50%
     background: #fff
     &.active
      width: 20px
      border-radius: 5px
      background: rgba(144,144,144,.8)
</style>