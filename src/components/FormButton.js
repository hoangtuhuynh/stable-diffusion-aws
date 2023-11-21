import React from "react";
import "./FormButton.css"

const FormButton = props => (
    <div id="button" className="row">
        <button>{props.title}</button>
    </div>
); 

export default FormButton