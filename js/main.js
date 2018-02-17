

d3.csv("data/sound_data2.csv", function(data){


    // Analyze the dataset in the web console
    changeNumber(data);
    window.data = data;

    console.log(data);
    init();
    animate();
});

function changeNumber(data){
    var counttime = 0;
    var countfreq = 0;
    data.forEach(function(element){
        //var parseTime = d3.timeParse("%Y-%m-%d");
        //element[0] = +element[0];

        element["frequency"] =+element["frequency"];
        counttime+=1;
        countfreq = 0;
        for (var i = 0; i < 14.9; i=i+0.1) {
            countfreq +=1;




            element[i.toFixed(1)] = + element[i.toFixed(1)];

            //console.log(i.toFixed(1));

        }



        // element.date = parseTime(element.date)
    });
    console.log(counttime);
    console.log(countfreq);

}



var SEPARATION = 100, AMOUNTX = 146, AMOUNTY = 150;

var container, stats;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial( {

        color: 0xffffff,
        program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.fill();

        }

    } );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Sprite( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );

        }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        var ixx = (ix+count)%AMOUNTX;
        //console.log (ixx);

        for ( var iy = 0; iy < 14.9; iy+=0.1 ) {

            particle = particles[ i++ ];
            //particle.position.y = ( Math.sin( ( ix  ) * 0.3 ) * 50 ) + ( Math.sin( ( iy  ) * 0.5 ) * 50 );
            //onsole.log(( Math.sin( ( ix  ) * 0.3 ) * 50 ) + ( Math.sin( ( iy  ) * 0.5 ) * 50 ));
            //console.log(iy.toFixed(1).toString());
            //console.log(100*window.data[ix][iy.toFixed(1).toString()]);
            //console.log (ixx);


            particle.position.y = 100*window.data[(ixx)][iy.toFixed(1).toString()];
            particle.scale.x = particle.scale.y =10;

        }

    }

    renderer.render( scene, camera );

    count += 1;

}

/*
function render() {

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i++ ];

            particle.position.y = 100*window.data[ix][iy.toFixed(1).toString()];
            particle.scale.x = particle.scale.y = 10;

        }

    }

    renderer.render( scene, camera );

    count += 0.1;

}

*/

