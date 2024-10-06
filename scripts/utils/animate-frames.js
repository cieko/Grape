let gameFrame = 0; // Move gameFrame outside of the animate function
const staggerFrame = 10; // Stagger frame constant
let playerState = 'idle'; // Keep playerState private within the module

// Function to update playerState
export function setPlayerState(newState) {
  playerState = newState;
}

export function animate(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, playerImage, spriteDimConfig, spriteAnimations) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clear rectangle
  // ctx.fillRect(50, 50, 100, 100);
  /* Fill rectangle

    Initially, it will look like a static image, but instead it is animating over and over again, make it look static
  */

  let { spriteWidth, spriteHeight } = spriteDimConfig;
  // let { frameX, frameY } = frames; // Destructure frames object
  

  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length; // to cycle thru horizontal spritesheet
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // Draw the image only after it has loaded
  if (playerImage.complete) {
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    // ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw image
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); // Draw image
  
    // BASIC WAY
    // if (gameFrame % staggerFrame === 0) {
    //   // Increment frameX for the next animation frame
    //   if (frames.frameX < 6) {
    //     frames.frameX++;  // Update frameX in the object using frames parameter only (to avoid call by reference property of javascript object)
    //   } else {
    //     frames.frameX = 0;  // Reset frameX to 0
    //   }
    // }

    // ADVANCE WAY

    gameFrame++;

  }


  requestAnimationFrame(() => animate(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, playerImage, spriteDimConfig, spriteAnimations)); // Correctly pass parameters
}
