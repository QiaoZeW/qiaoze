<template>  
    <div class="sudoku_row"  >
        <div class="sudoku_item " 
		:class="curSelect==sudoku.id?'opacity':''" 
		v-for="(sudoku,index) in sudokus" 
		:key="index" 
		@touchstart="sudoku.clicked === true && touchstart(index)" 
		@touchend="touchend">
			<div class="sudoku_item_up">
				<img :src="sudoku.img_src"  >
			</div>
			<div class="sudoku_item_down">
				<!-- <span class="icon-font"> -->
					{{sudoku.name}}
				<!-- </span> -->
			</div>
        </div>
    </div> 
</template>  
<script>  
export default {  
	name: 'sudoku',  
	data() {  
		return {  
			curSelect:null
		};  
	},
	components:{
		
	},
	methods:{
        touchstart:function(e){
            var that = this;
            var list = that.sudokus;
            for (var i = 0, len = list.length; i < len; ++i) {
                if (list[i].id == e) {
                    that.curSelect = i;
                }
            }
			this.$emit('jumpToNewPage', that.curSelect);
			
        },touchend:function(){
            var that = this;
            that.curSelect = null;
        }
    },
	props:{
		sudokus: Array
	}
};  
</script>  
<style >  
	.sudoku_item_up{
		height: 70%;
		width: 80%;
		position: relative;
	}
	.sudoku_item_down{
		height: 30%;
		width: 80%;
		position: relative;
		font-size: 0.45rem;
        text-align: center;
	}
    .sudoku_row{
        display: flex;
        align-items: center;
        width:95%;
        flex-wrap: wrap;
		margin-top: 0.5rem;
		margin-top: 0.8rem;
		margin-left: 2.5%;
		margin-right: 2.5%;
    }
    .sudoku_item{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width:25%;
        padding-top: 10px;
        padding-bottom: 10px;
		height: 4rem;
		margin-top: 0.5rem;
    }
    .opacity{
        opacity: 0.4;
        background: #e5e5e5;
    }
    .sudoku_item img{
		margin-bottom: 0.08rem;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 50%;
    }
	.icon-font{
		width: 1.8rem;
		height: 0.9rem;
		text-align: center;
		line-height: 0.5rem;
		padding-top: 0.1rem;
		font-size: 0.5rem;
		vertical-align: text-top;
	}
</style>
