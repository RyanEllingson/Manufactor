import React from "react";
import moment from "moment";

const JobCard = function({ id, productName, dueDate, completed, handleClick }) {
    const jobDueDate = moment(dueDate);

    return (
        <li className="list-group-item">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <p className="card-text">{id}</p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">{productName}</p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">{jobDueDate.fromNow()}</p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">{completed ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-success" onClick={handleClick}>View details</button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default JobCard;