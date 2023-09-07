import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

function ResultsBox(title, content) {
    const handleClose = () => {
    }



    return (
        <Modal title={title} onClose={handleClose}>
            {content}

            <button onClick={handleClose}>OK</button>
        </Modal>
    );
}


export default ResultsBox;