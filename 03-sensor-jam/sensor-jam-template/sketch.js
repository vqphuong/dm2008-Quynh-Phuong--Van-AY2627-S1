let port; // Serial Communication port
let connectBtn;
let wasOpened = false; // tracks port state to update the button label

let sensorVal;
let circleSize = 50;
let targetSize = 50; // used for Option 2

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(0);
  for (let y = 0; y < height; y += 100) {
    for (let x = 0; x < width; x += 100) {
      let column = x / 100;
      let row = y / 100;

      if ((column + row) % 2 == 0) {
        // ellipse(x + 50, y + 50, circleSize);
        fill(63, 89, 204, circleSize);
        ellipse(x + 50, y + 50, circleSize);
        noStroke();
      } if ((column % 2 == 0 && row == 0)) {
        // ellipse(x + 50, y + 50, circleSize);
        fill(63, 89, 204, circleSize);
        ellipse(x + 50, y + 50, circleSize);
        noStroke();
      } if ((column == 0 && row % 2 == 0)) {
        // ellipse(x + 50, y + 50, circleSize);
        stroke(255, 194, 248, circleSize);
        strokeWeight(circleSize / 10);
        noFill();
        ellipse(x + 50, y + 50, circleSize);
      } else {
        // ellipse(x + 50, y + 50, circleSize);
        stroke(255, 194, 248, circleSize);
        strokeWeight(circleSize / 10);
        noFill();
        ellipse(x + 50, y + 50, circleSize);
    }
  }
}

  updateConnectBtn();

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      // use float() to convert the data from string to number
      // (Arduino must send ONE number per line, e.g. Serial.println(distVal))
      let val = float(sensorVal);

      // Ignore anything that isn't a number (e.g. stray text or a partial line)
      if (!isNaN(val)) {
        // OPTION 1:
        // Update circle's size with sensor's data directly
        // Reduce delay() value in Arduino to get smoother changes
        // circleSize = val;

        // OPTION 2:
        // Update circle's size using lerp() to smoothly change values
        // This method even works with longer delay() values in Arduino

        // map distance (5-100cm) to circle size: closer = bigger
        targetSize = map(val, 5, 100, 400, 50);
        // last value in lerp() controls speed of change
        circleSize = lerp(circleSize, targetSize, 0.1);
      }
    }
  }
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClick() {
  // If port is not already open, open on click,
  // otherwise close the port
  // (the button label is updated in updateConnectBtn())
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
  } else {
    port.close();
  }
}

// Keeps the button in sync with the real port state, since opening is
// asynchronous and can fail (picker cancelled, port busy, board unplugged)
function updateConnectBtn() {
  let isOpened = port.opened();
  if (isOpened === wasOpened) return;
  wasOpened = isOpened;

  connectBtn.html(isOpened ? "Disconnect Arduino" : "Connect to Arduino");
  if (isOpened) {
    connectBtn.addClass("connected");
  } else {
    connectBtn.removeClass("connected");
  }
}
