import ImageFiller from './vue-image-filler'
function install (Vue) {
  Vue.component('imageFiller', VueImageFiller);
}

export { ImageFiller }

export default {
  version: '0.4.9',
  install,
  ImageFiller
}
