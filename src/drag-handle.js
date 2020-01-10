function preventDefault (event) {
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
	event.preventDefault && event.preventDefault()
	event.stopPropagation && event.stopPropagation()
}
function getParam(clientX, clientY, startX, startY) {
	let xOffset = clientX - startX
	let yOffset = clientY - startY

	return {
		clientX,
		clientY,
		xOffset,
		yOffset
	}
}
function dragHandle(event, { move, end }) {
	let isTouch = event.type === 'touchstart'
	let startX = event.clientX
	let startY = event.clientY

	preventDefault (event)
	if (isTouch) {
		startX = event.touches[0].clientX
		startY = event.touches[0].clientY
		event.target.addEventListener('touchmove', touchmove, false)
		event.target.addEventListener('touchend', touchend, false)
		event.target.addEventListener('touchcancel', touchend, false)
	} else {
		document.addEventListener('mousemove', mousemove, false)
		document.addEventListener('mouseup', mouseup, false)
	} 
	let lastClientX
	let lastClientY
	function touchmove(e) {
		preventDefault (e)
		lastClientX = e.touches[0].clientX
		lastClientY = e.touches[0].clientY
		move && move(getParam(lastClientX, lastClientY, startX, startY))
	}
	function touchend(e) {
		event.target.removeEventListener('touchmove', touchmove, false)
		event.target.removeEventListener('touchend', touchend, false)
		event.target.removeEventListener('touchcancel', touchend, false)
		end && end(getParam(lastClientX, lastClientY, startX, startY))
	}
	
	function mousemove(e) {
		preventDefault (e)
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
		move && move(getParam(e.clientX, e.clientY, startX, startY))
	}
	function mouseup(e) {
		document.removeEventListener('mousemove', mousemove, false)
		document.removeEventListener('mouseup', mouseup, false)

		end && end(getParam(e.clientX, e.clientY, startX, startY))
	}
}
export default dragHandle