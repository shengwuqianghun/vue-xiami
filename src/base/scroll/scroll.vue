<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BSscroll from 'better-scroll'
	export default{
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			pullup:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initScroll()
			},20)
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return		
				}	
				this.scroll=new BSscroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
				if (this.pullup) {
	        this.scroll.on('scrollEnd', () => {
	          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
	            this.$emit('scrollToEnd')
	          }
	        })
        }
			},
			disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }  
		},
		watch:{
			data(val){
				setTimeout(()=>{
					this.refresh()
				},20)
			}
		}
	}
</script>

