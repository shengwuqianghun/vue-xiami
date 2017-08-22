import {loadSearch} from 'common/js/cache'
const state={
	singer:{},
	ranklist:{},
	hotlists:[],
	rgbList:[],
	playingState:false,
	currentList:[],
	currentIndex:-1,
	falseList:[],
	modes:-1,
	singerMusics:{},
	searchHistory: loadSearch(),
}



export default state 
