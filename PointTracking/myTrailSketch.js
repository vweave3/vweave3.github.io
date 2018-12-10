var cnv;
var capture;
var curpyr, prevpyr, pointCount, pointStatus, prevxy, curxy;
var w = 640,
    h = 480;
var maxPoints = 1000;

var trace = [];

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    cnv = createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    curpyr = new jsfeat.pyramid_t(3);
    prevpyr = new jsfeat.pyramid_t(3);
    curpyr.allocate(w, h, jsfeat.U8C1_t);
    prevpyr.allocate(w, h, jsfeat.U8C1_t);

    pointCount = 0;
    pointStatus = new Uint8Array(maxPoints);
    prevxy = new Float32Array(maxPoints * 2);
    curxy = new Float32Array(maxPoints * 2);

}

function mousePressed() {
    addPoint(mouseX, mouseY);
}

function addPoint(x, y) {
    if (pointCount < maxPoints) {
        var pointIndex = pointCount * 2;
        curxy[pointIndex] = x;
        curxy[pointIndex + 1] = y;
        pointCount++;
    }
}

function draw() {
    image(capture, 0, 0, w, h);
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        var xyswap = prevxy;
        prevxy = curxy;
        curxy = xyswap;
        var pyrswap = prevpyr;
        prevpyr = curpyr;
        curpyr = pyrswap;

        // these are options worth breaking out and exploring
        var winSize = 100; // 20
        var maxIterations = 100; // 30
        var epsilon = 0.1; //0.01
        var minEigen = 0.001;

        jsfeat.imgproc.grayscale(capture.pixels, w, h, curpyr.data[0]);
        curpyr.build(curpyr.data[0], true);
        jsfeat.optical_flow_lk.track(
            prevpyr, curpyr,
            prevxy, curxy,
            pointCount,
            winSize, maxIterations,
            pointStatus,
            epsilon, minEigen);
        // prunePoints();
 //       ellipse(pmouseX, pmouseY, 10, 10);

        for (var i = 0; i < pointCount; i++) {
            var pointOffset = i * 2;
            ellipse(curxy[pointOffset], curxy[pointOffset + 1], 20, 20); // 8,8 size
           // if (curxy[pointOffset] >= curxy[pointOffset] + 1){
           //  for (var b = 0; b < trace.length; b++){

           //      }
           //  }

        }
    }
}


