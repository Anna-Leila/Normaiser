import React from "react"; // import React
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Normaliser from "./components/Normaliser";
import HomePage from "./components/HomePage";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/normaliser" element={<Normaliser />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}


export default App; // expose App function to access in other files
