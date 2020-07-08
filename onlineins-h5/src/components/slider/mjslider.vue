<template>
	<div class="mjout">
		<input type="range" min="0" :max="maxV" step="1" v-model="myCurrentVal" />
		<div class="ranged" :style="{ width:rangedWith+'%'}"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                myCurrentVal: 0
			}
		},
        methods:{
        },
		computed: {
			rangedWith: function() {
				return (91.3/this.maxV*this.myCurrentVal)
			},
            lyw:  {
                get(){
                    return this.currentVal
                },
            }
 		},
		watch: {
            lyw: function() {
                this.myCurrentVal = this.lyw
            },
			myCurrentVal: function() {
                this.$emit("returnCurrentVal", 
                {
                    currentV: this.myCurrentVal,
                    sliderIndex: this.sliderIndex,
                })
			}
		},
		props: {
			maxV: Number,
            sliderIndex: Number,
            sliderRiskCode: String,
            currentVal: Number
		},
	}
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
	.mjout {
		width: 100%;
		margin-top: 43px;
        margin-bottom: 49px;
		position: relative;
	}
	input[type="range"] {
		display: block;
		-webkit-appearance: none;
		background-color: #bdc3c7;
		width: 100%;
		height: 8px;
		border-radius: 10px;
		margin: 0 auto;
		outline: 0;
	}
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: #d7000f;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 4px solid rgb(250,198,195);
		cursor: pointer;
		transition: 0.3s ease-in-out;
		z-index: 1000;
	}
	.ranged {
		background: #d7000f;
		height: 8px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
