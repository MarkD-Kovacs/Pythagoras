export function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function init_canvas() {
    canvas.width = window.innerWidth - canvas.offsetLeft;
    canvas.height = window.innerHeight - canvas.offsetTop;
}

export function angle(p1, p2) {
    let dx = p2.x - p1.x;
    let dy = p1.y - p2.y;

    if (dx == 0 && dy > 0)
        return Math.PI / 2;
    else if (dx == 0 && dy < 0)
        return -Math.PI / 2;
    else if (dy == 0 && dx > 0)
        return 0;
    else if (dy == 0 && dx < 0)
        return Math.PI * 2;
    else if (dx > 0)
        return Math.atan((p1.y - p2.y) / (p2.x - p1.x));
    else
        return Math.PI + Math.atan((p1.y - p2.y) / (p2.x - p1.x));
}
