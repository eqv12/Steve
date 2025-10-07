class Dino {
  constructor(states, x = 450, y = 1680, frameRate = 7) {
    this.frames = {}; // state -> array of images
    for (const [state, paths] of Object.entries(states)) {
      this.frames[state] = paths.map(p => {
        const img = new Image();
        img.src = `/static/${p}`;  // Flask serves static files
        return img;
      });
    }

    this.state = "run"; // default state
    this.frameIndex = 0;
    this.tickCount = 0;
    this.frameRate = frameRate;
    this.x = x;
    this.y = y;
    this.velocity = -120
    this.gravity = 20
  }

  // startJump(){
  //   this.setState("jump")
  // }

  getBoundingBox() {
  const scale = 1.5;
  const img = this.frames[this.state][this.frameIndex];
  const fullWidth = img.width * scale;
  const fullHeight = img.height * scale;

  const buffer = 0.05; // 5% buffer on all sides

  const width = fullWidth * (1 - 2 * buffer);
  const height = fullHeight * (1 - 2 * buffer);

  return {
    x: this.x + fullWidth * buffer,
    y: this.y + fullHeight * buffer,
    width,
    height
  };
}


  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      this.frameIndex = 0;
      this.tickCount = 0;
      this.y = 1680
      this.velocity = -360
      this.gravity = 60
    }
  }

  update() {
    if (this.tickCount == 0 && this.state == "jump"){
      this.jump()
    }
    this.tickCount++;
    if (this.tickCount >= this.frameRate) {
      if (this.state != "run" && this.frameIndex == this.frames[this.state].length -1){
        this.setState("run")
        
      }

      else{
        this.frameIndex = (this.frameIndex + 1) % this.frames[this.state].length;
        this.tickCount = 0;
      }
    }
  }
                
  jump(){
    this.y += this.velocity
    this.velocity += this.gravity
  }

  draw(ctx) {
    const img = this.frames[this.state][this.frameIndex];
    const scale = 1.5;  // 50% of original size
    const width = img.width * scale;
    const height = img.height * scale;
    ctx.drawImage(img, this.x, this.y, width, height);
  }
}
