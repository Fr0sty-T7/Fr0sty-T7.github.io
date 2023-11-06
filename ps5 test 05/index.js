let controllerIndex = null;

window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  controllerIndex = gamepad.index;
  console.log("connected");
});
window.addEventListener("gamepaddisconnected", (event) => {
  controllerIndex = null;
  console.log("disconnected");
});
function handleButtons(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonElement = document.getElementById(`controller-b${i}`);
    const selectedButtonClass = "pressed";
    let trrigerLeft = document.querySelector(".triggers .left");
    let trrigerRight = document.querySelector(".triggers .right");
    if (buttonElement) {
      if (button.value > 0) {
        buttonElement.classList.add(selectedButtonClass);
        if (buttons[6].value > 0) {
          trrigerLeft.style.opacity = `${button.value * 100}%`;
        }
        if (buttons[7].value > 0) {
          trrigerRight.style.opacity = `${button.value * 100}%`;
        }
      } else {
        buttonElement.classList.remove(selectedButtonClass);
        if (buttons[6].value <= 0) {
          trrigerLeft.style.opacity = `0%`;
        }
        if (buttons[7].value <= 0) {
          trrigerRight.style.opacity = `0%`;
        }
      }
    }
  }
}
function updateStick(elementId, leftRightAxis, upDownAxis) {
  const multiplier = 25;
  const stickLeftRight = leftRightAxis * multiplier;
  const stickUpDown = upDownAxis * multiplier;
  const stick = document.getElementById(elementId);
  const x = Number(stick.dataset.originalXPosition);
  const y = Number(stick.dataset.originalYPosition);
  stick.style.top = `${y + stickUpDown}px`;
  stick.style.left = `${x + stickLeftRight}px`;
}
function handleSticks(axes) {
  updateStick("controller-b10", axes[0], axes[1]);
  updateStick("controller-b11", axes[2], axes[3]);
}
function gameLoop() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    handleButtons(gamepad.buttons);
    handleSticks(gamepad.axes);
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
