//Initialising Canvas and it's context for operations on canvas
var canvas = document.querySelector('.DrawingPage');
var ctx = canvas.getContext("2d");


var drawingPad = document.querySelector('.DrawingPad');
var documentColorCode = document.querySelector('.DocumentColorPicker');
var fullScreen = document.querySelector('.FullScreen');
var normalScreen = document.querySelector('.NormalScreenButton');
var msgBox = document.querySelector('.MessageBox');
var colorPicker = document.querySelector('.ColorPicker');
let isSpray = false;


//Variables for Camera
var photos = document.querySelector('.photos');
var video = document.getElementById('video');
var cameraCanvas = document.getElementById('CameraCanvas');
var cameraCanvasContext = cameraCanvas.getContext("2d");

//Show Drawing Tools
function ShowDrawingTools() {

    anime({
        targets: '.DrawMenu',
        translateY: [
            // { value: -90, duration: 500 },
            { value: 0, duration: 500 },
        ]
    });

}

//Hide Drawing Tools
function HideDrawingTools() {
    anime({
        targets: '.DrawMenu',
        translateY: [
            { value: 0, duration: 500 },
            { value: -150, duration: 500 },
        ]
    });
}

//Upload Image
function ChooseFile() {

    document.getElementById("ImageUpload").click();
}

//Download Canvas as JPEG
function DownloadBoard(str) {

    // let image = canvas.toDataURL("image/jpeg", 1.0).replace("image/png", "image/octet-stream");

    let image = canvas.toDataURL("image/png", 0.1);
    let link = document.createElement('a');
    link.download = "my-image.jpg";
    link.href = image;
    link.click();

}

//Change Stroke Color
let pencilColor = `#000000`;
function ColorChangeValue(val) {
    pencilColor = `${val}`;
}

//Change Stroke width on select of type of tool
let strokeLine = '';
function ChangeStrokeWidth(val) {

    isSpray = false;
    strokeLine = val;
    eraser = 0;
}


//Eraser Variable to save val to indicate that eraser is selected
let eraser;
function EraseCanvasDrawing(val) {
    isSpray = false;
    eraser = val;
}

