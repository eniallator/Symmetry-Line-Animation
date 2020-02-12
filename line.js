class Line {
    constructor(x, y, angle) {
        this.startPos = { x, y }
        this.endPos = { x, y }
        this.angle = angle

        this.nextSpawnTime = Math.random() * spawnRandomness + minSpawnTime
        this.growing = true
    }

    update(maxDim, otherLines) {
        if (this.growing) {
            if (this.nextSpawnTime-- <= 0) {
                this.nextSpawnTime = Math.random() * spawnRandomness + minSpawnTime
                otherLines.push(new Line(this.endPos.x, this.endPos.y, this.angle + Math.random() * Math.PI - Math.PI / 2))
            }

            this.endPos.x += Math.cos(this.angle)
            this.endPos.y += Math.sin(this.angle)

            this.growing = this.endPos.x > 0 && this.endPos.y > 0 && this.endPos.x < maxDim.x && this.endPos.y < maxDim.y
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.startPos.x, this.startPos.y)
        ctx.lineTo(this.endPos.x, this.endPos.y)
        ctx.stroke()
    }
}
