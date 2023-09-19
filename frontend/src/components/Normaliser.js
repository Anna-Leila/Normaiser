import React, {useEffect, useRef, useState} from 'react'; // import React from react module
import {Stage, Layer, Line, Image} from 'react-konva'; // import classes from react-konva library
import useImage from "use-image"; // import custom React hook for loading images
import {useNavigate} from "react-router-dom"; // import React hook for navigating between pages
import Modal from "react-modal"; // import modal component for popup message window
import './normaliser.css'; // import file with css for this component


// function component App
function Normaliser() {
    document.body.style.backgroundColor = "white"; // set body background to white

    const navigate = useNavigate(); // save useNavigate method in a constant

    // true if the current "calming session" is NOT finished, and false if finished
    // (programmatically we can reach the end of the spiral several times - both on drag and on stop of drag)
    const notFinished = useRef(true);

    const [draggable, setDraggable] = useState(true); // state of image is draggable or not

    const [modalIsOpen, setIsOpen] = useState(false); // state of message box open or not
    const [modalMessage, setModalMessage] = useState(""); // message in the message box
    const [messageColor, setMessageColor] = useState('#0610d7'); // color of message in the message box

    // index of the current section (0 on the center end, grows LARGER to the outer end)
    const sectionIndex = useRef(lastSectionIndex);
    const speedArray = useRef([]); // array of speeds for each section
    const distance = useRef(0); // distance passed from beginning of the section

    const [rose] = useImage("/images/rose.png"); // get rose image from public folder

    const firstRender = useRef(true); // mark first render with true
    const w = useRef(window.innerWidth), h = useRef(window.innerHeight); // window width and height at first render
    const width = w.current, height = h.current; // get screen width and height
    calculatePoints(width, height, firstRender); // get spiral points' coordinates for screen of this size


    const canvas = document.createElement('canvas'); // create canvas element
    const ctx = canvas.getContext('2d'); // get 2d drawing context on the canvas
    // create gradient from top left corner to bottom right corner
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0.30, '#57f54c'); // add a green color stop
    gradient.addColorStop(0.70, '#1325ed'); // add a blue color stop


    const index = useRef(lastIndex); // index of the current closest point - initially equal to the index of the last point
    // (index is 0 on the center end, grows LARGER to the outer end)

    const startingImagePositionX = points[lastIndex * 2]; // !starting position of the CENTER of the movable image on x-axis
    const startingImagePositionY = points[lastIndex * 2 + 1] + halfImageHeight; // !starting position of the CENTER of the movable image on y-axis

    // position of image center on X axis - initially equal to the starting position on X axis
    const imagePositionX = useRef(startingImagePositionX);
    // position of image center on Y axis - initially equal to the starting position on Y axis
    const imagePositionY = useRef(startingImagePositionY);

    const distanceToClosestPoint = useRef(halfImageHeight); // set initial distance from image center to closest (first) point

    const currentTime = useRef(Date.now()); // current time, initialised with starting time


    function updateClosestPoint(x, y) { // update the index of the point, closest to center of the image
        while (index.current>0) { // while there are points, "unchecked for closeness", left
            let closestPointX = points[index.current * 2]; // get x of current closest point
            let closestPointY = points[index.current * 2 + 1]; // get y of current closest point
            let diffX = Math.abs(x - closestPointX); // get distance by X between center of the image and current point
            let diffY = Math.abs(y - closestPointY); // get distance by Y between center of the image and current point
            // calculate distance between center of the image and current point
            distanceToClosestPoint.current = Math.sqrt(diffX * diffX + diffY * diffY);


            let nextPointX = points[(index.current - 1) * 2]; // get x of the next point
            let nextPointY = points[(index.current - 1) * 2 + 1]; // get y of the next point
            let nextDiffX = Math.abs(x - nextPointX); // get distance by X between center of the image and next point
            let nextDiffY = Math.abs(y - nextPointY); // get distance by Y between center of the image and next point
            // get distance between center of the image and next point
            let distanceToNextPoint = Math.sqrt(nextDiffX * nextDiffX + nextDiffY * nextDiffY);

            if (distanceToNextPoint < distanceToClosestPoint.current) { // if next point is closer to image than current point
                index.current -= 1; // update current point index
                distanceToClosestPoint.current = distanceToNextPoint; // update distance to current point
            } else { // if current point is the closest point
                break; // then stop updating
            }
        }
    }

    // function to check if we went out of bounds - if the center of the image is too far from the current point
    // it can be too far from the line or too far back on the line
    function checkIfOutOfBounds() {
        // if center of the image is not on the spiral yet, but we went too far from the start
        if (index.current===lastIndex && distanceToClosestPoint.current > startBoundsDistance && notFinished.current) {
            showOutputMessage(outOfBounds); // show correct output message - random message from backend database
        }

        // we already are on the spiral
        // and closest point is father than allowed, and we haven't finished "playing" yet
        if (index.current!==lastIndex && distanceToClosestPoint.current > boundsDistance && notFinished.current) {
            showOutputMessage(outOfBounds); // show correct output message - random message from backend database
        }
    }

    // function to check if we successfully went through the spiral
    function checkIfFinished() {
        // if we reached the center of the spiral, and we haven't finished "playing" yet
        if (index.current < endOfLine && notFinished.current) {
            showOutputMessage(success); // show correct output message - random message from backend database
        }
    }

    // get speed at the movement interval
    function getSpeed(time) {
        // calculate time interval between previous point and current point
        const timeInterval = time - currentTime.current; // time interval of the image movement in milliseconds

        const speed = distance.current/ timeInterval; // calculate speed at this interval
        if (speed !== 0) { // if speed isn't zero
            speedArray.current.push(speed); // add current speed to the array of all speeds
        }
    }

    // check if we passed a whole section,
    // and if we did, calculate speed on that section and mark the start of a new section
    function checkDistance(time) {
        // if user just passed into new section
        if (index.current < sectionIndex.current * sectionSize) {
            // if we didn't pass the last section (before spiral start) or the first section (in the center)
            if (sectionIndex.current !== lastSectionIndex && sectionIndex.current !== 0) {
                getSpeed(time); // get speed on this section
            }
            currentTime.current = time; // update current time
            distance.current = 0; // update interval distance
            sectionIndex.current--; // move to the next section
        }
    }

    // update position of image center, update distance from section start to current point
    function updatePosDist(x, y) {
        const distanceX = Math.abs(imagePositionX.current - x); // get distance (in pixels) on X axis
        const distanceY = Math.abs(imagePositionY.current - y); // get distance (in pixels) on Y axis

        // calculate distance between previous image position and current image position
        const pointsDist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        distance.current+= pointsDist; // update distance from section start to current point

        imagePositionX.current = x; // update position of image center on X axis
        imagePositionY.current = y; // update position of image center on Y axis
    }


    const onStartDrag = (e) => { // when user starts dragging image
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateAndCheck(x, y, time);
    }

    const onDragPicture = (e) => { // when user is dragging
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateAndCheck(x, y, time);
        checkIfFinished(); // check if we reached the center end of the spiral
    }

    const onStopDrag = (e) => { // when user stops dragging image
        // get coordinates of the center of the image
        let x = e.target.x() + halfImageWidth, y = e.target.y() + halfImageHeight;
        const time = Date.now(); // current time in milliseconds

        updateAndCheck(x, y, time);

        if (index.current >= endOfLine) { // if we HAVEN'T reached the center (end) of the spiral
            // random message from array of messages for when the user hasn't reached the end of the line
            showOutputMessage(notEndOfTheLine); // show correct output message - random message from backend database
        } else {
            checkIfFinished(); // check if we're finished "playing"
        }
    }

    // update and check current situation
    const updateAndCheck = (x, y, time) => {
        updatePosDist(x, y); // update image position and passed distance
        updateClosestPoint(x, y); // update the point closest to the center of the image

        checkIfButterflyReached(); // check if we reached a butterfly
        checkDistance(time); // check if section was passed

        checkIfOutOfBounds(); // check if we left the allowed area
    }

    // asynchronous function for getting message value from backend database and then displaying it in modal
    async function showOutputMessage(requestType) {
        // api address we need to reach
        const apiAddress = "http://localhost:8080/messages/getByType?type=" + requestType;
        stopProcesses(); // stop moving the picture across the screen

        let myText = ""; // text for modal message
        // await for fetching data and showing message
        await fetch(apiAddress)
            .then((response) => response.text()) // get text message of the api response
            .then((text) => { // show message on screen
                myText = text.toString(); // convert to string
                myText = myText.split("+").join('\n'); // replace + by new line symbol \n
            });

        if (requestType === success) { // if the ending type is success
            myText += "\n"; // new line
            myText += assessCondition(); // add condition assessment
            setMessageColor('#ff9a00'); // set different color to final message
        }

        setModalMessage(myText); // set message in the modal window
        //openModal(); // display modal window
    }

    // when modal message is updated
    useEffect(() => {
        if (modalMessage !== "") { // if modal message is NOT empty
            openModal(); // open modal window
        }
        }, [modalMessage] // function is called at the start and when modal message is updated
    );
    
    function stopProcesses() { // stop moving the picture across the screen, set session to finished
        setDraggable(false); // set image to NOT draggable
        notFinished.current = false; // set current "playing" session as finished
    }

    function assessCondition() { // asses the user's psychological condition
        let sumSpeed = 0; // summa of all speeds
        let maxSpeed = 0; // maximum speed in the array
        let minSpeed = 10000000.0; // minimum speed in the array
        speedArray.current.forEach((speed) => { // for every speed in the array
            sumSpeed += speed; // add the speed to sum
            maxSpeed = Math.max(maxSpeed, speed); // update maximum speed
            minSpeed = Math.min(minSpeed, speed); // update minimum speed
        });
        const averageSpeed = sumSpeed / speedArray.current.length; // calculate average speed in the array

        if (minSpeed >= averageSpeed / 1.2 && maxSpeed <= averageSpeed * 1.2) { // first boundaries of min and max percentage
            return "Good condition"; // condition assessment
        } else if (minSpeed >= averageSpeed / 1.5 && maxSpeed <= averageSpeed * 1.5) { // second boundaries of min and max percentage
            return "Satisfactory condition"; // condition assessment
        } else { // third boundaries of min and max percentage
            return "Excited condition"; // condition assessment
        }
    }

    function openModal() { // show user the message
        console.log(modalMessage);
        setIsOpen(true); // open the message box
    }

    function closeModal() { // close the message window
        setIsOpen(false); // close the message box
        navigate("/"); // go to home page
    }


    const [butterfly] = useImage("/images/butterfly.png"); // get butterfly image from public folder
    const initialStates = []; // array of initial states of showing butterfly images
    const butterflyIndexes = []; // indexes of points among spiral points at which butterfly images are positioned
    for (let i=0; i<numberOfButterflies; i++) { // for every butterfly image
        initialStates.push(true); // initially every butterfly is shown on the screen

        // place butterflies on every quarter of the last (outermost) circle
        const pointIndex = lastIndex - (pointsPerCircle/4 * (i + 1));
        butterflyIndexes.push(pointIndex); // add index of butterfly position
    }
    const [show, setShow] = useState(initialStates); // which butterflies we show and which we don't

    let butterflies = []; // array of butterflies
    for (let i=0; i<numberOfButterflies; i++) { // for every butterfly image
        const id = "butterfly" + i; // id of butterfly
        const pointIndex = butterflyIndexes[i]; // index of point on the spiral

        // butterfly itself
        const butterflyImage = <Image
            key={id} // individual key
            name={id} // name of element
            id={id} // id of this element

            visible={show[i]} // if visible or not - in the state array

            x={points[pointIndex * 2] - halfBWidth} // starting X position on screen
            y={points[pointIndex * 2 + 1] - halfBHeight} // starting Y position on screen

            width={butterflyWidth} // width of image
            height={butterflyHeight} // height of image

            image={butterfly} // butterfly image
        ></Image>

        butterflies.push(butterflyImage); // add this butterfly element to array of butterflies
    }

    // function to check whether center of movable image reached and passed a center of one of the butterfly images
    function checkIfButterflyReached() {
        for (let i=0; i<numberOfButterflies; i++) { // for every butterfly
            // if the butterfly is visible and the user passed its center
            if (show[i] === true && index.current <= butterflyIndexes[i]) {
                hideButterfly(i); // hide this butterfly image
            }
        }
    }

    const hideButterfly = (id) => { // hide butterfly with this index
        const newShow = [...show]; // copy state array of showing butterflies
        newShow[id] = false; // set butterfly with this index as hidden
        setShow(newShow); // set new state of showing butterflies
    }


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

                        onDragStart={onStartDrag} // function on starting the dragging motion
                        onDragMove={onDragPicture} // function on the move of the image
                        onDragEnd={onStopDrag} // function on finishing the dragging motion

                        onMouseEnter={e => { // when mouse hovers over movable image
                            const container = e.target.getStage().container(); // stage container
                            container.style.cursor = "pointer"; // set cursor style
                        }}

                        onMouseLeave={e => { // when mouse leaves movable image area
                            const container = e.target.getStage().container(); // stage container
                            container.style.cursor = "default"; // set cursor style
                        }}
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

                    {/* add butterflies */}
                    {butterflies.map((butterfly) => (butterfly))}
                </Layer>
            </Stage>

            <div id="message-div"> {/* message showing */}
                <Modal class="message-box" // modal dialog component, IMPORTANT to use class and NOT className
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
                               top: '50%', // set box upper border to 50% height of the window
                               left: '50%', // set box left border to 50% width of the window
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
                    <div className="modal-message">{modalMessage}</div> {/* message to display */}

                    <div className="text-center modal-button"> {/* center the button */}
                        {/* button for submitting information and closing the page */}
                        <button type="submit" className="btn btn-sm" onClick={closeModal}>OK</button>

                    </div>
                </Modal>
            </div>
        </React.Fragment>
    );
}


