export function createDashboardLayer(playerController, coinImg) {
  return function drawDashboard(context) {
    const { time } = playerController
    const { score, coins } = playerController.player

    const timeFormatted = time.toFixed().padStart(3, '0')
    const scoreFormatted = score.toFixed().padStart(6, '0')
    const coinsFormatted = coins.toFixed().padStart(2, '0')

    context.fillStyle = 'white'
    context.fillText('ROBERT', 16, 8)
    context.fillText(scoreFormatted, 16, 16)

    context.drawImage(coinImg, 96, 16)
    context.fillText(coinsFormatted, 112, 16)

    context.fillText('WORLD', 152, 8)
    context.fillText('1-1', 160, 16)

    context.fillText('TIME', 208, 8)
    context.fillText(timeFormatted, 216, 16)
  }
}
