import React from "react";

const JobOpCard = function({ name, index, activeStep, started, handleStart, length, handleCompleteStep, handleCompleteJob }) {
    return (
        <li className={(index === activeStep && started) ? "list-group-item list-group-item-success" : "list-group-item"}>
            <div className="container">
                <div className="row">
                    <div className="col-9 my-auto">
                        <span>{name}</span>
                    </div>
                    <div className="col-3">
                        {(index === 0 && !started) ? <button className="btn btn-success" onClick={(e) => handleStart(e)}>Start Job</button> : ""}
                        {(index === activeStep && started && !(activeStep === length - 1)) ? <button className="btn btn-secondary" onClick={(e)=>handleCompleteStep(e, index)}>Complete Step</button> : ""}
                        {index === activeStep && started && (activeStep === length - 1) ? <button className="btn btn-primary" onClick={(e)=>{handleCompleteJob(e)}}>Complete Job</button> : ""}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default JobOpCard;