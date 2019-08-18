function createTileCollisionLayer(tileCollider) {
  const resolvedTiles = [];

  const tileResolver = tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawTileCandidates(context, camera) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x, y * tileSize - camera.pos.y,
        tileSize, tileSize);
      context.stroke();
    });

    resolvedTiles.length = 0;
  }
}

function createEntityCollisionLayer(entities) {
  return function drawBoundingBoxes(context, camera) {
    context.strokeStyle = 'yellow';
    entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.bounds.left - camera.pos.x, entity.bounds.top - camera.pos.y,
        entity.bounds.right - entity.bounds.left, entity.bounds.bottom - entity.bounds.top);
      context.stroke();
    });
  }
}

export function createCollisionLayer(level) {
  const drawTileCandidates = createTileCollisionLayer(level.tileCollider)
  const drawBoundingBoxes = createEntityCollisionLayer(level.entities)

  return function drawCollision(context, camera) {
    drawTileCandidates(context, camera)
    drawBoundingBoxes(context, camera)
  }
}
