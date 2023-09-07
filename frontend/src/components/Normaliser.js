import React, {useState} from 'react'; // import React from react module
import {Stage, Layer, Line, Image} from 'react-konva'; // import classes from react-konva library
import useImage from "use-image"; // import custom React hook for loading images
import {useNavigate} from "react-router-dom"; // import React hook for navigating between pages
import Modal from "react-modal"; // import modal component for popup message window
//import './normaliser.css'; // import file with css for this component



// function component App
function Normaliser() {
    const width = window.innerWidth, height = window.innerHeight; // get screen width and height

    const navigate = useNavigate(); // save useNavigate method in a constant

    // true if the current "calming session" is NOT finished, and false if finished
    // (programmatically we can reach the end of the spiral several times - both on drag and on stop of drag)
    let notFinished = true;

    const [draggable, setDraggable] = useState(true); // state of image is draggable or not

    const [modalIsOpen, setIsOpen] = useState(false); // state of message box open or not
    const [modalMessage, setModalMessage] = useState(""); // message in the message box
    const [messageColor, setMessageColor] = useState('#0610d7'); // color of message in the message box

    // max allowed "step away" distance from current point on the line
    const boundsDistance = 20;

    // max allowed "step away" distance from first point on the line
    const startBoundsDistance = 40;

    const endOfLine = 10; // the number of point at the center of the spiral that are considered its end
    let distance = 0; // distance that the user has passed



    calculatePoints(width, height); // get spiral points' coordinates for screen of this size

    const canvas = document.createElement('canvas'); // create canvas element
    const ctx = canvas.getContext('2d'); // get 2d drawing context on the canvas

    // create gradient from top left corner to bottom right corner
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0.30, '#57f54c'); // add a green color stop
    gradient.addColorStop(0.70, '#1325ed'); // add a blue color stop


    const [rose] = useImage("/images/rose.png"); // get rose image from public folder
    const imageWidth = 60, imageHeight = 60; // define image width and height
    const halfImageWidth = imageWidth / 2, halfImageHeight = imageHeight / 2; // calculate center of the image


    const lastIndex = (pointsPerCircle * numberOfCircles) - 1; // index of last point
    let index = lastIndex; // index of the current closest point - initially equal to the index of the last point
    const startingImagePositionX = points[index * 2]; // !starting position of the CENTER of the image on x-axis
    const startingImagePositionY = points[index * 2 + 1] + halfImageHeight; // !starting position of the CENTER of the image on y-axis

    let distanceToClosestPoint = halfImageHeight; // set initial distance from image center to closest (first) point

    // position of image center on X axis - initially equal to the starting position on X axis
    let imagePositionX = startingImagePositionX;
    // position of image center on Y axis - initially equal to the starting position on Y axis
    let imagePositionY = startingImagePositionY;


    function updateClosestPoint(x, y) { // update the index of the point, closest to center of the image
        while (index>0) { // while there are points, "unchecked for closeness", left
            let closestPointX = points[index * 2]; // get x of current closest point
            let closestPointY = points[index * 2 + 1]; // get y of current closest point
            let diffX = Math.abs(x - closestPointX); // get distance by X between center of the image and current point
            let diffY = Math.abs(y - closestPointY); // get distance by Y between center of the image and current point
            // calculate distance between center of the image and current point
            distanceToClosestPoint = Math.sqrt(diffX * diffX + diffY * diffY);


            let nextPointX = points[(index - 1) * 2]; // get x of the next point
            let nextPointY = points[(index - 1) * 2 + 1]; // get y of the next point
            let nextDiffX = Math.abs(x - nextPointX); // get distance by X between center of the image and next point
            let nextDiffY = Math.abs(y - nextPointY); // get distance by Y between center of the image and next point
            // get distance between center of the image and next point
            let distanceToNextPoint = Math.sqrt(nextDiffX * nextDiffX + nextDiffY * nextDiffY);

            if (distanceToNextPoint < distanceToClosestPoint) { // if next point is closer to image than current point
                index -= 1; // update current point index
                distanceToClosestPoint = distanceToNextPoint; // update distance to current point
            } else { // if current point is the closest point
                break; // then stop updating
            }
        }
    }

    // function to check if we went out of bounds - if the center of the image is too far from the current point
    // it can be too far from the line or too far back on the line
    function checkIfOutOfBounds() {
        // if center of the image is not on the spiral yet, but we went too far from the start
        if (index===lastIndex && distanceToClosestPoint > startBoundsDistance && notFinished) {
            openModal("Out of bounds"); // finish "playing" with warning message
        }

        // we already are on the spiral
        // and closest point is father than allowed, and we haven't finished "playing" yet
        if (index!==lastIndex && distanceToClosestPoint > boundsDistance && notFinished) {
            const message = <h6>{outOfBounds[randomNumberInRange(0, outOfBounds.length - 1)]}</h6>
            openModal(message); // finish "playing" with warning message
        }
    }

    // function to check if we successfully went through the spiral
    function checkIfFinished() {
        // if we reached the center of the spiral, and we haven't finished "playing" yet
        if (index < endOfLine && notFinished) {
            setMessageColor('#ffba3a'); // set color to final message
            const message = <h5>{success[randomNumberInRange(0, success.length - 1)]}</h5>
            openModal(message); // finish "playing" with success message
        }
    }

    // get speed at the movement interval
    function getSpeed(x, y, time) {
        const distanceX = Math.abs(imagePositionX - x); // get distance (in pixels) on X axis
        const distanceY = Math.abs(imagePositionY - y); // get distance (in pixels) on Y axis

        // calculate distance between previous point and current point
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // calculate time interval between previous point and current point
        const timeInterval = time - currentTime; // time interval of the image movement in milliseconds

        // calculate speed at this interval
        const speed = distance / timeInterval;
        console.log(speed, distance, timeInterval);

        imagePositionX = x; // update position of image center on X axis
        imagePositionY = y; // update position of image center on Y axis
        currentTime = time; // update current time
    }


    const startDrag = (e) => { // when user starts dragging image
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateClosestPoint(x, y); // update the point closest to the center of the image

        checkIfOutOfBounds(); // check if we left the allowed area
        getSpeed(x, y, time); // get current speed of the image movement
    }

    const dragPicture = (e) => { // when user is dragging
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateClosestPoint(x, y); // update the point closest to the center of the image

        checkIfOutOfBounds(); // check if we left the allowed area
        getSpeed(x, y, time); // get current speed of the image movement

        checkIfFinished(); // check if we reached the center (end) of the spiral
    }

    const stopDrag = (e) => { // wen user stops dragging image
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateClosestPoint(x, y); // update the point closest to the center of the image

        checkIfOutOfBounds(); // check if we left the allowed area\
        getSpeed(x, y, time); // get current speed of the image movement

        if (index >= endOfLine) { // if we HAVEN'T reached the center (end) of the spiral
            // random message from array of messages for when the user hasn't reached the end of the line
            const message = <h6>{notEndOfTheLine[randomNumberInRange(0, notEndOfTheLine.length - 1)]}</h6>
            openModal(message); // finish "playing" with warning message
        } else {
            checkIfFinished(); // check if we're finished "playing"
        }
    }

    const randomNumberInRange = (min, max) => { // generate random number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() // Math.random() - a random number in the range from 0 to less than 1
            * (max - min + 1)) + min; // calculate for between min and max
    };

    function openModal(message) { // stop current processes and open message box
        setDraggable(false); // set image to NOT draggable
        notFinished = false; // set current "playing" session as finished
        setModalMessage(message); // set new message into the message window

        setIsOpen(true); // open the message box
    }

    function closeModal() { // close the message window
        setIsOpen(false); // close the message box
        navigate("/"); // go to home page
    }

    let currentTime = Date.now(); // current time, initialised with starting time

    // return component
    return (
        <React.Fragment> {/* put into react fragment, because we add components in a list */}
            {/* a stage that can contain multiple layers */}
            <Stage width={window.innerWidth} height={window.innerHeight} id="canvas">
                {/* a layer for containing elements */}
                <Layer>
                    {/* image - here rose image that should be dragged along a spiral to its center */}
                    <Image
                        name="rose" // name of element
                        id="rose" // id of this element
                        x={startingImagePositionX - halfImageWidth} // starting X position on screen
                        y={startingImagePositionY - halfImageHeight} // starting Y position on screen

                        width={imageWidth} // width of image
                        height={imageHeight} // height of image

                        image={rose} // the image to load

                        draggable={draggable} // if image is draggable or not

                        onDragStart={startDrag} // function on starting the dragging motion
                        onDragMove={dragPicture} // function on the move of the image
                        onDragEnd={stopDrag} // function on finishing the dragging motion

                    />

                    {/* line - a spiral at the center of the screen */}
                    <Line
                        name="spiral" // name of element
                        id="spiral" // if of this element
                        x={0} // position of X of upper left corner on screen
                        y={0} // position of Y of upper left corner on screen
                        points={points} // point of the spiral in the form [x1, y1, x2, y2 ...]
                        tension={0} // straight lines, without curving
                        strokeWidth={10} // line width
                        stroke={gradient} // line color
                    />
                </Layer>
            </Stage>

            <div id="message-div"> {/* message showing */}
                <Modal class="message-box" // modal dialog component
                       isOpen={modalIsOpen} // is this window open or not
                       onClose={closeModal} // when closing the box
                       contentLabel="Message box" // content label for user accessibility
                       // app element to which we link the modal
                       appElement={document.getElementById("message-div")}
                       // css styling
                       style={{
                           overlay: { // overlay of the page, except modal window
                               backgroundColor: 'rgba(100,178,255,0.75)' // overlay color
                           },
                           content: { // content of the modal
                               // window is positioned in the center of the screen
                               top: '50%', // set box upper border to 50% width of the window
                               left: '50%', // set box left border to 50% height of the window
                               right: 'auto', // right border is auto-calculated
                               bottom: 'auto', // left border is out-calculated

                               // move the box up by 50% of its height and to the left by 50% of its width
                               // so that the center of the box is at the center of the screen
                               transform: 'translate(-50%, -50%)',
                               border: '2px solid #000000', // border color and thickness
                               background: '#fadff9', // background color
                               color: messageColor, // dynamic setting of message color
                           }
                       }}
                >
                    {modalMessage} {/* message to display */}

                    <div className="text-center"> {/* center the button */}
                        {/* button for submitting information and closing the page */}
                        <button type="submit" className="btn btn-sm" onClick={closeModal}>OK</button>

                    </div>
                </Modal>
            </div>
        </React.Fragment>
    );
}

