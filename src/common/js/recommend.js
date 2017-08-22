import jsonp from './jsonp'
import axios from 'axios'
const config = {
	g_tk: 5381,
	uin: 0,
	format: 'jsonp',
	inCharset: 'utf-8',
	outCharset: 'utf-8',
	notice: 0
}

export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, config, {
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function getHotList(callback) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
	const data = Object.assign({}, config, {
		tpl: 'v12',
		page: 'other',
		callback: callback,
		rnd: 5844347743627245,
		loginUin: 0,
		hostUin: 0,
		inCharset: 'utf8',
		outCharset: 'GB2312',
		platform: 'yqq',
		needNewCode: 0
	})
	return jsonp(url, data, {
		param: 'jsonpCallback',
		prefix: callback
	})
}

export function getRank() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
	const data = Object.assign({}, config, {
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function getSongList(songId) {
	const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
	const data = Object.assign({}, config, {
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		disstid: songId,
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0
	})
	return jsonp(url, data, {
		param: 'jsonpCallback',
		prefix: 'playlistinfoCallback'
	})
}

export function getRankList(songId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
	const data = Object.assign({}, config, {
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		tpl: 3,
		page: 'detail',
		type: 'top',
		topid: songId
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function getLcy(mid) {
	const url = '/api/lyric'
	const data = Object.assign({}, config, {
		songmid: mid,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		categoryId: 10000000,
		pcachetime: +new Date(),
		format: 'json',
		g_tk: 1928093487,
	})
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getHotKey() {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
	const data = Object.assign({}, config, {
		needNewCode: 1,
		platform: 'h5',
		g_tk: 1928093487,
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function search(query, page, perpage) {
	const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
	const data = Object.assign({}, config, {
		w: query,
		p: page,
		perpage,
		n: perpage,
		catZhida: 1,
		zhidaqu: 1,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		remoteplace: 'txt.mqq.all',
		needNewCode: 1,
		platform: 'h5',
		g_tk: 1928093487,
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}

export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	const data = Object.assign({}, config, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 80,
		songstatus: 1,
		singermid: singerId,
		g_tk: 1928093487,
	})
	return jsonp(url, data, {
		param: 'jsonpCallback'
	})
}