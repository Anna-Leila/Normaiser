import {Link, useNavigate} from "react-router-dom";

function HomePage() {
    return <>
        <h1>Home page here!</h1>
        <Link to="/normaliser" className="btn btn-primary">Get to norm!</Link>
    </>
}

export default HomePage;