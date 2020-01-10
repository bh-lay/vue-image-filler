import dragHandle from './drag-handle.js'
import Slider from './Slider.js'
import template from './template.html'
import './style.less'

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

var ImageFiller = {
	name: 'image-filler',
	components: {
		Slider: Slider
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
	template: template,
	mounted: function () {
	},
	watch: {
		'size.scale'(newValue) {
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
						x: -usedX / usedWidth + 0,
						y: -usedY / usedHeight + 0,
						width: this.cropWidth / usedWidth,
						height: this.cropHeight / usedHeight
					}
				})
			}, 'image/jpeg', 0.95)
		}
	},
	beforeDestroy: function () {
	}
}

export default ImageFiller
