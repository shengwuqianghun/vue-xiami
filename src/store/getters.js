export const singer=function(state){
	return state.singer
}

export const ranklist=(state)=>{
	return state.ranklist
}

export const hotlists=(state)=>{
	return state.hotlists
}

export const rgbList=(state)=>{
	return state.rgbList
}

export const falseList=state=>state.falseList
export const playingState=state=>state.playingState
export const currentList=state=>state.currentList
export const currentIndex=state=>state.currentIndex
export const currentSong=(state)=>{
	return state.currentList[state.currentIndex]
}
export const mode=state=>state.modes
export const singerMusics=state=>state.singerMusics
export const searchHistory=state=>state.searchHistory