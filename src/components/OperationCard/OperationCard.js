import React from "react";

const OperationCard = function({ name, duration, step, moveUp, moveDown, numOperations, handleDelete }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <h4 className="card-title">{name}</h4>
                        </div>
                        <div className="col-3">
                            {step > 1 ? <button className="btn btn-secondary" onClick={moveUp}>Move up</button> : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="card-text">Step {step}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="card-text">Duration: {duration} minutes</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <button className="btn btn-danger" onClick={handleDelete}>Delete operation</button>
                        </div>
                        <div className="col-3">
                            {step < numOperations ? <button className="btn btn-secondary" onClick={moveDown}>Move down</button> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationCard;