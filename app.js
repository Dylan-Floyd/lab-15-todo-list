// import functions and grab DOM elements
let canvas = document.getElementById('bg-canvas');
let context = canvas.getContext('2d');
let offset = 0;
let reverse = false;

setInterval(drawBG, 50);


function drawBG() {
    offset += 2;
    let grd = context.createLinearGradient(0 + offset, 0 + offset, 170 + offset, 170 + offset);
    grd.addColorStop(reverse ? 0 : 1, 'rgb(200, 25, 200');
    grd.addColorStop(reverse ? 1 : 0, 'rgb(150, 25, 250');
    //grd.addColorStop(2, 'rgb(200, 25, 200');

    context.fillStyle = grd;
    context.fillRect(0, 0, 200, 200);

    if (offset >= 200) {
        offset = -200;
        reverse = !reverse;
    }
}

// initialize global state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
