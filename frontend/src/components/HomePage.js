import {Link, useNavigate} from "react-router-dom";

function HomePage() {
    //const navigate = useNavigate();

    return <>
        <h1>Home page here!</h1>
        <Link to="/normaliser" className="btn btn-primary">Get to norm!</Link>
        {/*<button onClick={() => navigate("/normaliser")}>Get to norm!</button>*/}
    </>
}

export default HomePage;