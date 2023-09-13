import {Link} from "react-router-dom";
import "./homepage.css";

function HomePage() {
    document.body.style.backgroundColor = "rgba(100,255,117,0.7)"

    return <>
        <div id="homepage">
            <div className="pretty-heading">Normaiser</div>
            <Link to="/normaliser" className="btn btn-primary">Get to norm!</Link>
        </div>
    </>
}

export default HomePage;