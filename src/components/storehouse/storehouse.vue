<template>
	<div>
		<div class="box">
			<div class="search-box">
				<div class="inputText" ref='inputText'>
					<span class="icon-search">
				</span>
					<input type="text" placeholder="搜索歌曲、歌单、专辑" @click="shows" v-model="inpText" @keyup.13="searchKey" />
					<span class="close-input" v-show="inpText" @click="makeupText">&chi;</span>
				</div>
				<div class="remove" v-show='checkToggle||inpText' @click="closes">取消</div>
			</div>
			<div class="search-key" v-show='!checkToggle&&!checkText'>
				<h1>热门搜索</h1>
				<ul class="title-wrap">
					<li v-for='item in hotKey' @click="searchHot(item)">{{item.k}}</li>
				</ul>
			</div>
			<div class="cooks" v-show='checkToggle'>
				<ul class="cooks-list">
					<li class="cooks-item" v-for="(item,index) in searchHistory" >
						<span class="icon-clock"></span>
						<span class="right" @click.stop="delectOne(index)">&Chi;</span>
						<span class="cooks-text" @click="newSearchs(item)">{{item}}</span>
					</li>
				</ul>
				<div class="footer" @click="delectAll">清除搜索记录</div>
			</div>
			<scroll class="numList" v-show="checkText" :data='result' :pullup='pullup' @scrollToEnd='searchMore' ref='suggest'>
				<!--../../common/image/load.jpg-->
				<ul>
					<li class="num-item" v-for="(item,index) in result" @click="selectItem(item,2)">
						<span class="icon-music" ref='iconMusic' v-show="!item.type"></span>
						<img ref='images' v-if="item.type" :src="picUrl" @error="errorImage"></img>
						<div class="num-wrap">
							<h1 v-html="cheakShow(item)"></h1>
							<p v-html='checkShowText(item)'></p>
						</div>
					</li>
					<loading v-show="hasMore&&!checkNot" title="" style='padding-top: 10px'></loading>
				</ul>
				<div v-show="checkNot" class="errorShow">无搜索结果</div>
			</scroll>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import Loading from 'base/loading/loading'
	import {getHotKey,search,getSingerDetail} from 'common/js/recommend'
	import {mapActions,mapMutations,mapGetters} from 'vuex'
	import Scroll from 'base/scroll/scroll'
	export default{
		data(){
			return {
				checkToggle:false,
				inpText:'',
				hotKey:[],
				result:[],
				checkText:false,
				picUrl:'',
				singerMusic:[],
				pullup:true,
				hasMore:true,
				checkNot:false
			}
		},
		created(){
			this._getHotKey()
		},
		computed:{
			...mapGetters([
				'searchHistory'
			])
		},
		methods:{
			closes(){
				this.checkToggle=false
				this.$refs.inputText.style.width='94%'
				this.inpText=''
				this.checkText=false
			},
			shows(){
				this.checkToggle=true
				this.$refs.inputText.style.width='85%'
			},
			_getHotKey(){
				getHotKey().then((res)=>{
					this.hotKey=res.data.hotkey.slice(0,10)
				})
			},
			searchs(){
				this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
//				this.result=[]
				this.checkText=true
				if(this.inpText!==''){
					this.checkToggle=false
				}
				search(this.inpText,1,20).then((res)=>{
					if(res.code===0){
            this.result = this.result.concat(this._genResult(res.data))
            if(this.result.length===0){
            	this.checkNot=true
            }else{
            	this.checkNot=false
            }
            if(this.result.length<=20){
            	this.hasMore=false
            }
					}
				})
				this.saveSearchHistory(this.inpText)
			},
			searchKey(){
				this.result=[]
				this.searchs()
			},
			searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.inpText, this.page,20).then((res) => {
          if (res.code === 0) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
          this.hasMore = false
        }
      },
			searchHot(item){
				this.inpText=item.k
				this.shows()
				this.result=[]
				this.searchs()
			},
			_genResult(data){
				let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: 'singer'}})
        }
        if (data.song) {
          ret = ret.concat(data.song.list)
        }
        return ret
			},
			makeupText(){
				this.inpText='',
				this.checkToggle=true
				this.checkText=false
				this.result=[]
			},
			cheakShow(item){
				if(item.type==='singer'){
					return item.singername
				}else{
					return item.songname
				}
			},
			checkShowText(item,index){
				if(item.type==='singer'){
					this.picUrl=`https://y.gtimg.cn/music/photo_new/T001R68x68M000${item.singermid}.jpg?max_age=2592000`
					return `单曲&nbsp;:&nbsp;${item.songnum}&nbsp;&nbsp;&nbsp;专辑&nbsp;:&nbsp;${item.albumnum}`
				}else{
					return item.singer[0].name
				}
			},
			errorImage(e){
					e.target.style.visibility='hidden'
			},
			selectItem(item){
				if(item.type!=='singer'){
					this.selectItemPlayers({
						list:[item],
						index:0
					})
				}else{
					getSingerDetail(item.singermid).then((res)=>{
						if(res.code===0){
							this.singerMusic=res.data
							this.$router.push({
								path:`/storehouse/${item.singerid}`
							})
							this.singerMusics(this.singerMusic)
						}
					})
				}
			},
			delectOne(index){
					this.deleteSearchHistory(this.searchHistory[index])
			},
			delectAll(){
				this.clearSearchHistory()
			},
			newSearchs(item){
				this.inpText=item
				this.searchs()
			},
			...mapActions([
				'selectItemPlayers',
				'saveSearchHistory',
				'deleteSearchHistory',
				'clearSearchHistory'
			]),
			...mapMutations({
				singerMusics:'SingerMusics'
			})
		},
		components:{
			Scroll,
			Loading
		}
	}
