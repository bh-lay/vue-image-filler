(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ImageFiller = factory());
}(this, (function () { 'use strict';

	function __$styleInject(css) {
	    if (!css) return;

	    if (typeof window == 'undefined') return;
	    var style = document.createElement('style');
	    style.setAttribute('media', 'screen');

	    style.innerHTML = css;
	    document.head.appendChild(style);
	    return css;
	}

	function preventDefault(event) {
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		event.preventDefault && event.preventDefault();
		event.stopPropagation && event.stopPropagation();
	}
	function getParam(clientX, clientY, startX, startY) {
		var xOffset = clientX - startX;
		var yOffset = clientY - startY;

		return {
			clientX: clientX,
			clientY: clientY,
			xOffset: xOffset,
			yOffset: yOffset
		};
	}
	function dragHandle(event, _ref) {
		var move = _ref.move,
		    end = _ref.end;

		var isTouch = event.type === 'touchstart';
		var startX = event.clientX;
		var startY = event.clientY;

		preventDefault(event);
		if (isTouch) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
			event.target.addEventListener('touchmove', touchmove, false);
			event.target.addEventListener('touchend', touchend, false);
			event.target.addEventListener('touchcancel', touchend, false);
		} else {
			document.addEventListener('mousemove', mousemove, false);
			document.addEventListener('mouseup', mouseup, false);
		}
		var lastClientX = void 0;
		var lastClientY = void 0;
		function touchmove(e) {
			preventDefault(e);
			lastClientX = e.touches[0].clientX;
			lastClientY = e.touches[0].clientY;
			move && move(getParam(lastClientX, lastClientY, startX, startY));
		}
		function touchend(e) {
			event.target.removeEventListener('touchmove', touchmove, false);
			event.target.removeEventListener('touchend', touchend, false);
			event.target.removeEventListener('touchcancel', touchend, false);
			end && end(getParam(lastClientX, lastClientY, startX, startY));
		}

		function mousemove(e) {
			preventDefault(e);
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			move && move(getParam(e.clientX, e.clientY, startX, startY));
		}
		function mouseup(e) {
			document.removeEventListener('mousemove', mousemove, false);
			document.removeEventListener('mouseup', mouseup, false);

			end && end(getParam(e.clientX, e.clientY, startX, startY));
		}
	}

	var Slider = {
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
			}
		},
		template: '<div class="vue-image-filler-slider-bar" ref="outer">\n\t\t<div :style="{width: (progressLocal * 100) + \'%\'}"><i\n\t\t\t:class="[isDragging ? \'dragging\' : \'\']"\n\t\t\t@mousedown="dragHandle"\n\t\t\t@touchstart="dragHandle"\n\t\t></i></div>\n\t</div>',
		data: function data() {
			return {
				isDragging: false
			};
		},
		computed: {
			progressLocal: function progressLocal() {
				return (this.value - this.min) / (this.max - this.min);
			}
		},
		mounted: function mounted() {},
		watch: {},
		methods: {
			dragHandle: function dragHandle$1(event) {
				var _this = this;

				var percentStart = this.progressLocal;
				var sliderWidth = this.$refs.outer.clientWidth;
				this.isDragging = true;
				dragHandle(event, {
					move: function move(_ref) {
						var xOffset = _ref.xOffset;

						var newPercent = percentStart + xOffset / sliderWidth;
						newPercent = Math.max(Math.min(newPercent, 1), 0);
						var newValue = _this.min + newPercent * (_this.max - _this.min);
						_this.$emit('input', newValue);
					},
					end: function end() {
						_this.isDragging = false;
					}
				});
			}
		},
		beforeDestroy: function beforeDestroy() {}
	};

	var template = "<div class=\"vue-image-filler\" ref=\"outer\">\r\n\t<input type=\"file\"\r\n\t\tref=\"uploadInput\"\r\n\t\taccept=\"image/png, image/jpg, image/jpeg\"\r\n\t\t@change=\"fileChangeHandle($event)\"\r\n\t\tclass=\"vue-image-filler-real-input\"\r\n\t/>\r\n\t<template v-if=\"!isFileSelected\">\r\n\t\t<div class=\"vue-image-filler-view\">\r\n\t\t\t<button @click=\"triggerFileSelect\" class=\"vue-image-filler-button\">选择图片</button>\r\n\t\t\t<p>仅支持jpg、png、jpeg格式文件上传！</p>\r\n\t\t</div>\r\n\t</template>\r\n\t<template v-else>\r\n\t\t<div class=\"vue-image-filler-canvas\"\r\n\t\t\t:style=\"{\r\n\t\t\t\theight: size.canvasHeight\r\n\t\t\t}\"\r\n\t\t\t@mousedown=\"moveImage\"\r\n\t\t\t@touchstart=\"moveImage\"\r\n\t\t>\r\n\t\t\t<div class=\"vue-image-filler-canvas-img\" ref=\"canvasImage\"\r\n\t\t\t\t:style=\"{\r\n\t\t\t\t\twidth: imageWidthInView + 'px',\r\n\t\t\t\t\theight: imageHeightInView + 'px',\r\n\t\t\t\t\tmarginTop: size.offsetTop + 'px',\r\n\t\t\t\t\tmarginLeft: size.offsetLeft + 'px'\r\n\t\t\t\t}\"\r\n\t\t\t></div>\r\n\t\t\t<div\r\n\t\t\t\tclass=\"vue-image-filler-canvas-mask\"\r\n\t\t\t\t:style=\"{\r\n\t\t\t\t\twidth: size.cropWidthInView + 'px',\r\n\t\t\t\t\theight: size.cropHeightInView + 'px',\r\n\t\t\t\t}\"\r\n\t\t\t></div>\r\n\t\t</div>\r\n\t\t<Slider\r\n\t\t\t:min=\"size.scaleMin\"\r\n\t\t\t:max=\"size.scaleMax\"\r\n\t\t\tv-model=\"size.scale\"\r\n\t  />\r\n\t  <div class=\"vue-image-filler-footer\">\r\n\t\t\t<button class=\"vue-image-filler-button\" @click=\"upload\">上传</button>\r\n\t\t\t<button class=\"vue-image-filler-text-button\" @click=\"triggerFileSelect\">重新上传</button>\r\n\t\t</div>\r\n\t</template>\r\n</div>";

	__$styleInject(".vue-image-filler *,\n.vue-image-filler *:before,\n.vue-image-filler *:after {\n  box-sizing: content-box;\n}\n.vue-image-filler .vue-image-filler-real-input {\n  display: none;\n}\n.vue-image-filler .vue-image-filler-button {\n  height: 40px;\n  margin: 0;\n  padding: 0 30px;\n  border: none;\n  border-radius: 4px;\n  background: #2196f3;\n  font-size: 14px;\n  color: #fff;\n  cursor: pointer;\n  transition: 0.15s;\n}\n.vue-image-filler .vue-image-filler-button:hover {\n  background: #0b7ad5;\n}\n.vue-image-filler .vue-image-filler-button:active {\n  background: #235c8b;\n}\n.vue-image-filler .vue-image-filler-button:focus {\n  outline: none;\n}\n.vue-image-filler .vue-image-filler-text-button {\n  margin: 0 0 0 12px;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  color: #2196f3;\n  cursor: pointer;\n  transition: 0.15s;\n}\n.vue-image-filler .vue-image-filler-text-button:hover {\n  color: #0b7ad5;\n}\n.vue-image-filler .vue-image-filler-text-button:active {\n  color: #235c8b;\n}\n.vue-image-filler .vue-image-filler-text-button:focus {\n  outline: none;\n}\n.vue-image-filler .vue-image-filler-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 400px;\n}\n.vue-image-filler .vue-image-filler-view p {\n  margin: 30px 0 0;\n  font-size: 14px;\n  color: #d3d9de;\n}\n.vue-image-filler .vue-image-filler-canvas {\n  position: relative;\n  height: 300px;\n  overflow: hidden;\n  background: #ddd;\n  cursor: grab;\n}\n.vue-image-filler .vue-image-filler-canvas:active {\n  cursor: grabbing;\n}\n.vue-image-filler .vue-image-filler-canvas-img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.7);\n  pointer-events: none;\n}\n.vue-image-filler .vue-image-filler-canvas-img img {\n  display: block;\n  width: 100%;\n}\n.vue-image-filler .vue-image-filler-canvas-mask {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.5);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.2);\n}\n.vue-image-filler .vue-image-filler-slider-bar {\n  position: relative;\n  height: 40px;\n  margin: 60px 80px 40px;\n}\n.vue-image-filler .vue-image-filler-slider-bar:before,\n.vue-image-filler .vue-image-filler-slider-bar div,\n.vue-image-filler .vue-image-filler-slider-bar i {\n  position: absolute;\n  top: 50%;\n  display: block;\n}\n.vue-image-filler .vue-image-filler-slider-bar:before {\n  content: '';\n  width: 100%;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #e4e7ed;\n}\n.vue-image-filler .vue-image-filler-slider-bar div {\n  left: 0;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #409eff;\n}\n.vue-image-filler .vue-image-filler-slider-bar i {\n  width: 40px;\n  height: 40px;\n  margin-top: -20px;\n  right: -20px;\n  transition: 0.15s ease-in-out;\n  cursor: grab;\n}\n.vue-image-filler .vue-image-filler-slider-bar i:before {\n  content: '';\n  display: block;\n  position: relative;\n  width: 14px;\n  height: 14px;\n  top: 11px;\n  left: 11px;\n  border-radius: 100%;\n  border: 2px solid #409eff;\n  background: #fff;\n}\n.vue-image-filler .vue-image-filler-slider-bar i:hover {\n  transform: scale(1.2);\n}\n.vue-image-filler .vue-image-filler-slider-bar i.dragging {\n  transform: scale(1.2);\n}\n.vue-image-filler .vue-image-filler-slider-bar i.dragging:before {\n  border-color: #2787e7;\n  background: #edf2f7;\n}\n.vue-image-filler .vue-image-filler-slider-bar i:active {\n  cursor: grabbing;\n}\n.vue-image-filler .vue-image-filler-footer {\n  padding: 20px 0 60px 80px;\n  text-align: center;\n}\n");

	function getBoxSizePlaceIntoAnotherBox(innerWidth, innerHeight, outerWidth, outerHeight) {
		if (outerWidth / outerHeight > innerWidth / innerHeight) {
			return {
				width: outerHeight * innerWidth / innerHeight,
				height: outerHeight
			};
		} else {
			return {
				width: outerWidth,
				height: outerWidth * innerHeight / innerWidth
			};
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
		data: function data() {
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
			};
		},
		computed: {
			cropWidth: function cropWidth() {
				return this.width;
			},
			cropHeight: function cropHeight() {
				return this.height;
			},
			imageWidthInView: function imageWidthInView() {
				return this.size.imageWidth * this.size.scale;
			},
			imageHeightInView: function imageHeightInView() {
				return this.size.imageHeight * this.size.scale;
			}
		},
		template: template,
		mounted: function mounted() {},
		watch: {
			'size.scale': function sizeScale(newValue) {
				var offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2;
				var offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2;
				if (this.size.offsetLeft > offsetLeftRange) {
					this.size.offsetLeft = offsetLeftRange;
				} else if (this.size.offsetLeft < -offsetLeftRange) {
					this.size.offsetLeft = -offsetLeftRange;
				}

				if (this.size.offsetTop > offsetTopRange) {
					this.size.offsetTop = offsetTopRange;
				} else if (this.size.offsetTop < -offsetTopRange) {
					this.size.offsetTop = -offsetTopRange;
				}
			}
		},
		methods: {
			triggerFileSelect: function triggerFileSelect() {
				this.$refs.uploadInput.dispatchEvent(new MouseEvent('click'));
			},
			fileChangeHandle: function fileChangeHandle(event) {
				var _this = this;

				var file = event.target.files[0];
				var fileBlobURL = window.URL.createObjectURL(new Blob([file]));
				var image = new Image();
				image.onload = function () {
					_this.size.imageWidth = image.naturalWidth;
					_this.size.imageHeight = image.naturalHeight;
					_this.size.canvasWidth = _this.$refs.outer.clientWidth;

					var _getBoxSizePlaceIntoA = getBoxSizePlaceIntoAnotherBox(_this.cropWidth, _this.cropHeight, _this.size.canvasWidth, _this.size.canvasHeight),
					    width = _getBoxSizePlaceIntoA.width,
					    height = _getBoxSizePlaceIntoA.height;

					_this.size.cropWidthInView = width * .8;
					_this.size.cropHeightInView = height * .8;

					_this.size.scaleMin = Math.max(_this.size.cropWidthInView / _this.size.imageWidth, _this.size.cropHeightInView / _this.size.imageHeight);
					// 最大放大系数限定为三倍
					_this.size.scaleMax = _this.size.scaleMin * 3;
					_this.size.scale = _this.size.scaleMin;
					_this.size.offsetTop = 0;
					_this.size.offsetLeft = 0;

					_this.isFileSelected = true;
					_this.$nextTick(function () {
						_this.$refs.canvasImage.innerHTML = '';
						_this.$refs.canvasImage.appendChild(image);
					});
				};
				image.src = fileBlobURL;

				this._imageNode = image;

				event.target.value = '';
			},
			moveImage: function moveImage(event) {
				var _this2 = this;

				var offsetTopStart = this.size.offsetTop;
				var offsetLeftStart = this.size.offsetLeft;
				var offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2;
				var offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2;

				dragHandle(event, {
					move: function move(_ref) {
						var xOffset = _ref.xOffset,
						    yOffset = _ref.yOffset;

						var newOffsetTop = offsetTopStart + yOffset;
						var newOffsetLeft = offsetLeftStart + xOffset;
						_this2.size.offsetTop = Math.max(Math.min(newOffsetTop, offsetTopRange), -offsetTopRange);
						_this2.size.offsetLeft = Math.max(Math.min(newOffsetLeft, offsetLeftRange), -offsetLeftRange);
					}
				});
			},
			upload: function upload() {
				this.capture(function (_ref2) {
					var fileBlob = _ref2.fileBlob,
					    config = _ref2.config;

					var file = new File([fileBlob], 'capture.jpeg', { type: 'image/jpeg', lastModified: Date.now() });
					return {
						fileBlob: fileBlob,
						file: file,
						config: config
					};
				});
			},
			capture: function capture(callback) {
				var _this3 = this;

				var canvas = document.createElement('canvas');
				canvas.width = this.cropWidth;
				canvas.height = this.cropHeight;
				var zoomRate = this.cropWidth / this.size.cropWidthInView;
				var usedWidth = this.imageWidthInView * zoomRate;
				var usedHeight = this.imageHeightInView * zoomRate;
				var usedX = ((this.size.cropWidthInView - this.imageWidthInView) / 2 + this.size.offsetLeft) * zoomRate;
				var usedY = ((this.size.cropHeightInView - this.imageHeightInView) / 2 + this.size.offsetTop) * zoomRate;

				canvas.getContext('2d').drawImage(this._imageNode, usedX, usedY, usedWidth, usedHeight);
				canvas.toBlob(function (fileBlob) {
					callback && callback({
						fileBlob: fileBlob,
						config: {
							x: usedX / usedWidth,
							y: usedY / usedHeight,
							width: -_this3.cropWidth / usedWidth,
							height: -_this3.cropHeight / usedHeight
						}
					});
				}, 'image/jpeg', 0.95);
			}
		},
		beforeDestroy: function beforeDestroy() {}
	};

	ImageFiller.install = function (Vue) {
		Vue.component('ImageFiller', ImageFiller);
	};

	return ImageFiller;

})));
//# sourceMappingURL=vue-image-filler.umd.js.map