// calculate points of the spiral - find the biggest spiral that fits into the screen
function calculatePoints(width, height) {
    let centerX = width/2, centerY = height/2; // calculate center of the screen

    for (let increment = 3; increment > 0; increment -= 0.01) { // find largest possible increment for radius
        points = []; // clear array of points of the spiral
        let fits = true; // boolean variable to check if spiral fits into the screen
        let radius = 0; // radius - distance from center of the spiral to current point
        let angle = 0; // angle

        for (let p = 0; p < pointsPerCircle * numberOfCircles; p++) { // fixed number of points for every circle
            radius += increment; // calculate radius for this point

            // angle of turn - make a complete circle every 100 iterations
            angle += (Math.PI * 2) / pointsPerCircle;

            // new point
            const x = centerX + radius * Math.cos(angle); // x coordinate = center + distance from center on x-axis
            const y = centerY + radius * Math.sin(angle); // y coordinate = center + distance from center on y-axis

            // if point doesn't fit into the screen
            if (x<=15                // 15 pixels reserved on the right
                || x>=width-15 - 30  // 15 + 30 (for the picture) pixels reserved on the right
                || y<=15             // 15 pixels reserved on the top
                || y>=height-15)     // 15 pixels reserved on the bottom
            {
                fits = false; // mark fits (into the screen) as false
                break; // stop calculating points
            }
            points.push(x, y); // add new point to array
        }
        if (fits) { // if spiral fits into the screen
            break; // stop calculating new spirals
        }
    }
}

let points = []; // point of the spiral
const numberOfCircles = 4; // number of circles in the spiral
const pointsPerCircle = 100; // number of points for every circle of the spiral

const outOfBounds = ["You went out of bounds. Please, calm down and try again",
    "You went out of bounds. Breath in and relax",
    "You went out of bounds. Count to 10 and try again",
    "You went out of bounds. Take your time and relax",
    "You went out of bounds. Pause, relax, continue",
    "You went out of bounds. Take a breath and everything will be ok",
    "You went out of bounds. Take your time, have a rest"];
const notEndOfTheLine = ["You haven't reached the end of the line. Please, calm down and try again",
    "You haven't reached the end of the line. Breath in and relax",
    "You haven't reached the end of the line. Count to 10 and try again.",
    "You haven't reached the end of the line. Take your time and relax",
    "You haven't reached the end of the line. Pause, relax, continue",
    "You haven't reached the end of the line. Take a breath and everything will be ok",
    "You haven't reached the end of the line. Take your time, have a rest"];
const success = ["Congratulations!",
    "Amazing work!",
    "Good job! Now smile!"];


export default Normaliser; // expose App function to access in other files