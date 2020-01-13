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

<style scoped lang="css">
.vue-cropper {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  direction: ltr;
  touch-action: none;
  text-align: left;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}

.cropper-box,
.cropper-box-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-face {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
}

.cropper-box-canvas img {
  position: relative;
  text-align: left;
  user-select: none;
  transform: none;
  max-width: none;
  max-height: none;
}

.cropper-box {
  overflow: hidden;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-modal {
  background: rgba(0, 0, 0, 0.5);
}

.cropper-crop-box {
  /*border: 2px solid #39f;*/
}

.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
  user-select: none;
}

.cropper-view-box img {
  user-select: none;
  text-align: left;
  max-width: none;
  max-height: none;
}

.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.1;
}

.crop-info {
  position: absolute;
  left: 0px;
  min-width: 65px;
  text-align: center;
  color: white;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
}

.crop-line {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.line-w {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.line-a {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.line-d {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.crop-point {
  position: absolute;
  width: 8px;
  height: 8px;
  opacity: 0.75;
  background-color: #39f;
  border-radius: 100%;
}

.point1 {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.point2 {
  top: -5px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.point3 {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.point4 {
  top: 50%;
  left: -4px;
  margin-top: -3px;
  cursor: w-resize;
}

.point5 {
  top: 50%;
  right: -4px;
  margin-top: -3px;
  cursor: e-resize;
}

.point6 {
  bottom: -5px;
  left: -4px;
  cursor: sw-resize;
}

.point7 {
  bottom: -5px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.point8 {
  bottom: -5px;
  right: -4px;
  cursor: se-resize;
}

@media screen and (max-width: 500px) {
  .crop-point {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity: 0.45;
    background-color: #39f;
    border-radius: 100%;
  }

  .point1 {
    top: -10px;
    left: -10px;
  }

  .point2,
  .point4,
  .point5,
  .point7 {
    display: none;
  }

  .point3 {
    top: -10px;
    right: -10px;
  }

  .point4 {
    top: 0;
    left: 0;
  }

  .point6 {
    bottom: -10px;
    left: -10px;
  }

  .point8 {
    bottom: -10px;
    right: -10px;
  }
}
</style>
