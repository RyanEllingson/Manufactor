import React from "react";

const JobCard = function({ id, productName, dueDate, complete }) {
    return (
        <li className="list-group-item">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <p className="card-text">Job ID: {id}</p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">Product: {productName}</p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">Due date: {dueDate}</p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">Complete? {complete ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default JobCard;