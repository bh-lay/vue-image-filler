<template>
<div class="vue-image-filler-slider-bar" ref="outer">
	<div :style="{width: (progressLocal * 100) + '%'}"><i
		:class="[isDragging ? 'dragging' : '']"
		@mousedown="dragHandle"
		@touchstart="dragHandle"
	></i></div>
</div>
</template>

<script>
import dragHandle from './drag-handle.js'

export default {
	name: 'image-filler-slider',
	props: {
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		value: {
			type: Number,
			default: 0
		},
	},
	data: function () {
		return {
			isDragging: false
		}
	},
	computed: {
		progressLocal() {
			return (this.value - this.min) / (this.max - this.min)
		}
	},
	methods: {
		dragHandle(event) {
			const percentStart = this.progressLocal
			const sliderWidth = this.$refs.outer.clientWidth
			this.isDragging = true
			dragHandle(event, {
				move: ({ xOffset }) => {
					let newPercent = percentStart + (xOffset / sliderWidth)
					newPercent = Math.max(Math.min(newPercent, 1), 0)
					let newValue = this.min + newPercent * (this.max - this.min)
					this.$emit('input', newValue)
				},
				end: () => {
					this.isDragging = false
				}
			})
		},
	}
};
</script>

<style scoped lang="less">
.vue-image-filler-slider-bar{
  position: relative;
  height: 40px;
  margin: 60px 80px 40px;
  &:before,
  div,
  i {
    position: absolute;
    top: 50%;
    display: block;
  }
  &:before {
    content: '';
    width: 100%;
    height: 6px;
    margin-top: -3px;
    border-radius: 3px;
    background: #e4e7ed;
  }
  div {
    left: 0;
    height: 6px;
    margin-top: -3px;
    border-radius: 3px;
    background: #409eff;
  }
  i {
    @width: 18px;
    @borderWidth: 2px;
    @realWidth: 40px;
    width: @realWidth;
    height: @realWidth;
    margin-top: -@realWidth / 2;
    right: -@realWidth / 2;
    transition: .15s ease-in-out;
    cursor: grab;
    &:before {
      content: '';
      display: block;
      position: relative;
      width: @width - @borderWidth * 2;
      height: @width - @borderWidth * 2;
      top: (@realWidth - @width) / 2;
      left: (@realWidth - @width) / 2;
      border-radius: 100%;
      border: @borderWidth solid #409eff;
      background: #fff;
    }
    &:hover{
      transform: scale(1.2);
    }
    &.dragging{
      transform: scale(1.2);
      &:before {
        border-color: #2787e7;
        background: #edf2f7;
      }
    }
    &:active{
      cursor: grabbing;
    }
  }
}
</style>
