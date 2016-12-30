function rgb2hsl(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        h = 0,
        s = 0,
        l = (max + min) / 2;
        delta = max - min;

    if (max === min) {
        return {h: 0, s: 0, l: l.toFixed(2)};
    }

    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === r) {
        h = (g - b) / delta + (g < b ? 6 : 0);
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else if (max === b ) {
        h = (r - g) / delta + 4;
    }

    return {h: +((h * 60).toFixed(2)), s: +(s.toFixed(2)), l: +(l.toFixed(2))};
}


function hsl2rgb(h, s, l) {
    h = (h % 360 / 360);
    s = Math.min(1, Math.max(0, s));
    l = Math.min(1, Math.max(0, l));

    let temp1 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    let temp2 = l * 2 - temp1;

    function hue(h) {
        h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
        if (h * 6 < 1) {
            return temp2 + (temp1 - temp2) * h * 6;
        }
        if (h * 2 < 1) {
            return temp1;
        }
        if (h * 3 < 2) {
            return temp2 + (temp1 - temp2) * (2 / 3 - h) * 6;
        }
        return temp2;
    }

    let r = Math.round(hue(h + 1 / 3) * 255),
        g = Math.round(hue(h) * 255),
        b = Math.round(hue(h - 1 / 3) * 255);

    return {r: r, g: g, b: b};
}


function rgb2hex(r, g, b) {
    let arr = [r, g, b].map(function (c) {
        return (c < 16 ? '0' : '') + c.toString(16);
    });
    return "#" + arr.join('');
}


function hex2rgb(hex) {
    hex = hex[0] === '#' ? hex.substr(1) : hex;
    let r = hex.substr(0, 2),
        g = hex.substr(2, 2),
        b = hex.substr(4, 2);
    let rgb = [r, g, b].map(function (c) {
        return parseInt(c, 16);
    })
    return {r: rgb[0], g: rgb[1], b: rgb[2]};
}


function test() {
    // convert RGB to HSL space
    let color = '#be4c0f',
        rgb = hex2rgb(color),
        hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);

    console.log('Convert to HSL color space: ', hsl);
    // increase lightness by 15%
    hsl.l += 0.15;
    console.log('Adding 15% lightness: ', hsl);
    // convert HSL back to RGB
    rgb = hsl2rgb(hsl.h, hsl.s, hsl.l);
    console.log('Convert to RGB color space: ', rgb);
    console.log('Hex is: ', rgb2hex(rgb.r, rgb.g, rgb.b));
}


test()
