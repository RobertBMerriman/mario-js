export function createUiLayer(uiElements) {
  return function drawUi(context) {
    uiElements.forEach(element => {
      element.draw(context)
    })
  }
}
