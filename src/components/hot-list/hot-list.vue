<template>
	<div class="div1" v-show="hotlists.length">
		<h1>热门歌单</h1>
		<ul class="lists">
			<li v-for='(item,index) in hotlists' @click='selectList(item)'>
				<div class="wraps">
					<img v-lazy='item.imgurl' />
					<span class="icon-play2"></span>
					<p class="initText">
						<span class="icon-headphones"></span>
						<span>{{Math.round(parseFloat(item.listennum/1000))/10}}万</span>
					</p>
				</div>
				<p v-html='item.dissname'></p>
				<p v-html='item.author' class="author"></p>
			</li>
		</ul>
	</div>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { mapMutations } from 'vuex'
	export default {
		props: {
			hotlists: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectList(item) {
				this.$emit('selectList', item)
				this.passHot(this.hotlists)
			},
			...mapMutations({
				passHot: 'passHot'
			})
		}
	}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/base'
 .div1
  margin-top:8px
  width:100%
  overflow:hidden
  h1
   font-size:$fn
   padding-left:3%
   height:40px
   line-height:40px
  .lists
   width:100%
   li
    margin-left:3%
    float:left
    width:45%
    overflow:hidden
    background:#FFF
    position:relative
    margin-bottom:10px
    .wraps
     width:100%
     overflow:hidden
     position:relative
     .icon-play2
       position:absolute
       right:10px
       bottom:10px
       color:#fff
       opacity:0.8
       font-size:$fb
       width:24px
       height:24px
     img
      width:100%
   	 .initText
      position:absolute
      left:0
      bottom:4px
      color:#fff
      opacity:0.8
      span
       font-size:12px
    p
     font-size:$fn
     wraps()
     width:100%
     height:30px 
     line-height:30px
     padding-left:5px
    .author
     font-size:$fm
     padding-bottom:5px
    .radioTitle
     padding:5px 0 5px 5px  
</style>