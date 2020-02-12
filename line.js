class Line {
  constructor(x, y, angle) {
    this.startPos = { x, y };
    this.endPos = { x, y };
    this.angle = angle;

    this.nextSpawnTime = Math.random() * spawnRandomness + minSpawnTime;
    this.growing = true;
  }

  update(maxDim, otherLines) {
    if (this.growing) {
      if (this.nextSpawnTime-- <= 0) {
        this.nextSpawnTime = Math.random() * spawnRandomness + minSpawnTime;
        otherLines.push(
          new Line(
            this.endPos.x,
            this.endPos.y,
            this.angle + Math.random() * Math.PI - Math.PI / 2
          )
        );
      }

      this.endPos.x += Math.cos(this.angle);
      this.endPos.y += Math.sin(this.angle);

      this.growing =
        otherLines.length < maxLines &&
        this.endPos.x > -maxDim.x / 2 &&
        this.endPos.y > -maxDim.y / 2 &&
        this.endPos.x < maxDim.x / 2 &&
        this.endPos.y < maxDim.y / 2;
    }
  }

  draw(ctx, maxDim) {
    for (let i = 0; i < 8; i++) {
      const xSign = 2 * (i % 4 < 2) - 1;
      const ySign = 2 * (i < 4) - 1;
      const startCoords = [xSign * this.startPos.x, ySign * this.startPos.y];
      const endCoords = [xSign * this.endPos.x, ySign * this.endPos.y];

      ctx.beginPath();
      ctx.moveTo(
        maxDim.x / 2 + startCoords[i % 2],
        maxDim.y / 2 + startCoords[(i + 1) % 2]
      );
      ctx.lineTo(
        maxDim.x / 2 + endCoords[i % 2],
        maxDim.y / 2 + endCoords[(i + 1) % 2]
      );
      ctx.stroke();
    }
  }
}
