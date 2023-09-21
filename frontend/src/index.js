import React from 'react'; // import react from react module
import ReactDOM from 'react-dom/client'; // import ReactDOM to be able to render components and elements on the web
import './index.css'; // import file with css, that is used in any part of the app
import App from './App'; // import App component
import reportWebVitals from './reportWebVitals'; // performance measuring metrics


const root = ReactDOM.createRoot(document.getElementById('root')); // get root element form index.html
root.render( // put into root element the following elements
    <React.StrictMode> {/* highlight potential bugs */}
        <App /> {/* create App component */}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // no measuring performance of the app at this stage
