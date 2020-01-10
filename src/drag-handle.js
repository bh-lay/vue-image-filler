function dragHandle (event, {move, end}) {
  let startX = event.clientX
  let startY = event.clientY

  event.preventDefault && event.preventDefault()
  event.stopPropagation && event.stopPropagation()

  document.addEventListener('mousemove', mousemove, false)
  document.addEventListener('mouseup', up, false)

  function getParam(e) {
    let clientX = e.clientX
    let clientY = e.clientY
    let xOffset = clientX - startX
    let yOffset = clientY - startY
    
    return {
      clientX,
      clientY,
      xOffset,
      yOffset
    }
  }
  function mousemove (e) {
    e.preventDefault && e.preventDefault()
    e.stopPropagation && e.stopPropagation()
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    
    move && move(getParam(e))
  }
  function up (e) {
    document.removeEventListener('mousemove', mousemove, false)
    document.removeEventListener('mouseup', up, false)

    end && end(getParam(e))
  }
}
export default dragHandle