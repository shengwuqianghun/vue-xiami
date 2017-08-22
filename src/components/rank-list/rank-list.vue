<template>
	<transition name='songlists'>
		<song-list :songList=songList :listTitle=listTitle :logo=logo v-show='songList'></song-list>
	</transition>
</template>
<script>
	import SongList from 'base/song-list/song-list'
	import { mapGetters } from 'vuex'
	import { getRankList } from 'common/js/recommend'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				songList: [],
				logo: '',
				listTitle: [],
			}
		},
		created() {
			setTimeout(() => {
				this._getSongList()
			}, 20)
		},
		computed: {
			...mapGetters([
				'ranklist',
				'rgbList'
			])
		},
		methods: {
			_getSongList() {
				if(this.ranklist.id === undefined) {
					this.$router.push({
						path: '/rank'
					})
					return
				}
				getRankList(this.ranklist.id).then((res) => {
					if(res.code === 0) {
						this.listTitle = [res.topinfo.ListName, res.update_time+' 更新']
						this.logo = res.topinfo.pic_album + '?max_age=2592000'
						this.songLists = res.songlist
						this.songList = this._soleList()
					}
				})
			},
			_soleList() {
				const map = []
				this.songLists.forEach((item) => {
					map.push(item.data)
				})
				return map
			},
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