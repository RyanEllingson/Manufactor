import React from "react";

const JobOpCard = function({ name, index, activeStep, started, handleStart }) {
    return (
        <li className={(index === activeStep && started) ? "list-group-item list-group-item-success" : "list-group-item"}>
            <div className="container">
                <div className="row">
                    <div className="col-10 my-auto">
                        <span>{name}</span>
                    </div>
                    <div className="col-2">
                        {(index === 0 && !started) ? <button className="btn btn-success my-auto" onClick={(e) => handleStart(e)}>Start</button> : ""}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default JobOpCard;