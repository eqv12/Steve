class Background {
  constructor(imagePath, canvasWidth, canvasHeight, scrollSpeed = 8) {
    this.image = new Image();
    this.image.src = `/static/${imagePath}`;
    this.x = 0; // current x-position
    this.scrollSpeed = scrollSpeed;
    this.width = canvasWidth;
    this.height = canvasHeight;
  }

  update() {
    this.x -= this.scrollSpeed;
    if (this.x <= -this.width) {
      this.x = 0; // reset to loop
    }
  }

  draw(ctx) {
    // Draw first copy
    ctx.drawImage(this.image, this.x, 0, this.width, this.height);
    // Draw second copy to the right for seamless looping
    ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
  }
}
