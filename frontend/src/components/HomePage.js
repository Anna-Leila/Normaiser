import {Link} from "react-router-dom";
import "./homepage.css";

function HomePage() {
    document.body.style.backgroundColor = "rgba(100,255,117,0.7)"

    return <>
        <div id="homepage">
            <div className="pretty-heading">Normaiser</div>
            <p className="info-text">The application helps you calm down, increases concentration and attention. A couple of minutes for a good result!</p>
            <p className="info-text">You are asked to pull the rose along the spiral towards the center. If the center of the rose deviates significantly from the line, the attempt will be considered failed. If you stop before reaching the end, the attempt will also be considered failed. If you complete the entire spiral successfully, you will receive an approximate estimate of your condition depending on the speed in different sections of the spiral.</p>
            <p className="info-text">Good luck!</p>
            <Link to="/normaliser" className="btn btn-primary">Start</Link>
        </div>
    </>
}

export default HomePage;