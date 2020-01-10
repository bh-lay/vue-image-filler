// 清除页面选择，组织浏览器默认事件防止页面抖动
function preventDefault (event) {
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
	event.preventDefault && event.preventDefault()
	event.stopPropagation && event.stopPropagation()
}
// 回调触发器
function stepCall(callback, event, startX, startY) {
	if (!callback) {
		return
	}
	let clientX = event.clientX
	let clientY = event.clientY
	let xOffset = clientX - startX
	let yOffset = clientY - startY

	callback({
		clientX,
		clientY,
		xOffset,
		yOffset
	})
}

// 触摸屏逻辑
function touch (event, move, end) {
	let startX = event.touches[0].clientX
	let startY = event.touches[0].clientY
	let lastTouch

	function touchmove(e) {
		preventDefault (e)
		lastTouch = e.touches[0]
		stepCall(move, lastTouch, startX, startY)
	}

	function touchend(e) {
		event.target.removeEventListener('touchmove', touchmove, false)
		event.target.removeEventListener('touchend', touchend, false)
		event.target.removeEventListener('touchcancel', touchend, false)
		stepCall(end, lastTouch, startX, startY)
	}

	event.target.addEventListener('touchmove', touchmove, false)
	event.target.addEventListener('touchend', touchend, false)
	event.target.addEventListener('touchcancel', touchend, false)
}
// 鼠标逻辑
function mouse (event, move, end) {
	let startX = event.clientX
	let startY = event.clientY

	function mousemove(e) {
		preventDefault (e)
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
		stepCall(move, e, startX, startY)
	}

	function mouseup(e) {
		document.removeEventListener('mousemove', mousemove, false)
		document.removeEventListener('mouseup', mouseup, false)
		stepCall(end, e, startX, startY)
	}

	document.addEventListener('mousemove', mousemove, false)
	document.addEventListener('mouseup', mouseup, false)
}

// 主逻辑
function dragHandle(event, { move, end }) {
	preventDefault (event)
	if (event.type === 'touchstart') {
		touch(event, move, end)
	} else {
		mouse(event, move, end)
	}

}
export default dragHandle