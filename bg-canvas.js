//Renders a pretty two color gradient that scrolls across the screen;
let canvas = document.getElementById('bg-canvas');
let context = canvas.getContext('2d');
let offset = 0;
let reverse = false;

setInterval(drawBG, 50);


function drawBG() {
    offset += 2;
    let gradient = context.createLinearGradient(0 + offset, 0 + offset, 170 + offset, 170 + offset);
    gradient.addColorStop(reverse ? 0 : 1, 'rgb(200, 25, 200');
    gradient.addColorStop(reverse ? 1 : 0, 'rgb(150, 25, 250');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 200, 200);

    if (offset >= 200) {
        offset = -200;
        reverse = !reverse;
    }
}