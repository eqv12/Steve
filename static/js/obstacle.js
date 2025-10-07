class Obstacle {
  constructor(imgPath, x, y, speed = 10) {
    this.img = new Image();
    this.img.src = `/static/${imgPath}`;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.markedForDeletion = false; // helps you remove off-screen obstacles
  }

  update() {
    // Move obstacle leftwards
    this.x -= this.speed;

    // If obstacle goes off the left edge, mark it for removal
    if (this.x + this.img.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    const scale = 0.8;  // 50% of original size
    const width = this.img.width * scale;
    const height = this.img.height * scale;
    ctx.drawImage(this.img, this.x, this.y, width, height);
  }

  getBoundingBox() {
  const scale = 1.5;
  const fullWidth = this.img.width * scale;
  const fullHeight = this.img.height * scale;

  const buffer = 0.05; // 5% buffer

  const width = fullWidth * (1 - 2 * buffer);
  const height = fullHeight * (1 - 2 * buffer);

  return {
    x: this.x + fullWidth * buffer,
    y: this.y + fullHeight * buffer,
    width,
    height
  };
}
}
