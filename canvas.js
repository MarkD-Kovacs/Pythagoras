import { dist, init_canvas } from './utilities.js';

// get canvas and context
const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

// set canvas dimensions
addEventListener('resize', function() {
    init_canvas();
});
init_canvas();

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        c.fillRect(this.x, this.y, 5, 5);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    rotate_around_origin(origin) {
        let x = this.x - origin.x;
        let y = origin.y - this.y;
        this.x = origin.x + y;
        this.y = origin.y + x;
    }
}

class Triangle {

    static list = [];
    static selected = undefined;
    static reference = undefined;

    constructor(point1, point2, point3) {
        this.p1 = point1;
        this.p2 = point2;
        this.p3 = point3;
        Triangle.list.push(this);
    }

    draw() {
        c.beginPath();
        c.moveTo(this.p1.x, this.p1.y);
        c.lineTo(this.p2.x, this.p2.y);
        c.lineTo(this.p3.x, this.p3.y);
        c.lineTo(this.p1.x, this.p1.y);
        c.strokeStyle = "gray";
        c.stroke();
        c.fillStyle = "#84bfa6";
        c.fill();
        c.closePath();
    }

    move(dx, dy) {
        this.p1.move(dx, dy);
        this.p2.move(dx, dy);
        this.p3.move(dx, dy);
    }

    move_to(point) {
        let g = {
            x: (this.p1.x + this.p2.x + this.p3.x) / 3,
            y: (this.p1.y + this.p2.y + this.p3.y) / 3
        };
        this.move(point.x - g.x, point.y - g.y);
    }

    rotate() {
        let center = this.center();
        // rotate each point
        this.p1.rotate_around_origin(center);
        this.p2.rotate_around_origin(center);
        this.p3.rotate_around_origin(center);
    }

    area() {
        return Math.abs(this.p1.x * (this.p2.y - this.p3.y) + this.p2.x * (this.p3.y - this.p1.y) + this.p3.x * (this.p1.y - this.p2.y)) / 2;
    }

    center() {
        let center = {
            x: (this.p1.x + this.p2.x + this.p3.x) / 3,
            y: (this.p1.y + this.p2.y + this.p3.y) / 3}
        return center;
    }

    static area(p1, p2, p3) {
        return Math.abs(p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
    }

    static select(point) {
        for (let t of Triangle.list) {
            let area1 = t.area();
            let area2 = Triangle.area(t.p1, t.p2, point) + Triangle.area(t.p1, t.p3, point) + Triangle.area(t.p2, t.p3, point);
            if (Math.abs(area1 - area2) < 1) {
                Triangle.selected = t;
                return;
            }
        }
    }
}


// mouse
let mouse = {x: undefined, y: undefined};
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;

    if (Triangle.selected) {
        Triangle.selected.move_to(mouse);
    }
});

canvas.addEventListener('mousedown', function(event) { 
    Triangle.select(mouse);
    if (event.button == 2)  {
        Triangle.selected.rotate();
    }
});

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

canvas.addEventListener('mouseup', function() {
    Triangle.selected = undefined;
});

let pa = new Point(100, 100);
let pb = new Point(100, 300);
let pc = new Point(200, 300);
let t1 = new Triangle(pa, pb, pc);

let pd = new Point(250, 100);
let pe = new Point(250, 300);
let pf = new Point(350, 300);
let t2 = new Triangle(pd, pe, pf);

let pg = new Point(400, 100);
let ph = new Point(400, 300);
let pi = new Point(500, 300);
let t3 = new Triangle(pg, ph, pi);

let pj = new Point(550, 100);
let pk = new Point(550, 300);
let pl = new Point(650, 300);
let t4 = new Triangle(pj, pk, pl);

let pm = new Point(700, 100);
let pn = new Point(700, 300);
let po = new Point(800, 300);
let t5 = new Triangle(pm, pn, po);

let pp = new Point(850, 100);
let pq = new Point(850, 300);
let pr = new Point(950, 300);
let t6 = new Triangle(pp, pq, pr);

let ps = new Point(1000, 100);
let pt = new Point(1000, 300);
let pu = new Point(1100, 300);
let t7 = new Triangle(ps, pt, pu);

let pv = new Point(1150, 100);
let pw = new Point(1150, 300);
let px = new Point(1250, 300);
let t8 = new Triangle(pv, pw, px);

function draw_square(x, y, l) {
    c.beginPath();
    c.rect(x, y, l, l);
    c.fillStyle = "#edddaf";
    c.fillRect(x, y, l, l);
    c.strokeStyle = "black";
    c.stroke();
}

// animation function
function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    draw_square(200, 400, 300);
    draw_square(800, 400, 300);

    for (let t of Triangle.list)
        t.draw();

    requestAnimationFrame(animate);
}
animate();





