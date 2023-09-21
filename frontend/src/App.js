import React from "react"; // import React from react module
import {Routes, Route, BrowserRouter} from 'react-router-dom'; // import navigation classes
import Normaliser from "./components/Normaliser"; // import Normaiser component
import HomePage from "./components/HomePage"; // import HomePage component

// functional component App
function App() {
    // return navigation in the app
    return (
        <React.Fragment> {/* return multiple elements */}
            <BrowserRouter> {/* set up routing */}
                <Routes> {/* set up route paths and elements they lead to */}
                    <Route path="/" element={<HomePage />} /> {/* home page link and its code element */}
                    <Route path="/normaliser" element={<Normaliser />} /> {/* normaiser link and its code element */}
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}


export default App; // expose App function to access in other files
