!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ImageFiller",[],t):"object"==typeof exports?exports.ImageFiller=t():e.ImageFiller=t()}(window,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=9)}([function(e,t,i){var n=i(5);"string"==typeof n&&(n=[[e.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i(3)(n,r);n.locals&&(e.exports=n.locals)},function(e,t,i){var n=i(8);"string"==typeof n&&(n=[[e.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};i(3)(n,r);n.locals&&(e.exports=n.locals)},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i=function(e,t){var i=e[1]||"",n=e[3];if(!n)return i;if(t&&"function"==typeof btoa){var r=(o=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),a=n.sources.map((function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"}));return[i].concat(a).concat([r]).join("\n")}var o;return[i].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+i+"}":i})).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(n[a]=!0)}for(r=0;r<e.length;r++){var o=e[r];"number"==typeof o[0]&&n[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(e,t,i){var n,r,a={},o=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=n.apply(this,arguments)),r}),s=function(e,t){return t?t.querySelector(e):document.querySelector(e)},l=function(e){var t={};return function(e,i){if("function"==typeof e)return e();if(void 0===t[e]){var n=s.call(this,e,i);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),c=null,f=0,u=[],d=i(6);function p(e,t){for(var i=0;i<e.length;i++){var n=e[i],r=a[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(x(n.parts[o],t))}else{var s=[];for(o=0;o<n.parts.length;o++)s.push(x(n.parts[o],t));a[n.id]={id:n.id,refs:1,parts:s}}}}function g(e,t){for(var i=[],n={},r=0;r<e.length;r++){var a=e[r],o=t.base?a[0]+t.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};n[o]?n[o].parts.push(s):i.push(n[o]={id:o,parts:[s]})}return i}function v(e,t){var i=l(e.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=u[u.length-1];if("top"===e.insertAt)n?n.nextSibling?i.insertBefore(t,n.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),u.push(t);else if("bottom"===e.insertAt)i.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=l(e.insertAt.before,i);i.insertBefore(t,r)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function m(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var n=function(){0;return i.nc}();n&&(e.attrs.nonce=n)}return b(t,e.attrs),v(e,t),t}function b(e,t){Object.keys(t).forEach((function(i){e.setAttribute(i,t[i])}))}function x(e,t){var i,n,r,a;if(t.transform&&e.css){if(!(a="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=a}if(t.singleton){var o=f++;i=c||(c=m(t)),n=z.bind(null,i,o,!1),r=z.bind(null,i,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),v(e,t),t}(t),n=_.bind(null,i,t),r=function(){h(i),i.href&&URL.revokeObjectURL(i.href)}):(i=m(t),n=I.bind(null,i),r=function(){h(i)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=o()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var i=g(e,t);return p(i,t),function(e){for(var n=[],r=0;r<i.length;r++){var o=i[r];(s=a[o.id]).refs--,n.push(s)}e&&p(g(e,t),t);for(r=0;r<n.length;r++){var s;if(0===(s=n[r]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete a[s.id]}}}};var w,y=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function z(e,t,i,n){var r=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var a=document.createTextNode(r),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function I(e,t){var i=t.css,n=t.media;if(n&&e.setAttribute("media",n),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}function _(e,t,i){var n=i.css,r=i.sourceMap,a=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||a)&&(n=d(n)),r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}},function(e,t,i){"use strict";var n=i(0);i.n(n).a},function(e,t,i){(e.exports=i(2)(!1)).push([e.i,".vue-image-filler-slider-bar[data-v-282177dc] {\n  position: relative;\n  height: 40px;\n  margin: 60px 80px 40px;\n}\n.vue-image-filler-slider-bar[data-v-282177dc]:before,\n.vue-image-filler-slider-bar div[data-v-282177dc],\n.vue-image-filler-slider-bar i[data-v-282177dc] {\n  position: absolute;\n  top: 50%;\n  display: block;\n}\n.vue-image-filler-slider-bar[data-v-282177dc]:before {\n  content: '';\n  width: 100%;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #e4e7ed;\n}\n.vue-image-filler-slider-bar div[data-v-282177dc] {\n  left: 0;\n  height: 6px;\n  margin-top: -3px;\n  border-radius: 3px;\n  background: #409eff;\n}\n.vue-image-filler-slider-bar i[data-v-282177dc] {\n  width: 40px;\n  height: 40px;\n  margin-top: -20px;\n  right: -20px;\n  transition: 0.15s ease-in-out;\n  cursor: grab;\n}\n.vue-image-filler-slider-bar i[data-v-282177dc]:before {\n  content: '';\n  display: block;\n  position: relative;\n  width: 14px;\n  height: 14px;\n  top: 11px;\n  left: 11px;\n  border-radius: 100%;\n  border: 2px solid #409eff;\n  background: #fff;\n}\n.vue-image-filler-slider-bar i[data-v-282177dc]:hover {\n  transform: scale(1.2);\n}\n.vue-image-filler-slider-bar i.dragging[data-v-282177dc] {\n  transform: scale(1.2);\n}\n.vue-image-filler-slider-bar i.dragging[data-v-282177dc]:before {\n  border-color: #2787e7;\n  background: #edf2f7;\n}\n.vue-image-filler-slider-bar i[data-v-282177dc]:active {\n  cursor: grabbing;\n}\n",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var i=t.protocol+"//"+t.host,n=i+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var r,a=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?e:(r=0===a.indexOf("//")?a:0===a.indexOf("/")?i+a:n+a.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")}))}},function(e,t,i){"use strict";var n=i(1);i.n(n).a},function(e,t,i){(e.exports=i(2)(!1)).push([e.i,".vue-image-filler *[data-v-fc65fb3c],\n.vue-image-filler *[data-v-fc65fb3c]:before,\n.vue-image-filler *[data-v-fc65fb3c]:after {\n  box-sizing: content-box;\n}\n.vue-image-filler .vue-image-filler-real-input[data-v-fc65fb3c] {\n  display: none;\n}\n.vue-image-filler .vue-image-filler-button[data-v-fc65fb3c] {\n  height: 40px;\n  margin: 0;\n  padding: 0 30px;\n  border: none;\n  border-radius: 4px;\n  background: #2196f3;\n  font-size: 14px;\n  color: #fff;\n  cursor: pointer;\n  transition: 0.15s;\n}\n.vue-image-filler .vue-image-filler-button[data-v-fc65fb3c]:hover {\n  background: #0b7ad5;\n}\n.vue-image-filler .vue-image-filler-button[data-v-fc65fb3c]:active {\n  background: #235c8b;\n}\n.vue-image-filler .vue-image-filler-button[data-v-fc65fb3c]:focus {\n  outline: none;\n}\n.vue-image-filler .vue-image-filler-text-button[data-v-fc65fb3c] {\n  margin: 0 0 0 12px;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  color: #2196f3;\n  cursor: pointer;\n  transition: 0.15s;\n}\n.vue-image-filler .vue-image-filler-text-button[data-v-fc65fb3c]:hover {\n  color: #0b7ad5;\n}\n.vue-image-filler .vue-image-filler-text-button[data-v-fc65fb3c]:active {\n  color: #235c8b;\n}\n.vue-image-filler .vue-image-filler-text-button[data-v-fc65fb3c]:focus {\n  outline: none;\n}\n.vue-image-filler .vue-image-filler-view[data-v-fc65fb3c] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 400px;\n}\n.vue-image-filler .vue-image-filler-view p[data-v-fc65fb3c] {\n  margin: 30px 0 0;\n  font-size: 14px;\n  color: #d3d9de;\n}\n.vue-image-filler .vue-image-filler-canvas[data-v-fc65fb3c] {\n  position: relative;\n  height: 300px;\n  overflow: hidden;\n  background: #ddd;\n  cursor: grab;\n}\n.vue-image-filler .vue-image-filler-canvas[data-v-fc65fb3c]:active {\n  cursor: grabbing;\n}\n.vue-image-filler .vue-image-filler-canvas-img[data-v-fc65fb3c] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.7);\n  pointer-events: none;\n}\n.vue-image-filler .vue-image-filler-canvas-img[data-v-fc65fb3c] img {\n  display: block;\n  width: 100%;\n}\n.vue-image-filler .vue-image-filler-canvas-mask[data-v-fc65fb3c] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  outline: 1000px solid rgba(255, 255, 255, 0.5);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.2);\n}\n.vue-image-filler .vue-image-filler-footer[data-v-fc65fb3c] {\n  padding: 20px 0 60px 80px;\n  text-align: center;\n}\n",""])},function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"outer",staticClass:"vue-image-filler"},[i("input",{ref:"uploadInput",staticClass:"vue-image-filler-real-input",attrs:{type:"file",accept:"image/png, image/jpg, image/jpeg"},on:{change:function(t){return e.fileChangeHandle(t)}}}),e._v(" "),e.isFileSelected?[i("div",{staticClass:"vue-image-filler-canvas",style:{height:e.size.canvasHeight},on:{mousedown:e.moveImage,touchstart:e.moveImage}},[i("div",{ref:"canvasImage",staticClass:"vue-image-filler-canvas-img",style:{width:e.imageWidthInView+"px",height:e.imageHeightInView+"px",marginTop:e.size.offsetTop+"px",marginLeft:e.size.offsetLeft+"px"}}),e._v(" "),i("div",{staticClass:"vue-image-filler-canvas-mask",style:{width:e.size.cropWidthInView+"px",height:e.size.cropHeightInView+"px"}})]),e._v(" "),i("Slider",{attrs:{min:e.size.scaleMin,max:e.size.scaleMax},model:{value:e.size.scale,callback:function(t){e.$set(e.size,"scale",t)},expression:"size.scale"}}),e._v(" "),i("div",{staticClass:"vue-image-filler-footer"},[i("button",{staticClass:"vue-image-filler-button",on:{click:e.upload}},[e._v("上传")]),e._v(" "),i("button",{staticClass:"vue-image-filler-text-button",on:{click:e.triggerFileSelect}},[e._v("重新上传")])])]:[i("div",{staticClass:"vue-image-filler-view"},[i("button",{staticClass:"vue-image-filler-button",on:{click:e.triggerFileSelect}},[e._v("选择图片")]),e._v(" "),i("p",[e._v("仅支持jpg、png、jpeg格式文件上传！")])])]],2)};function r(e){window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation()}function a(e,t,i,n){if(e){var r=t.clientX,a=t.clientY;e({clientX:r,clientY:a,xOffset:r-i,yOffset:a-n})}}n._withStripped=!0;var o=function(e,t){var i=t.move,n=t.end;r(e),"touchstart"===e.type?function(e,t,i){var n,o=e.touches[0].clientX,s=e.touches[0].clientY;function l(e){r(e),n=e.touches[0],a(t,n,o,s)}function c(t){e.target.removeEventListener("touchmove",l,!1),e.target.removeEventListener("touchend",c,!1),e.target.removeEventListener("touchcancel",c,!1),a(i,n,o,s)}e.target.addEventListener("touchmove",l,!1),e.target.addEventListener("touchend",c,!1),e.target.addEventListener("touchcancel",c,!1)}(e,i,n):function(e,t,i){var n=e.clientX,o=e.clientY;function s(e){r(e),window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(),a(t,e,n,o)}document.addEventListener("mousemove",s,!1),document.addEventListener("mouseup",(function e(t){document.removeEventListener("mousemove",s,!1),document.removeEventListener("mouseup",e,!1),a(i,t,n,o)}),!1)}(e,i,n)},s=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"outer",staticClass:"vue-image-filler-slider-bar"},[t("div",{style:{width:100*this.progressLocal+"%"}},[t("i",{class:[this.isDragging?"dragging":""],on:{mousedown:this.dragHandle,touchstart:this.dragHandle}})])])};s._withStripped=!0;var l={name:"image-filler-slider",props:{min:{type:Number,default:0},max:{type:Number,default:100},value:{type:Number,default:0}},data:function(){return{isDragging:!1}},computed:{progressLocal:function(){return(this.value-this.min)/(this.max-this.min)}},methods:{dragHandle:function(e){var t=this,i=this.progressLocal,n=this.$refs.outer.clientWidth;this.isDragging=!0,o(e,{move:function(e){var r=e.xOffset,a=i+r/n;a=Math.max(Math.min(a,1),0);var o=t.min+a*(t.max-t.min);t.$emit("input",o)},end:function(){t.isDragging=!1}})}}};i(4);function c(e,t,i,n,r,a,o,s){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),o?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},c._ssrRegister=l):r&&(l=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var f=c.render;c.render=function(e,t){return l.call(t),f(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:c}}var f=c(l,s,[],!1,null,"282177dc",null);f.options.__file="src/vue-image-filler-slider.vue";var u={name:"image-filler",components:{Slider:f.exports},props:{width:{type:Number,default:""},height:{type:Number,default:""}},data:function(){return{isFileSelected:!1,_imageNode:null,size:{scaleMin:.1,scaleMax:2,scale:5,canvasWidth:0,canvasHeight:300,cropWidthInView:0,cropHeightInView:0,imageWidth:0,imageHeight:0,offsetTop:0,offsetLeft:0}}},computed:{cropWidth:function(){return this.width},cropHeight:function(){return this.height},imageWidthInView:function(){return this.size.imageWidth*this.size.scale},imageHeightInView:function(){return this.size.imageHeight*this.size.scale}},watch:{"size.scale":function(){var e=(this.imageWidthInView-this.size.cropWidthInView)/2,t=(this.imageHeightInView-this.size.cropHeightInView)/2;this.size.offsetLeft>e?this.size.offsetLeft=e:this.size.offsetLeft<-e&&(this.size.offsetLeft=-e),this.size.offsetTop>t?this.size.offsetTop=t:this.size.offsetTop<-t&&(this.size.offsetTop=-t)}},methods:{triggerFileSelect:function(){this.$refs.uploadInput.dispatchEvent(new MouseEvent("click"))},fileChangeHandle:function(e){var t=this,i=e.target.files[0],n=window.URL.createObjectURL(new Blob([i])),r=new Image;r.onload=function(){t.size.imageWidth=r.width||r.naturalWidth,t.size.imageHeight=r.height||r.naturalHeight,t.size.canvasWidth=t.$refs.outer.clientWidth;var e,i,n,a,o=(e=t.cropWidth,i=t.cropHeight,n=t.size.canvasWidth,a=t.size.canvasHeight,n/a>e/i?{width:a*e/i,height:a}:{width:n,height:n*i/e}),s=o.width,l=o.height;t.size.cropWidthInView=.8*s,t.size.cropHeightInView=.8*l,t.size.scaleMin=Math.max(t.size.cropWidthInView/t.size.imageWidth,t.size.cropHeightInView/t.size.imageHeight),t.size.scaleMax=3*t.size.scaleMin,t.size.scale=t.size.scaleMin,t.size.offsetTop=0,t.size.offsetLeft=0,t.isFileSelected=!0,t.$nextTick((function(){t.$refs.canvasImage.innerHTML="",t.$refs.canvasImage.appendChild(r)}))},r.src=n,this._imageNode=r,e.target.value=""},moveImage:function(e){var t=this,i=this.size.offsetTop,n=this.size.offsetLeft,r=(this.imageWidthInView-this.size.cropWidthInView)/2,a=(this.imageHeightInView-this.size.cropHeightInView)/2;o(e,{move:function(e){var o=e.xOffset,s=e.yOffset,l=i+s,c=n+o;t.size.offsetTop=Math.max(Math.min(l,a),-a),t.size.offsetLeft=Math.max(Math.min(c,r),-r)}})},upload:function(){var e=this;this.capture((function(t){var i=t.fileBlob,n=t.config,r=new File([i],"capture.jpeg",{type:"image/jpeg",lastModified:Date.now()});e.$emit("confirm",{fileBlob:i,file:r,config:n})}))},capture:function(e){var t=this,i=document.createElement("canvas");i.width=this.cropWidth,i.height=this.cropHeight;var n=this.cropWidth/this.size.cropWidthInView,r=this.imageWidthInView*n,a=this.imageHeightInView*n,o=((this.size.cropWidthInView-this.imageWidthInView)/2+this.size.offsetLeft)*n,s=((this.size.cropHeightInView-this.imageHeightInView)/2+this.size.offsetTop)*n;i.getContext("2d").drawImage(this._imageNode,o,s,r,a),i.toBlob((function(i){e&&e({fileBlob:i,config:{x:0-o/r,y:0-s/a,width:t.cropWidth/r,height:t.cropHeight/a}})}),"image/jpeg",.95)}}},d=(i(7),c(u,n,[],!1,null,"fc65fb3c",null));d.options.__file="src/vue-image-filler.vue";var p=d.exports;i.d(t,"ImageFiller",(function(){return p}));t.default={version:"0.4.9",install:function(e){e.component("imageFiller",VueImageFiller)},ImageFiller:p}}])}));
//# sourceMappingURL=index.js.map