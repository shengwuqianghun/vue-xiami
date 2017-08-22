<template>
	<transition name='songlists'>
		<song-list :songList=songList :listTitle=listTitle :logo=logo v-show='songList'></song-list>
	</transition>
</template>
<script>
	import SongList from 'base/song-list/song-list'
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	import { getSingerDetail } from 'common/js/recommend'
	export default {
		data() {
			return {
				songList: [],
				logo: '',
				listTitle: []
			}
		},
		created() {
			this._getSongList()
		},
		computed: {
			...mapGetters([
				'singerMusics'
			])
		},
		methods: {
			_listTitle() {
				if(this.singerMusics.singer_id) {
					const list = this.singerMusics
					this.listTitle = [list.singer_name, "单曲：" + list.total]
				}
			},
			_getSongList() {
				if(this.singerMusics.singer_id === undefined) {
					this.$router.push({
						path: '/storehouse'
					})
					return
				}
				this.logo = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singerMusics.singer_mid}.jpg?max_age=2592000`
				this._listTitle()
				this._soleList()
			},
			_soleList() {
				this.singerMusics.list.forEach((item) => {
					this.songList.push(item.musicData)
				})
			}
		},
		components: {
			SongList,
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
.songlists-enter-active,.songlists-leave-active
 transition:all 0.5s
.songlists-enter,.songlists-leave-to
 transform:translate3d(100%,0,0)
</style>