// if this is the first render, then calculate points of the spiral - find the biggest spiral that fits into the screen
function calculatePoints(width, height, firstRender) {
    if (firstRender.current === false) { // if this isn't the first render
        return; // stop
    } else { // otherwise
        firstRender.current = false; // set first render variable to false
    }

    let centerX = width/2, centerY = height/2; // calculate center of the screen

    for (let increment = 3; increment > 0; increment -= 0.01) { // find largest possible increment for radius
        points = []; // clear array of points of the spiral
        let fits = true; // boolean variable to check if spiral fits into the screen
        let radius = 0; // radius - distance from center of the spiral to current point
        let angle = 0; // angle

        for (let p = 0; p < pointsPerCircle * numberOfCircles; p++) { // fixed number of points for every circle
            radius += increment; // calculate radius for this point (first point at the center)

            // angle of turn - make a complete circle every 100 iterations
            angle += (Math.PI * 2) / pointsPerCircle;

            // new point
            const x = centerX + radius * Math.cos(angle); // x coordinate = center + distance from center on x-axis
            const y = centerY + radius * Math.sin(angle); // y coordinate = center + distance from center on y-axis

            // if point doesn't fit into the screen
            if (x<=2 + halfBWidth               // 2 + 15 (for butterfly) pixels reserved on the right
                || x>=width - (5 + halfImageWidth)  // 5 + 30 (for the movable picture) pixels reserved on the right
                || y<=2 + halfBHeight             // 2 + 15 (for butterfly) pixels reserved on the top
                || y>=height - (2 + halfBHeight))     // 2 + 15 (for butterfly) pixels reserved on the bottom
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

let points = []; // point of the spiral (both x and y for every point)
const numberOfCircles = 4; // number of circles in the spiral
const pointsPerCircle = 100; // number of points for every circle of the spiral
const numberOfButterflies = 3; // number of butterfly images to display

// types of API requests
const outOfBounds = "Out of bounds"; // for when user went out of bounds
const notEndOfTheLine = "Not end of the line"; // for when user haven't reached the end of the line
const success = "Success"; // for when user successfully passed the spiral

// max allowed "step away" distance from current point on the line
const boundsDistance = 20;

// max allowed "step away" distance from first point on the line
const startBoundsDistance = 40;

const endOfLine = 10; // the number of point at the center of the spiral that are considered its end

const imageWidth = 60, imageHeight = 60; // define width and height of the movable image
const halfImageWidth = imageWidth / 2, halfImageHeight = imageHeight / 2; // calculate center of the image

const butterflyWidth = 30, butterflyHeight = 30; // define width and height of the movable image
const halfBWidth = butterflyWidth / 2, halfBHeight = butterflyHeight / 2; // half of butterfly image width and height

const sectionSize = pointsPerCircle / 4;  // size of the section in circle point -  currently a quarter of a circle is a section
const lastSectionIndex = numberOfCircles * 4; // index of the last section (part before spiral starts)
const lastIndex = (pointsPerCircle * numberOfCircles) - 1; // index of last point

export default Normaliser; // expose App function to access in other files
