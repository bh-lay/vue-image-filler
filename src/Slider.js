
import dragHandle from './drag-handle.js'

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
  template: `<div class="vue-image-filler-slider-bar" ref="outer">
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
      const percentStart = this.progressLocal
      const sliderWidth = this.$refs.outer.clientWidth
      this.isDragging = true
      dragHandle(event, {
        move: ({xOffset}) => {
          let newPercent =  percentStart + (xOffset / sliderWidth)
          newPercent = Math.max(Math.min(newPercent, 1), 0)
          let newValue = this.min + newPercent * (this.max - this.min)
          this.$emit('input', newValue)
        },
        end: () => {
          this.isDragging = false
        }
      })
    },
  },
	beforeDestroy: function () {
	}
}


export default Slider