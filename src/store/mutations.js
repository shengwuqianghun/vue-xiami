import * as types from './mutations-type'


const mutations={
	[types.singers](state,item){
		state.singer=item
	},
	[types.ranklist](state,item){
		state.ranklist=item
	},
	[types.passHots](state,item){
		state.hotlists=item
	},
	[types.rgbList](state,item){
		state.rgbList=item
	},
	[types.playingState](state,item){
		state.playingState=item
	},
	[types.currentList](state,item){
		state.currentList=item
	},
	[types.currentIndex](state,item){
		state.currentIndex=item
	},
	[types.falseList](state,item){
		state.falseList=item
	},
	[types.modes](state,item){
		state.modes=item
	},
	[types.singerMusics](state,item){
		state.singerMusics=item
	},
	[types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
}



export default mutations