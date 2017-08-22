<template>
	<div class="player" v-show='falseList.length>0' @touchmove.prevent=''>
		<div class="backgrounds">
			<img height="100%" :src="picUrl">
		</div>
		<div class="wraps">
			<div class="header">
				<img :src='picUrl' />
				<div class="header-title">
					<h1 v-html="songTitle"></h1>
					<p v-html="songSinger"></p>
				</div>
				<span :class="{'icon-pause':playingState===true,'icon-style':true,'icon-play2':playingState===false}" @click='toggleplaying'></span>
			</div>
			<div class="palyerlang">
				<scroll class="player-body" ref='lyricList' v-if='currentLyric' :data='currentArray'>
					<div class="player-wrap" v-if="currentLyric">
						<p class="ps" v-for='(item,index) in currentArray' :class="{'current-lyric':currentLine===index}" ref='lyricLine'>
							{{item.txt}}
						</p>
					</div>
				</scroll>
			</div>
			<div class="footer">
				<div class="icon">
					<span class="icon-menu" v-show="currentList.length>1" @click="toggles"></span>
					<span class="icon-heart" ref='heart' @click="toggleHeart"></span>
				</div>
				<div class="playing">
					<span class="lefts">{{formate(currentTime)}}</span>
					<span class="rights">{{formate(langTime)}}</span>
					<div class="bar">
						<div class="lang" ref='lang' @click='changeMove'>
							<div class="current-persent" ref='currentPe'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="backs">
			<span class="icon-circle-left" @click="backPlayer"></span>
		</div>
		<audio ref='audios' :src="songUrl" @timeupdate='updataTime' @ended="endPlay"></audio>
		<transition name='togglePlayings'>
			<mini-list v-show='togglePlay' @togglePlaying='toggles' :picUrls='picUrl' :toggleMiniPlay='togglePlay'></mini-list>
		</transition>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import { mapMutations } from 'vuex'
	import { getLcy } from 'common/js/recommend'
	import { Base64 } from 'js-base64'
	import Lyric from 'lyric-parser'
	import Scroll from 'base/scroll/scroll'
	import MiniList from 'components/mini-list/mini-list'
	export default {
		components: {
			Scroll,
			MiniList
		},
		data() {
			return {
				currentTime: 0,
				persent: 0,
				lyric: '',
				currentLyric: null,
				currentLine: 0,
				currentArray: [],
				togglePlay: false,
				checkHeart:false
			}
		},
		computed: {
			...mapGetters([
				'playingState',
				'currentList',
				'currentIndex',
				'currentSong',
				'falseList',
			]),
			songTitle() {
				return this.currentSong ? this.currentSong.songname : ''
			},
			songSinger() {
				return this.currentSong ? this.currentSong.singer[0].name : ''
			},
			picUrl() {
				return this.currentSong ? this._picUrls() : ''
			},
			songUrl() {
				return this.currentSong ? this._songUrl() : ''
			},
			langTime() {
				return this.currentSong ? this.currentSong.interval : ''
			},
			songid() {
				return this.currentSong ? this.currentSong.songmid : ""
			},
			num() {
				return Number(this.currentIndex) + 1
			}
		},
		methods: {
			toggles() {
				this.togglePlay = !this.togglePlay
			},
			_picUrls() {
				let keys = ''
				keys = this.currentSong.albummid
				return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${keys}.jpg?max_age=2592000`
			},
			_songUrl() {
				let keys = ''
				keys = this.currentSong.songid
				return `http://ws.stream.qqmusic.qq.com/${keys}.m4a?fromtag=46`
			},
			toggleplaying() {
				let currentPlay = !this.playingState
				this.currentPlays(currentPlay)
				if(this.currentLyric) {
					this.currentLyric.togglePlay()
				}
			},
			toggleHeart(){
				this.checkHeart=!this.checkHeart
				if(this.checkHeart){
					this.$refs.heart.style.color='rgba(255,97,21,.4)'
				}else{
					this.$refs.heart.style.color='rgba(255,255,255,.4)'
				}
			},
			backPlayer() {
				this.backPlayers({
					list: []
				})
			},
			updataTime(e) {
				this.currentTime = e.target.currentTime
			},
			formate(times) {
				times = times | 0
				const minutes = times / 60 | 0
				const second = times % 60 | 0
				return `${minutes}:${this.nums(second)}`
			},
			nums(num, n = 2) {
				let len = num.toString().length
				while(len < n) {
					num = "0" + num
					len++
				}
				return num
			},
			changeMove(e) {
				const lefts = this.$refs.lang.getBoundingClientRect().left
				this.$refs.currentPe.style.width = (e.pageX - lefts) + 'px'
				this.currentPlays(true)
				this.persent = this.$refs.currentPe.offsetWidth / this.$refs.lang.offsetWidth
				this.$refs.audios.currentTime = this.langTime * this.persent
				var currentTimes = this.$refs.audios.currentTime
				if(this.currentLyric) {
					this.currentLyric.seek(currentTimes * 1000)
				}
			},
			endPlay() {
				if(this.currentList.length === 1) {
					this.$refs.audios.play()
					if(this.currentLyric) {
						this.currentLyric.play()
					}
					return
				}
				if(this.num === this.currentList.length) {
					this.selectItemPlayers({
						list: this.currentList,
						index: 0,
					})
				} else {
					this.selectItemPlayers({
						list: this.currentList,
						index: this.num
					})
				}
			},
			getLcys(func, arguement) {
				return new Promise((resolve, reject) => {
					func(arguement).then((res) => {
						if(res.retcode === 0) {
							this.lyric = Base64.decode(res.lyric)
							resolve(this.lyric)
						} else {
							reject('no lyric')
						}
					})
				})
			},
			getLicy(func, arguement) {
				this.getLcys(func, arguement).then((lyric) => {
					this.currentLyric = new Lyric(lyric, this.handleLyric)
					if(this.playingState) {
						this.currentLyric.play()
					}
				}).catch(() => {
					this.currentLyric = null
					this.currentLine = 0
				})
			},
			handleLyric({
				lineNum,
				text
			}) {
				this.currentLine = lineNum
				if(lineNum > 4) {
					let lineEl = this.$refs.lyricLine[lineNum - 4]
					this.$refs.lyricList.scrollToElement(lineEl, 1000)
				} else {
					this.$refs.lyricList.scrollTo(0, 0, 1000)
				}
			},
			...mapActions([
				'backPlayers',
				'selectItemPlayers'
			]),
			...mapMutations({
				currentPlays: 'PlayingState',
			})
		},
		watch: {
			currentSong(item) {
				if(this.currentLyric) {
					this.currentLyric.stop()
				}
				this.$nextTick(() => {
					this.$refs.audios.play()
					this.getLicy(getLcy, this.currentSong.songmid)
				})
			},
			playingState(newPlaying) {
				const audio = this.$refs.audios
				this.$nextTick(() => {
					newPlaying ? audio.play() : audio.pause()
				})
			},
			currentTime(item) {
				this.persent = item / this.langTime
				this.$refs.currentPe.style.width = this.$refs.lang.offsetWidth * this.persent + 'px'
			},
			currentLyric(item) {
				this.currentArray = item.lines
			},
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
@import "~common/stylus/base"
 .player
  position:fixed
  top:0
  left:0
  right:0
  bottom:0
  background:black
  z-index:100
  .backgrounds
   z-index:-1
   position:absolute
   filter:blur(20px)
   width:100%
   height:100%
  .backs
   position:absolute
   bottom:0
   background:$rgba
   height:60px
   width:100%
   color:$rgb44
   line-height:8%
   span
    position:absolute
    top:10px
    left:20px
    font-size:40px
  .wraps
    height:100%
    width:100%
    background:$fonts 
	  .header
	   width:100%
	   height:16%
	   padding:4% 4%
	   box-sizing:$boxs
	   color:#fff
	   background:$fonts 
	   img
	    float:left
	    height:100%
	   .header-title
	    margin-left:4%
	    float:left
	    height:100%
	    width:60%
	    display:flex
	    flex-direction:column
	    h1
	     wraps()
	     padding-top:4%
	     flex:1
	     font-size:$fg
	    p 
	     flex:1
	     font-size:$fm
	   .icon-style
	    opacity:0.6
	    float:right
	    font-size:40px
	    height:100%
	    padding-top:4%  
	  .palyerlang
	   height:60%
	   width:90%
	   margin:0 auto
	   box-sizing:$boxs
	   padding:12% 0
	   .player-body
	    width:100%
	    height:100%
	    text-align:center
	    overflow:hidden
	    .player-wrap
	     width:100%
	     .ps
	      padding:5px 0
	      width:100%
	      color:$rgb44
	     .current-lyric
	      color:$theme
	  .footer
	   width:100%
	   height:auto  
	   .icon
	    overflow:hidden
	    width:86%
	    margin:0 auto
	    color:$rgb44
	    font-size:28px
	    .icon-menu
	     float:left
	    .icon-heart
	     float:right
	  .playing
	   width:100%
	   position:relative
	   overflow:hidden
	   height:40px
	   color:$rgb44
	   font-size:$fm
	   .lefts
	    height:40px
	    line-height:40px
	    float:left
	    padding-left:4%
	   .rights
	    height:40px
	    line-height:40px
	    float:right
	    padding-right:4%
	   .bar
	    height:100%
	    width:70%
	    margin:0 auto
	    position:relative
	    .lang
	     position:absolute
	     top:50%
	     width:100%
	     height:2px
	     background:@color
	    .current-persent
	     height:2px
	     background:$theme
	     position:absolute
 .togglePlayings-enter-active,.togglePlayings-leave-active
  transition:all .5s
 .togglePlayings-enter,.togglePlayings-leave-to
  transform:translate3d(0,100%,0) 
</style>