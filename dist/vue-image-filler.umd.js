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

  function dragHandle (event, {move, end}) {
    let startX = event.clientX;
    let startY = event.clientY;

    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();

    document.addEventListener('mousemove', mousemove, false);
    document.addEventListener('mouseup', up, false);

    function getParam(e) {
      let clientX = e.clientX;
      let clientY = e.clientY;
      let xOffset = clientX - startX;
      let yOffset = clientY - startY;
      
      return {
        clientX,
        clientY,
        xOffset,
        yOffset
      }
    }
    function mousemove (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      
      move && move(getParam(e));
    }
    function up (e) {
      document.removeEventListener('mousemove', mousemove, false);
      document.removeEventListener('mouseup', up, false);

      end && end(getParam(e));
    }
  }

  var Slider = {
  	name: 'image-filler',
  	props: {
  		min: {
  			type: Number,
  			default:0
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
    template: `<div class="slider-bar" ref="outer">
    <div :style="{width: (progressLocal * 100) + '%'}"><i
      :class="[isDragging ? 'dragging' : '']"
      @mousedown="dragHandle"
    ></i></div>
  </div>`,
  	data: function () {
  		return {
        isDragging: false
  		}
  	},
    computed: {
      progressLocal () {
        return (this.value - this.min) / (this.max - this.min)
      }
    },
  	mounted: function () {
  	},
  	watch: {
  	},
    methods: {
      dragHandle(event) {
        const percentStart = this.progressLocal;
        const sliderWidth = this.$refs.outer.clientWidth;
        this.isDragging = true;
        dragHandle(event, {
          move: ({xOffset}) => {
            let newPercent =  percentStart + (xOffset / sliderWidth);
            newPercent = Math.max(Math.min(newPercent, 1), 0);
            let newValue = this.min + newPercent * (this.max - this.min);
            this.$emit('input', newValue);
          },
          end: () => {
            this.isDragging = false;
          }
        });
      },
    },
  	beforeDestroy: function () {
  	}
  };

  var template = "<div class=\"vue-image-filler\" ref=\"outer\">\r\n\t<template v-if=\"!isFileSelected\">\r\n\t  <div class=\"file-select-view\">\r\n\t\t<input type=\"file\"\r\n\t\t  ref=\"uploadInput\"\r\n\t\t  accept=\"image/png, image/jpg, image/jpeg\"\r\n\t\t  @change=\"beforeUpload($event)\"\r\n\t\t  class=\"real-input\"\r\n\t\t/>\r\n\t\t<button @click=\"triggerFileSelect\" class=\"button\">选择图片</button>\r\n\t\t<p>仅支持jpg、png、jpeg格式文件上传！</p>\r\n\t  </div>\r\n\t</template>\r\n\t<template v-else>\r\n\t  <div class=\"canvas-area\"\r\n\t\t:style=\"{\r\n\t\t  height: size.canvasHeight\r\n\t\t}\"\r\n\t\t@mousedown=\"moveImage\"\r\n\t  >\r\n\t\t<div class=\"canvas-img\" ref=\"canvasImage\"\r\n\t\t  :style=\"{\r\n\t\t\twidth: imageWidthInView + 'px',\r\n\t\t\theight: imageHeightInView + 'px',\r\n\t\t\tmarginTop: size.offsetTop + 'px',\r\n\t\t\tmarginLeft: size.offsetLeft + 'px'\r\n\t\t  }\"\r\n\t\t></div>\r\n\t\t<div\r\n\t\t  class=\"canvas-mask\"\r\n\t\t  :style=\"{\r\n\t\t\twidth: size.cropWidthInView + 'px',\r\n\t\t\theight: size.cropHeightInView + 'px',\r\n\t\t  }\"\r\n\t\t></div>\r\n\t  </div>\r\n\t  <Slider\r\n\t\t:min=\"size.scaleMin\"\r\n\t\t:max=\"size.scaleMax\"\r\n\t\tv-model=\"size.scale\"\r\n\t  />\r\n\t  <div class=\"footer\">\r\n\t\t<button type=\"primary\" class=\"main-button\" @click=\"upload\">上传</button>\r\n\t\t<button type=\"text\" @click=\"isFileSelected=false\">重新上传</button>\r\n\t  </div>\r\n\t</template>\r\n  </div>";

  __$styleInject(".vue-image-filler *,\n.vue-image-filler *:before,\n.vue-image-filler *:after {\n  box-sizing: content-box;\n}\n.vue-image-filler .file-select-view {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 300px;\n}\n.vue-image-filler .file-select-view .real-input {\n  display: none;\n}\n.vue-image-filler .canvas-area {\n  position: relative;\n  height: 300px;\n  overflow: hidden;\n  background: #ddd;\n  cursor: grab;\n}\n.vue-image-filler .canvas-area:active {\n  cursor: grabbing;\n}\n.vue-image-filler .canvas-img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.7);\n  pointer-events: none;\n}\n.vue-image-filler .canvas-img img {\n  display: block;\n  width: 100%;\n}\n.vue-image-filler .canvas-mask {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.5);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.2);\n}\n.vue-image-filler .slider-bar {\n  position: relative;\n  height: 40px;\n  margin: 60px 80px 40px;\n}\n.vue-image-filler .slider-bar:before,\n.vue-image-filler .slider-bar div,\n.vue-image-filler .slider-bar i {\n  position: absolute;\n  top: 50%;\n  display: block;\n}\n.vue-image-filler .slider-bar:before {\n  content: '';\n  width: 100%;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #e4e7ed;\n}\n.vue-image-filler .slider-bar div {\n  left: 0;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #409eff;\n}\n.vue-image-filler .slider-bar i {\n  width: 40px;\n  height: 40px;\n  margin-top: -20px;\n  right: -20px;\n  transition: 0.15s ease-in-out;\n  cursor: grab;\n}\n.vue-image-filler .slider-bar i:before {\n  content: '';\n  display: block;\n  position: relative;\n  width: 14px;\n  height: 14px;\n  top: 11px;\n  left: 11px;\n  border-radius: 100%;\n  border: 2px solid #409eff;\n  background: #fff;\n}\n.vue-image-filler .slider-bar i:hover {\n  transform: scale(1.2);\n}\n.vue-image-filler .slider-bar i.dragging {\n  transform: scale(1.2);\n}\n.vue-image-filler .slider-bar i.dragging:before {\n  border-color: #2787e7;\n  background: #edf2f7;\n}\n.vue-image-filler .slider-bar i:active {\n  cursor: grabbing;\n}\n.vue-image-filler .footer {\n  padding: 20px 0 30px 80px;\n  text-align: center;\n}\n.vue-image-filler .footer .main-button {\n  width: 200px;\n}\n");

  function getBoxSizePlaceIntoAnotherBox (innerWidth, innerHeight, outerWidth, outerHeight) {
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
  		cropWidth () {
  			return this.width
  		},
  		cropHeight () {
  			return this.height
  		},
      imageWidthInView(){
        return this.size.imageWidth * this.size.scale
      },
      imageHeightInView(){
        return this.size.imageHeight * this.size.scale
      }
    },
  	template: template,
  	mounted: function () {
  	},
  	watch: {
      'size.scale' (newValue) {
        const offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2;
        const offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2;
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
      triggerFileSelect() {
  			console.log('this.$refs.uploadInput', this.$refs.uploadInput);
        this.$refs.uploadInput.dispatchEvent(new MouseEvent('click'));
      },
      // 上传文件检验
      beforeUpload (event) {
        let file = event.target.files[0];
        let fileBlobURL = window.URL.createObjectURL(new Blob([file]));
        let image = new Image();
        image.onload = () => {
          this.size.imageWidth = image.naturalWidth;
          this.size.imageHeight = image.naturalHeight;
          this.size.canvasWidth = this.$refs.outer.clientWidth;
          let {width, height} = getBoxSizePlaceIntoAnotherBox(this.cropWidth, this.cropHeight, this.size.canvasWidth, this.size.canvasHeight);
          this.size.cropWidthInView = width * .8;
          this.size.cropHeightInView = height * .8;
          
          this.size.scaleMin = Math.max(this.size.cropWidthInView / this.size.imageWidth, this.size.cropHeightInView / this.size.imageHeight);
          // 最大放大系数限定为三倍
          this.size.scaleMax = this.size.scaleMin * 3;
          this.size.scale = this.size.scaleMin;
          this.isFileSelected = true;
          this.$nextTick(() => {
            this.$refs.canvasImage.innerHTML = '';
            this.$refs.canvasImage.appendChild(image);
          });
        };
        image.src = fileBlobURL;

        this._imageNode = image;
      },
      moveImage(event) {
        const offsetTopStart = this.size.offsetTop;
        const offsetLeftStart = this.size.offsetLeft;
        const offsetLeftRange = (this.imageWidthInView - this.size.cropWidthInView) / 2;
        const offsetTopRange = (this.imageHeightInView - this.size.cropHeightInView) / 2;

        dragHandle(event, {
          move: ({xOffset, yOffset}) => {
            let newOffsetTop = offsetTopStart + yOffset;
            let newOffsetLeft = offsetLeftStart + xOffset;
            this.size.offsetTop = Math.max(Math.min(newOffsetTop, offsetTopRange), -offsetTopRange);
            this.size.offsetLeft = Math.max(Math.min(newOffsetLeft, offsetLeftRange), -offsetLeftRange);
          }
        });
      },
      upload() {
        this.capture(({fillerBlob, config}) => {
          console.log(config);
          let file = new File([fillerBlob], 'capture.jpeg', {type: 'image/jpeg', lastModified: Date.now()});
          return {
            fillerBlob,
            file,
            config
          }
        });
      },
      capture(callback) {
        let canvas = document.createElement('canvas');
        canvas.width = this.cropWidth;
        canvas.height = this.cropHeight;
        let zoomRate = this.cropWidth / this.size.cropWidthInView;
        let usedWidth = this.imageWidthInView * zoomRate;
        let usedHeight = this.imageHeightInView * zoomRate;
        let usedX = ((this.size.cropWidthInView - this.imageWidthInView) / 2 + this.size.offsetLeft) * zoomRate;
        let usedY = ((this.size.cropHeightInView - this.imageHeightInView) / 2 + this.size.offsetTop) * zoomRate;

        canvas.getContext('2d').drawImage(this._imageNode, usedX, usedY, usedWidth, usedHeight);
        canvas.toBlob(fillerBlob => {
          callback && callback({
            fillerBlob,
            config: {
              x: usedX / usedWidth,
              y: usedY / usedHeight,
              width: -this.cropWidth / usedWidth,
              height: -this.cropHeight / usedHeight
            }
          });
        }, 'image/jpeg', 0.95);
      }
    },
  	beforeDestroy: function () {
  	}
  };

  ImageFiller.install = function (Vue) {
  	Vue.component('ImageFiller', ImageFiller);
  };

  return ImageFiller;

})));
//# sourceMappingURL=vue-image-filler.umd.js.map
