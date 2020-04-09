import React from "react";

const OperationCard = function({ name, duration }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">Duration: {duration} minutes</p>
            </div>
        </div>
    );
};

export default OperationCard;