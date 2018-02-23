
var mic, fft, amp,grid;


// save this file as sketch.js
// Sketch One
var canvas1 = function( p ) { // p could be any variable name
    p.setup = function() {
        p.createCanvas(500,300);
        p.noFill();

        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT(0.99,1024);
        fft.setInput(mic);
    };

    p.draw = function() {
        p.background(55);
        //fill(255);
        p.stroke(255);



        var spectrum = fft.analyze();
        //console.log(spectrum);

        p.beginShape();
        for (i = 0; i<spectrum.length; i++) {
            p.vertex(i, p.map(spectrum[i], 0, 255, p.height, 0) );
        }
        p.endShape();
    };
};
var myp5 = new p5(canvas1, 'c1');

// Sketch Two
var t = function( p ) {
    var x = 100.0;
    var y = 100;
    var speed = 2.5;
    p.setup = function() {
        p.createCanvas(500,300);
        p.noFill();

        mic = new p5.AudioIn();
        mic.start();
        amp = new p5.Amplitude(0.99);
        amp.setInput(mic);
    };

    p.draw = function() {
        p.background(55);
        //fill(255);
        p.stroke(255);
        p.strokeWeight(2);
        var level = amp.getLevel();
        var size = p.map(level, 0, 0.1, 0, 600);
        p.ellipse(p.width/2, p.height/2, size, size);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.text(size.toFixed(0), p.width/2, p.height/2);

    };
};
var myp5 = new p5(t, 'c2');

var canvas3 = function( p ) { // p could be any variable name

    p.setup = function() {
        p.createCanvas(500,300);
        p.noFill();

        mic = new p5.AudioIn();
        mic.start();
        amp = new p5.Amplitude(0.99);
        amp.setInput(mic);
        grid = new Grid();
    };

    p.draw = function() {
        p.background(55);
        //fill(255);
        p.stroke(255);
        var level = amp.getLevel();
        grid.update(level);
        grid.display();

    };

    function Grid(){


        this.update = function(level){
            this.lineNum = p.map(level, 0, 0.1, 14, 5);
            this.spacingX = p.width/this.lineNum;
            this.spacingY = p.height/this.lineNum;
        }

        this.display = function(){

            //console.log(level);
            p.stroke(255);
            p.strokeWeight(5);
            for(var i=0; i<this.lineNum ; i++){
                p.line(this.spacingX*i, p.height, this.spacingX*i, 0 );
                //p.line(0, this.spacingY*i, p.width, this.spacingY*i)
            }

        }
    }
};

var myp5 = new p5(canvas3, 'c3');


var osc, ftt2;
// Sketch Four
var canvas4 = function( p ) {

    p.setup = function() {
        p.createCanvas(500,300);
        p.noFill();

        mic = new p5.AudioIn();
        mic.start();
        amp = new p5.Amplitude(0.99);
        amp.setInput(mic);
        osc = new p5.TriOsc(); // set frequency and type
        osc.amp(.5);

        fft2 = new p5.FFT();
        osc.start();
    };

    p.draw = function() {
        p.background(55);
        //fill(255);
        p.stroke(255);
        p.strokeWeight(2);
        var level = amp.getLevel();

        var waveform = fft2.waveform();  // analyze the waveform
        p.beginShape();
        p.strokeWeight(5);
        for (var i = 0; i < waveform.length; i++){
            var x = p.map(i, 0, waveform.length, 0, p.width);
            var y = p.map(waveform[i], -1, 1, p.height, 0);
            p.vertex(x, y);
        }
        p.endShape();

        // change oscillator frequency based on mouseX
        var freq = p.map(level, 0, 1, 40, 880);
        osc.freq(freq);
        osc.amp(amp);

    };
};
var myp5 = new p5(canvas4, 'c4');


/*

function setup() {
    createCanvas(720, 256);

    osc = new p5.TriOsc(); // set frequency and type
    osc.amp(.5);

    fft = new p5.FFT();
    osc.start();
}

function draw() {
    background(255);

    var waveform = fft.waveform();  // analyze the waveform
    beginShape();
    strokeWeight(5);
    for (var i = 0; i < waveform.length; i++){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, height, 0);
        vertex(x, y);
    }
    endShape();

    // change oscillator frequency based on mouseX
    var freq = map(mouseX, 0, width, 40, 880);
    osc.freq(freq);

    var amp = map(mouseY, 0, height, 1, .01);
    osc.amp(amp);
}

function setup() {
    var canvas1 = createCanvas(600,300);
    noFill();

    mic = new p5.AudioIn();
    mic.start();
        fft = new p5.FFT(0.99,1024);
    fft.setInput(mic);
    amp = new p5.Amplitude(0.99);
    amp.setInput(mic);
    grid = new Grid();
}

function draw() {
    background(55);
    //fill(255);
    stroke(255);
    strokeWeight(2);
    var level = amp.getLevel();
    var size = map(level, 0, 1, 0, 600);
    ellipse(width/2, height/2, size, size);

    grid.update(level);
    grid.display();


    var spectrum = fft.analyze();
    console.log(spectrum);
    beginShape();

    var index = 0;
    for (i = 0; i<spectrum.length; i++) {
        index =
        vertex(i, map(spectrum[i], 0, 255, height, 0) );
    }
    endShape();
}





function Grid(){


    this.update = function(level){
        this.lineNum = map(level, 0, 1, 14, 4);
        this.spacing = width/this.lineNum;
    }

    this.display = function(){

        //console.log(level);
        stroke(255);
        strokeWeight(2);
        for(var i=0; i<this.lineNum ; i++){
            line(this.spacing*i, height, this.spacing*i, 0 );
        }

    }
}
*/
