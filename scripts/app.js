import { animate, setPlayerState } from "./utils/animate-frames.js";
import { animationStates } from "./constant/sprite-animation-states.js";



document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas1");
  if (canvas) {
    const ctx = canvas.getContext("2d"); // Get 2D context

    const CANVAS_WIDTH = (canvas.width = 600); // Define canvas width
    const CANVAS_HEIGHT = (canvas.height = 600); // Define canvas height

    const playerImage = new Image();
    playerImage.src = "/public/images/shadow_dog.png";

    const spriteWidth = 575; // Width of one frame in the sprite sheet
    const spriteHeight = 530; // Height of one frame in the sprite sheet
    // let frameX = 0; // Initial frame index for X (horizontal)
    // let frameY = 0; // Initial frame index for Y (vertical)

    const dropdown = document.getElementById('animations');
    dropdown.addEventListener('change', function(e) { 
      setPlayerState(e.target.value);  // Update playerState using exported function
    });

    const spriteAnimations = []

    animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      }
      for (let j = 0; j < state.frames; j++)
      {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY })
      }
  
      spriteAnimations[state.name] = frames;
    })

    // Start animation once the image has loaded
    playerImage.onload = () => {
      animate(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, playerImage, { spriteWidth, spriteHeight }, spriteAnimations);
    };
  } else {
    console.error("Canvas element not found");
  }
});