// Change Canvas Color
documentColorCode.addEventListener("input", () => {
    // drawingPad.style.backgroundColor = `${documentColorCode.value}`;

    ctx.fillStyle = `${documentColorCode.value}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Changing Canvas Color back to white when clearing canvas
document.querySelector('.ClearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingPad.style.backgroundColor = "white";
})


//Resize the canvas on window resize event
window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

document.querySelector(".DrawingPage").addEventListener("click", (event) => {
    getPosition(event);
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});


canvas.addEventListener('touchstart', (e) => {
    coords = getPosition(e);

    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", startPainting);
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", stopPainting);
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", sketch);
    canvas.dispatchEvent(mouseEvent);
}, false);




//Show Message Box
function ShowMessageBox() {
    drawingPad.style.opacity = "0.4";
    // msgBox.style.visibility = 'visible';

    anime({
        targets: '.MessageBox',
        translateY: [
            { value: -900, duration: 500 },
            { value: 0, duration: 500 },
        ]
    });

    anime({
        target: '.MessageBox',
        opacity: [
            { value: 0, duration: 500 },
            { value: 1, duration: 500 },
        ]
    })
}


//Close Message box
function CloseMessageBox() {
    anime({
        targets: '.MessageBox',
        translateY: [
            { value: 0, duration: 500 },
            { value: -900, duration: 500 },
        ]
    });
    drawingPad.style.opacity = "1";

    // msgBox.style.visibility = 'hidden';

}

//New Document
function NewDocument() {
    drawingPad.style.opacity = "1";

    anime({
        targets: '.MessageBox',
        translateY: [
            { value: 0, duration: 500 },
            { value: -900, duration: 500 },
        ]
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingPad.style.backgroundColor = "white";
    documentColorCode.value = '#FFFFFF';
}

//Full Screen Mode
function FullScreen() {

    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) { /* Safari */
        document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) { /* IE11 */
        document.body.msRequestFullscreen();
    }

    fullScreen.style.display = 'none';
    normalScreen.style.display = 'inline-block';
}


//Normal Screen Mode
function NormalScreen() {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }

    fullScreen.style.display = 'inline-block';
    normalScreen.style.display = 'none';
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}


//Sketch on the canvas as mouse is moved.
function sketch(event) {
    if (!paint) return;

    ctx.beginPath();


    if (isSpray) {
        ctx.lineWidth = 10;
        ctx.fillStyle = `${pencilColor}`;

        // Filling pixels around the brush radius with randomized X,Y value near it.
        for (var i = 50; i--;) {
            var radius = 20;
            var offsetX = Math.floor(Math.random() * (-radius - radius + 1)) + -radius;
            var offsetY = Math.floor(Math.random() * (-radius - radius + 1)) + -radius;
            ctx.fillRect(event.clientX + offsetX, event.clientY + offsetY, 1, 1);
        }
    } else if (eraser) {
        ctx.lineWidth = eraser;
        ctx.strokeStyle = `white`;
    }
    else {
        ctx.lineWidth = strokeLine;
        ctx.strokeStyle = `${pencilColor}`;
    }

    // Sets the end of the lines drawn
    // to a round shape.
    ctx.lineJoin = ctx.lineCap = 'round';

    // The cursor to start drawing
    // moves to this coordinate
    ctx.moveTo(coord.x, coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    if (!isSpray) {
        ctx.lineTo(coord.x, coord.y);
    }

    // Draws the line.
    ctx.stroke();

}

let coord = { x: 0, y: 0 };
let paint = false;

//Getting coordinates of mouse
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}


var localStream = 'none';
//Following Functions are for camera access
function OpenCameraCanvas() {

    anime({
        targets: '.CameraAccess',
        scaleX: [
            { value: 0, duration: 100, delay: 500 },
            { value: 1, duration: 900 },
        ]
    });

    document.querySelector('.MainMenu').style.visibility = 'hidden';

    drawingPad.style.opacity = "0.9";

    document.querySelector('.CameraAccess').style.visibility = 'visible';

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia ||
        navigator.oGetUserMedia || navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true }).then(
            function (stream) {
                localStream = stream;
                video.srcObject = localStream;
                video.play();
            }
        ).catch(function (error) {
            console.log("Something went wrong!");
        });

    }

}


// Trigger photo take
function SnapTaken() {

    // cameraCanvas.style.filter = filterVal;

    cameraCanvasContext.drawImage(video, 0, 0, 640, 480);

    //Create img from canvas
    const imgUrl = cameraCanvas.toDataURL('image/png');

    photos.setAttribute('src', imgUrl);

    // photos.style.filter = filterVal;

}


//Closing camera view and shutting down camera stream
function CloseCameraAccessView() {

    document.querySelector('.MainMenu').style.visibility = 'visible';

    drawingPad.style.opacity = "1";

    document.querySelector('.CameraAccess').style.visibility = 'hidden';
    localStream.getTracks().forEach((track) => {
        track.stop();
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        CloseCameraAccessView();
    }
})


// filters.addEventListener("change", (e) => {

//     filterVal = e.target.value;
//     video.style.filter = filterVal;

//     e.preventDefault();
// });

//Calling Snap Taken functin on Click of Snap button
document.getElementById('snap').addEventListener('click', SnapTaken);
document.querySelector('.AddSnappedImageToCanvas').addEventListener('click', () => {

    ctx.drawImage(photos, 90, 90, 350, 300);
});

//Function to read an existing Image from the system
function readURL(e) {

    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            // canvas.width = img.width;
            // canvas.height = img.height;
            ctx.drawImage(img, 90, 90, 350, 300);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.files[0]);
}


//Adding text box to the view
// function AddTextBox() {

//     console.log("HI");
//     // Create a new instace of Canvas
//     let canvasFabricText = new fabric.Canvas("DrawingPage");

//     // Create a new Textbox instance
//     let text = new fabric.Textbox('Check',
//         {
//             fontFamily: 'arial black',
//             left: 100,
//             top: 100,
//             objecttype: 'text'
//         });


//     // Render the Textbox on Canvas
//     canvasFabricText.add(text);

//     canvasFabricText = 'none';
// }


//SplashScreen function
document.addEventListener('DOMContentLoaded', (e) => {
    anime({
        targets: '.MessageBox',
        translateY: [
            { value: 0, duration: 500 },
            { value: -900, duration: 500 },
        ]
    });
    anime({
        targets: '.DrawMenu',
        translateY: [
            { value: 0, duration: 500 },
            { value: -150, duration: 500 },
        ]
    });
    setTimeout(() => {
        document.querySelector('.splash').classList.add('display-none');
    }, 4000);
});


//Function to make spray value true
document.getElementById('SprayButton').addEventListener('click', () => {
    isSpray = true;
});