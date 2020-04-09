import React from "react";
import moment from "moment";

const ProductCard = function({ name, handleDelete, viewOperations, operations }) {
    const totalDuration = moment.duration(0);
    for (let i=0; i<operations.length; i++) {
        const opDuration = parseInt(operations[i].duration);
        totalDuration.add(opDuration, "minutes");
    }

    const durationStr = "Total production time: " + totalDuration.hours() + (totalDuration.hours() === 1 ? " hour, " : " hours, ") + totalDuration.minutes() + (totalDuration.minutes() === 1 ? " minute" : " minutes");

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{durationStr}</p>
                <button className="btn btn-success mb-1" onClick={viewOperations}>View operations</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete product</button>
            </div>
        </div>
    );
}

export default ProductCard;