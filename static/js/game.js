const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const bgImage = new Image();
bgImage.src = "/static/assets/bg/scene1.jpg";

bgImage.onload = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Make background object
  const bg = new Background("assets/bg/scene1.jpg", canvas.width, canvas.height);

  const dino = new Dino({ run: runFrames, jump: jumpFrames });

  const obstacles = [];
  let obstacleTimer = 0;
  let obstacleInterval = 150; // frames between spawns (tweak this)


  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      // trigger dino jump
      dino.setState("jump");
    }
  });

  function isColliding(dino, obstacles) {
  const dBox = dino.getBoundingBox();

  return obstacles.some(obs => {
    const oBox = obs.getBoundingBox();
    cond1 = dBox.x < oBox.x + oBox.width;
    cond2 = dBox.x + dBox.width > oBox.x;
    cond3 = dBox.y < oBox.y + oBox.height;
    cond4 = dBox.y + dBox.height > oBox.y;
     
    return cond1 && cond2 && cond3 && cond4;

    // return (
    //   dBox.x < oBox.x + oBox.width &&
    //   dBox.x + dBox.width > oBox.x &&
    //   dBox.y < oBox.y + oBox.height &&
    //   dBox.y + dBox.height > oBox.y
    // );


  });
}


  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.update();
    bg.draw(ctx);

    // ---  OBSTACLE LOGIC STARTS HERE ---
    obstacleTimer++;

    // Spawn only if fewer than 2 obstacles exist and enough time has passed
    if (obstacles.length < 2 && obstacleTimer > obstacleInterval) {
      console.log("check")
      // randomize the next spawn time a bit
      obstacleInterval = 100 + Math.random() * 100;

      // randomize spawn position slightly (y stays near ground)
      const spawnY = 1600; // same ground level as dino’s top-left
      const spawnX = canvas.width + Math.random() * 200; // just off-screen to right

      obstacles.push(new Obstacle("assets/obstacles/obstacle3.png", spawnX, spawnY, 20));
      obstacleTimer = 0;
    }

    // Update + draw obstacles
    obstacles.forEach(o => {
      o.update();
      o.draw(ctx);
    });

    // Remove obstacles marked for deletion
    for (let i = obstacles.length - 1; i >= 0; i--) {
      if (obstacles[i].markedForDeletion) obstacles.splice(i, 1);
    }
    // ---  OBSTACLE LOGIC ENDS HERE ---

    if (isColliding(dino, obstacles)){
      console.log("dead")
    }


    dino.update();
    dino.draw(ctx);
    requestAnimationFrame(gameLoop);
  }

  gameLoop();


};
