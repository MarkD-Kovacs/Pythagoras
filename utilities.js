export function dist(point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

export function init_canvas() {
    canvas.width = window.innerWidth - canvas.offsetLeft;
    canvas.height = window.innerHeight - canvas.offsetTop;
}

