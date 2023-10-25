const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/circle', function(req, res, next) {
    const svg = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
    `;
    res.send(svg);
});

router.get('/rect', function(req, res, next) {
    const svg = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
    `;
    res.send(svg);
});

router.get('/line', function(req, res, next) {
    const svg = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="10" x2="90" y2="90" stroke="green" stroke-width="4" />
        </svg>
    `;
    res.send(svg);
});

router.get('/', function (req, res) {
   const width = 1200;
   const height = 900;
   const cells = 300;
   const xyrange = 30.0;
    const xyscale = width / 2 / xyrange;
    const zscale = height * 0.4;
    const angle = Math.PI / 6;
    let sin30 = Math.sin(angle);
    let cos30 = Math.cos(angle);
    const svgStart = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
        polygon {
            stroke: black;
            stroke-width: 1;
            fill: white;
        }
        </style>
    `;
    const svgEnd = `
        </svg>
    `;

    const f = (x, y) => {
        const r = Math.hypot(x, y);
        return Math.sin(r) / r;
    }
    const corner = (i, j) => {
        let x = xyrange * ((i / cells) - 0.5);
        let y = xyrange * ((j / cells) - 0.5);
        let z = f(x, y);
        let sx = width / 2 + (x - y) * cos30 * xyscale;
        let sy = height / 2 + (x + y) * sin30 * xyscale - z * zscale;
        return [sx, sy];
    }

    const main = () => {
        let svg = svgStart;
        for (let i = 0; i < cells; i++) {
            for (let j = 0; j < cells; j++) {
                let [x, y] = corner(i, j);
                svg += `<polygon points="${x},${y} ${x+1},${y} ${x+1},${y+1} ${x},${y+1}" />`;
            }
        }
        svg += svgEnd;
        return svg;
    }

    res.send(main());
});

module.exports = router;
