<template>
<div class="vue-image-filler" ref="outer">
	<input type="file"
		ref="uploadInput"
		accept="image/png, image/jpg, image/jpeg"
		@change="fileChangeHandle($event)"
		class="vue-image-filler-real-input"
	/>
	<template v-if="!isFileSelected">
		<div class="vue-image-filler-view">
			<button @click="triggerFileSelect" class="vue-image-filler-button">选择图片</button>
			<p>仅支持jpg、png、jpeg格式文件上传！</p>
		</div>
	</template>
	<template v-else>
		<div class="vue-image-filler-canvas"
			:style="{
				height: size.canvasHeight
			}"
			@mousedown="moveImage"
			@touchstart="moveImage"
		>
			<div class="vue-image-filler-canvas-img" ref="canvasImage"
				:style="{
					width: imageWidthInView + 'px',
					height: imageHeightInView + 'px',
					marginTop: size.offsetTop + 'px',
					marginLeft: size.offsetLeft + 'px'
				}"
			></div>
			<div
				class="vue-image-filler-canvas-mask"
				:style="{
					width: size.cropWidthInView + 'px',
					height: size.cropHeightInView + 'px',
				}"
			></div>
		</div>
		<Slider
			:min="size.scaleMin"
			:max="size.scaleMax"
			v-model="size.scale"
	  />
	  <div class="vue-image-filler-footer">
			<button class="vue-image-filler-button" @click="upload">上传</button>
			<button class="vue-image-filler-text-button" @click="triggerFileSelect">重新上传</button>
		</div>
	</template>
</div>
</template>

<script>
import dragHandle from './drag-handle.js'
import Slider from './vue-image-filler-slider.vue'

function getBoxSizePlaceIntoAnotherBox(innerWidth, innerHeight, outerWidth, outerHeight) {
	if (outerWidth / outerHeight > innerWidth / innerHeight) {
		return {
			width: outerHeight * innerWidth / innerHeight,
			height: outerHeight
		}
	} else {
		return {
			width: outerWidth,
			height: outerWidth * innerHeight / innerWidth
		}
	}
}

