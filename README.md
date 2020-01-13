# vue-image-filler
图像[填充]剪裁工具 [ Vue Image clipping tool ]

`vue-image-filler` 是一款用于图像剪裁的工具，交互设计更为轻便简洁。与传统自由拖拽的图像剪裁工具不同的是，她更适用于限定输出尺寸的场景。

在常见的头像上传、缩略图生成、物料生成等功能皆可用它来完成。

**效果截图**

![截图](docs/sample-screenshoot.jpg)

## 开发设置

你可以从 `dist` 目录选择适合你项目的模块文件，独立引入，当然我们更推荐你通过 `npm` 安装使用。

### 通过 `npm` 安装模块
``` shell
npm install vue-image-filler --save
```
``` javascript
// 全局注册模块
import ImageFiller from 'vue-image-filler'

Vue.use(ImageFiller)

// or

// 局部注册
import {ImageFiller} from 'vue-image-filler'

new Vue({
  data: {
    // ...
  },
  components: {
    ImageFiller
  },
  methods: {
    // ...
  }
})
```

## 如何使用

模版定义
``` html
<ImageFiller
  :width="900"
  :height="600"
  @confirm="handleFillerSuccuss"
/>
```
图像剪裁完成事件监听
``` javascript
handleFillerSuccuss: function (data) {
  console.log('fileBlob:	裁切画面对应的 blob 数据')
  console.log('file:		裁切画面文件，可直接用于上传保存')
  console.log('config:		裁切参数配置，可用于传递给其他服务，均是水平、垂直方向上的相对比值')
  console.log('------------------------')
  console.log(data)

  // 生成预览图片地址
  let previewImageUrl = URL.createObjectURL(data.fileBlob)
  // 上传剪裁后的文件
  let formData = new FormData()
  formData.append('upload', data.file)
}
```