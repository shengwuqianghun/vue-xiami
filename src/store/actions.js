import * as types from './mutations-type'
import {saveSearch, clearSearch, deleteSearch} from 'common/js/cache'

export const selectItemPlayers=function({commit,state},{list,index}){
	commit(types.currentList,list)	
	commit(types.currentIndex,index)
	commit(types.playingState,true)
	commit(types.falseList,list)
}

export const backPlayers=function({commit,state},{list}){
	commit(types.falseList,list)	
	commit(types.playingState,false)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}