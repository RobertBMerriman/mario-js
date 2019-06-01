export function createDashboardLayer(playerEnv) {
  return function drawDashboard(context) {
    const score = 0
    const scoreFormatted = score.toFixed().padStart(6, '0')

    const time = playerEnv.playerController.time
    const timeFormatted = time.toFixed().padStart(3, '0')

    const coins = 13
    const coinsFormatted = coins.toFixed().padStart(2, '0')

    context.fillStyle = 'white'
    context.fillText('MARIO', 16, 8)
    context.fillText(scoreFormatted, 16, 16)

    context.fillText(`@x${coinsFormatted}`, 96, 16)

    context.fillText('WORLD', 152, 8)
    context.fillText('1-1', 160, 16)

    context.fillText('TIME', 208, 8)
    context.fillText(timeFormatted, 216, 16)
  }
}
