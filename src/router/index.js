import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend=(resolve)=>{
	import('components/recommend/recommend').then((module)=>{
		resolve(module)
	})
}

const Storehouse=(resolve)=>{
	import('components/storehouse/storehouse').then((module)=>{
		resolve(module)
	})
}

const Rank=(resolve)=>{
	import('components/rank/rank').then((module)=>{
		resolve(module)
	})
}

const HotsongsList=(resolve)=>{
	import('components/hotsongs-list/hotsongs-list').then((module)=>{
		resolve(module)
	})
}

const RankList=(resolve)=>{
	import('components/rank-list/rank-list').then((module)=>{
		resolve(module)
	})
}

const SingerMuic=(resolve)=>{
	import('components/singer-music/singer-music').then((module)=>{
		resolve(module)
	})
}

export default new Router({
	routes: [{
			path: '/rank',
			component: Rank,
			children: [{
				path: ':id',
				component: RankList
			}]
		},
		{
			path: '/recommend',
			component: Recommend,
			children: [{
				path: ':id',
				component: HotsongsList
			}]
		},
		{
			path: '/storehouse',
			component: Storehouse,
			children: [{
				path: ':id',
				component: SingerMuic
			}]
		},
		{
			path: '/',
			redirect: '/recommend'
		}
	]
})