export default {
	name: 'image-filler',
	components: {
		Slider
	},
	props: {
		width: {
			type: Number,
			default: ''
		},
		height: {
			type: Number,
			default: ''
		}
	},
	data: function () {
		return {
			isFileSelected: false,
			_imageNode: null,
			size: {
				// 缩放配置
				scaleMin: 0.1,
				scaleMax: 2,
				scale: 5,
				// 画布尺寸
				canvasWidth: 0,
				canvasHeight: 300,
				// 剪裁区域视觉尺寸
				cropWidthInView: 0,
				cropHeightInView: 0,
				// 图片原始尺寸
				imageWidth: 0,
				imageHeight: 0,
				// 偏移尺寸
				offsetTop: 0,
				offsetLeft: 0
			}
		}
	},
	computed: {
		cropWidth() {
			return this.width
		},
		cropHeight() {
			return this.height
		},
		imageWidthInView() {
			return this.size.imageWidth * this.size.scale
		},
		imageHeightInView() {
			return this.size.imageHeight * this.size.scale
		}
	},
	watch: {
		'size.scale'() {
			const offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2
			const offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2
			if (this.size.offsetLeft > offsetLeftRange) {
				this.size.offsetLeft = offsetLeftRange
			} else if (this.size.offsetLeft < -offsetLeftRange) {
				this.size.offsetLeft = -offsetLeftRange
			}

			if (this.size.offsetTop > offsetTopRange) {
				this.size.offsetTop = offsetTopRange
			} else if (this.size.offsetTop < -offsetTopRange) {
				this.size.offsetTop = -offsetTopRange
			}
		}
	},
	methods: {
		triggerFileSelect() {
			this.$refs.uploadInput.dispatchEvent(new MouseEvent('click'))
		},
		fileChangeHandle(event) {
			let file = event.target.files[0]
			let fileBlobURL = window.URL.createObjectURL(new Blob([file]))
			let image = new Image()
			image.onload = () => {
				this.size.imageWidth = image.width || image.naturalWidth
				this.size.imageHeight = image.height || image.naturalHeight
				this.size.canvasWidth = this.$refs.outer.clientWidth
				let { width, height } = getBoxSizePlaceIntoAnotherBox(this.cropWidth, this.cropHeight, this.size.canvasWidth, this.size.canvasHeight)
				this.size.cropWidthInView = width * .8
				this.size.cropHeightInView = height * .8

				this.size.scaleMin = Math.max(this.size.cropWidthInView / this.size.imageWidth, this.size.cropHeightInView / this.size.imageHeight)
				// 最大放大系数限定为三倍
				this.size.scaleMax = this.size.scaleMin * 3
				this.size.scale = this.size.scaleMin
				this.size.offsetTop = 0
				this.size.offsetLeft = 0

				this.isFileSelected = true
				this.$nextTick(() => {
					this.$refs.canvasImage.innerHTML = ''
					this.$refs.canvasImage.appendChild(image)
				})
			}
			image.src = fileBlobURL

			this._imageNode = image

			event.target.value = ''
		},
		moveImage(event) {
			const offsetTopStart = this.size.offsetTop
			const offsetLeftStart = this.size.offsetLeft
			const offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2
			const offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2

			dragHandle(event, {
				move: ({ xOffset, yOffset }) => {
					let newOffsetTop = offsetTopStart + yOffset
					let newOffsetLeft = offsetLeftStart + xOffset
					this.size.offsetTop = Math.max(Math.min(newOffsetTop, offsetTopRange), -offsetTopRange)
					this.size.offsetLeft = Math.max(Math.min(newOffsetLeft, offsetLeftRange), -offsetLeftRange)
				}
			})
		},
		upload() {
			this.capture(({ fileBlob, config }) => {
				let file = new File([fileBlob], 'capture.jpeg', { type: 'image/jpeg', lastModified: Date.now() })
				this.$emit('confirm', {
					fileBlob,
					file,
					config
				})
			})
		},
		capture(callback) {
			let canvas = document.createElement('canvas')
			canvas.width = this.cropWidth
			canvas.height = this.cropHeight
			let zoomRate = this.cropWidth / this.size.cropWidthInView
			let usedWidth = this.imageWidthInView * zoomRate
			let usedHeight = this.imageHeightInView * zoomRate
			let usedX = ((this.size.cropWidthInView - this.imageWidthInView) / 2 + this.size.offsetLeft) * zoomRate
			let usedY = ((this.size.cropHeightInView - this.imageHeightInView) / 2 + this.size.offsetTop) * zoomRate

			canvas.getContext('2d').drawImage(this._imageNode, usedX, usedY, usedWidth, usedHeight)
			canvas.toBlob(fileBlob => {
				callback && callback({
					fileBlob,
					config: {
						x: 0 - usedX / usedWidth,
						y: 0 - usedY / usedHeight,
						width: this.cropWidth / usedWidth,
						height: this.cropHeight / usedHeight
					}
				})
			}, 'image/jpeg', 0.95)
		}
	}
};
</script>

<style scoped lang="less">
.vue-image-filler {
	*,
	*:before,
	*:after {
		box-sizing: content-box
	}
	.vue-image-filler-real-input{
		display: none;
	}
	.vue-image-filler-button {
		height: 40px;
		margin: 0;
		padding: 0 30px;
		border: none;
		border-radius: 4px;
		background: #2196f3;
		font-size: 14px;
		color: #fff;
		cursor: pointer;
		transition: .15s;
		&:hover {
			background: #0b7ad5;
		}
		&:active {
			background: #235c8b;
		}
		&:focus {
			outline: none
		}
	}
	.vue-image-filler-text-button {
		margin: 0 0 0 12px;
		padding: 0;
		border: none;
		background: transparent;
		font-size: 14px;
		color: #2196f3;
		cursor: pointer;
		transition: .15s;
		&:hover {
			color: #0b7ad5;
		}
		&:active {
			color: #235c8b;
		}
		&:focus {
			outline: none
		}
	}
	.vue-image-filler-view{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 400px;
		p {
			margin: 30px 0 0;
			font-size: 14px;
			color: #d3d9de
		}
	}
	.vue-image-filler-canvas{
		position: relative;
		height: 300px;
		overflow: hidden;
		background: #ddd;
		cursor: grab;
		&:active{
			cursor: grabbing;
		}
	}
	.vue-image-filler-canvas-img{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		outline: 1000px solid rgba(255, 255, 255, .7);
		pointer-events: none;
		:global(img){
			display: block;
			width: 100%
		}
	}
	.vue-image-filler-canvas-mask {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		outline: 1000px solid rgba(255, 255, 255, .5);
		box-shadow: 0 0 10px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.2);
	}
	.vue-image-filler-footer {
		padding: 20px 0 60px 80px;
		text-align: center;
	}
}
</style>
