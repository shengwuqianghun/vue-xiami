<template>
	<div class="songBkglist" ref='songBkglist'>
		<scroll class="songlist" :data='songList'>
			<div>
				<div class="header" ref='headers'>
					<div class="shandow"></div>
					<div class="focusContent">
						<div class="header-title" style="padding-left:2%;">
							<div class="title" ref='aniTitle'>
								<span ref='spanAnimation'>
										<label style="padding-right:100px;" ref='spanAnimation'>{{listTitle[0]||''}}</label>
										<label style="padding-right:100px;" v-show="checkShow">{{listTitle[0]||''}}</label>
									</span>
							</div>
							<p style="padding-left:10px">
								{{listTitle[1]||''}}
							</p>
						</div>
						<span class="icon-play2" @click='selectItemPlayer(null,0)'></span>
					</div>
				</div>
				<ul class="songlist">
					<li v-for='(item,index) in songList' @click='selectItemPlayer(item,index)'>
						<h1>{{item.songname||''}}</h1>
						<p>{{item.singer[0].name||'无名'}}&nbsp;-&nbsp;{{item.albumname||''}}</p>
					</li>
				</ul>
			</div>
		</scroll>
	</div>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				checkShow: false
			}
		},
		props: {
			songList: {
				type: Array,
				default: []
			},
			listTitle: {
				type: Array,
				default: []
			},
			logo: {
				type: String,
				default: ''
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._loadlogo()
			})
		},
		components: {
			Scroll
		},
		methods: {
			_loadlogo() {
				if(this.logo) {
					this.$refs.headers.style.backgroundImage = `url(${this.logo})`
				}
			},
			_animations() {
				if(this.$refs.spanAnimation.offsetWidth > this.$refs.aniTitle.offsetWidth) {
					this.checkShow = true
					let titles = this.$refs.spanAnimation
					let disX = 0
					let timer = null
					let timers = null
					setmove()
					function setmove() {
						setTimeout(() => {
							timer = setInterval(() => {
								disX += 1
								titles.style.left = -disX + 'px'
								if(titles.style.left === -parseInt(titles.offsetWidth / 2) + 'px') {
									titles.style.left = 0 + 'px'
									disX = 0
									clearInterval(timer)
									setmove()
								}
							}, 10)
						}, 2000)
					}
				}
			},
			selectItemPlayer(item, index) {
				this.selectItemPlayers({
					list: this.songList,
					index
				})
			},
			...mapActions([
				'selectItemPlayers'
			])
		},
		watch: {
			songList(item){
				this._animations()
			},
			logo(item) {
				this._loadlogo()
			}
		}
	}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/base'
.songBkglist
  position:absolute
  top:0
  bottom:0
  left:0
  right:0
  background:#000
  .songlist
   position:absolute
   top:0
   bottom:0
   left:0
   right:0
   z-index:100
   color:#fff
   .header
    width:100%
    padding-top:@width
    background-repeat:no-repeat
    background-size:100%
    .shandow
     padding-top:100%
     width:100%
     position:absolute
     top:0px
     &:after
      content:''
      width:100%
      height:60%
      background:linear-gradient( top,rgba(255,255,255,0),rgba(0,0,0,1))
      top:40%
      position:absolute
    .focusContent
     position:relative
     bottom:80px
     display:flex
     width:100%
     height:60px
     overflow:hidden
     .header-title
      flex:5
      line-height:30px
      width:50%
      .title
       width:100%
       font-size:$fb
       padding:0
       overflow: hidden
       position:relative
       span
       	position:relative
        display:inline-block
        font-size:$fb
        text-overflow: ellipsis
        padding:0
        white-space: nowrap
        left:0
      p
       font-size:$fm 
     span
      padding-top:10px
      margin-left:10px
      flex:1
      font-size:46px
      opacity:0.8
   .songlist
    width:100%
    margin:-60px auto 0
    position:relative
    padding:0 5%
    box-sizing:border-box
    li
     width:100%
     height:60px
     border-bottom:1px solid  $hr;
     padding:8px 0;
     box-sizing:border-box;
     .index
       display:inline-block
       height:44px
       font-size:$fg
       line-height:44px
       width:10%
       text-align:center
      .wrapText
       display:inline-block
       margin-left:2%
       width:86%
	     h1
	      wraps()
	      line-height:22px
	      font-size:$fg;
	     p
	      wraps()
	      opacity:0.6
	      line-height:22px
	      font-size:$fm 
</style>