import ImageFiller from './vue-image-filler'
function install (Vue) {
  Vue.component('imageFiller', VueImageFiller);
}

export {ImageFiller, install}
