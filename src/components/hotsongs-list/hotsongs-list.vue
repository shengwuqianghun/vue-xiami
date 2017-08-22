<template>
	<transition name='songlists'>
		<song-list :songList=songList :listTitle=listTitle :logo=logo v-show='songList'></song-list>
	</transition>
</template>
<script>
	import SongList from 'base/song-list/song-list'
	import { mapGetters } from 'vuex'
	import { getSongList } from 'common/js/recommend'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				songList: [],
				logo: '',
				listTitle: []
			}
		},
		created() {
			setTimeout(() => {
				this._getSongList()
			}, 20)
		},
		computed: {
			...mapGetters([
				'singer',
				'hotlists'
			])
		},
		methods: {
			_listTitle() {
				if(this.singer.dissname) {
					const list = this.singer
					this.listTitle = [list.dissname, "来自：" + list.author]
				}
			},
			_getSongList() {
				if(this.singer.dissid === undefined) {
					this.$router.push({
						path: '/recommend'
					})
					return
				}
				this.logo = this.singer.imgurl
				this._listTitle()
				getSongList(this.singer.dissid).then((res) => {
					if(res.code === 0) {
						this.songList = res.cdlist[0].songlist
					}
				})
			}
		},	
		components: {
			SongList
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
.songlists-enter-active,.songlists-leave-active
 transition:all 0.5s
.songlists-enter,.songlists-leave-to
 transform:translate3d(100%,0,0)
</style>