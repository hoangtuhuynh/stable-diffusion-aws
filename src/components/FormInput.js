import React from "react";
import "./FormInput.css"

const FormInput = props => (
    <div className="row">
        <label>{props.description}</label>
        <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
    </div>  
);

export default FormInput