</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
 @import '~common/stylus/base'
 .box
  width:100%
  position:absolute
  top:80px
  bottom:0
  .numList
   position:absolute
   top:56px
   width:100%
   bottom:0
   overflow:hidden
   /*z-index:2*/
   .errorShow
    position:absolute
    top:20px
    width:100%
    text-align:center
   ul
    width:100%
    min-height:100%
    background:#fff
   .num-item
    height:56px
    border:1px solid $bkg
    line-height:56px
    color:$bkg
    padding:0 10px
    width:100%
    .icon-music,img
     width:40px
     height:40px
     font-size:26px
     float:left
     display:block
     margin-right:8px
    .icon-music
     margin-top:14px 
    img
     margin-top:8px
     border-radius:20px
     border:none
    .num-wrap
     float:left
     height:58px
     width:300px
     position:relative
     h1,p
      wraps()
      position:relative
      width:100%
      top:0
      height:26px
      line-height:28px
     h1
      padding-top:6px
      font-size:18px
      color:#000
     p
      font-size:14px
      color:#808080  
	.search-box
	 width:100%
	 height:56px
	 background:$bkg
	 position:relative
	 .inputText
	  top:10px
	  width:94%
	  margin-left:10px
	  background:#fff
	  position:relative
	  box-sizing:border-box
	  padding-top:10px
	  height:36px
	  .icon-search
	   display:inline-block
	   width:2%
	   padding:0 10px
	  input
	   width:88%
	   display:inline-block
	   height:20px
	   border:none
	   outline:none
   .close-input
     width:20px
     height:20px
     position:absolute
     right:10px
     color:#fff
     background:$fonts
     text-align:center
     border-radius:10px
	 .remove
	  position:absolute
	  width:auto
	  right:0
	  top:0
	  padding:0 6px
	  height:60px
	  line-height:60px
	.search-key  
	 height:180px
	 padding:15px 15px 10px 15px 
	 h1
	  padding-bottom:8px
	 .title-wrap
	  width:100%
	  li
	   display:inline-block
	   color:#000
	   height:20px
	   border:1px solid #000
	   border-radius:15px
	   font-size:14px
	   padding:4px 8px
	   line-height:20px
	   margin:0 8px 10px 0 
 .cooks  
  position:relative
  left:0
  right:0
  top:0
  .cooks-list
   width:100%
   .cooks-item
    height:44px
    border:1px solid $bkg
    line-height:44px
    color:$bkg
    padding:0 10px
    .icon-clock
     font-size:20px
    .cooks-text
     color:#000
     padding:0 10px 
     width:85%
     float:right
     wraps() 
    .right
     float:right
  .footer
   padding-top:10px
   text-align:center
   color:$theme
   font-size:12px
   
	   
</style>