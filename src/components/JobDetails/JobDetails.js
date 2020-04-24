import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import moment from "moment";

const JobDetails = function({ handleBack, jobId }) {
    const { user, db } = useContext(FirebaseContext);
    const [currentJob, setCurrentJob] = useState(null);
    const [dueDate, setDueDate] = useState(null);

    useEffect(() => {
        db.collection("users").doc(`${user.uid}`).collection("jobs").doc(`${jobId}`).get()
        .then((querySnapshot) => {
            setDueDate(moment(querySnapshot.data().dueDate));
            setCurrentJob(querySnapshot);
        }).catch((error) => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="row mb-1">
                <div className="col-12">
                    <button className="btn btn-info" onClick={handleBack}>Back to Jobs</button>
                </div>
            </div>
            {currentJob ? <div className="row text-center">
                <div className="col-12">
                    <div className="card">
                        <h5 className="card-header">Job ID: {currentJob.id}</h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <p className="card-text">Product: {currentJob.data().productName}</p>
                                    <p className="card-text">Due date: {dueDate.format("dddd, MMMM Do YYYY")}</p>
                                    <p className="card-text">Customer: {currentJob.data().customer}</p>
                                </div>
                                <div className="col-6">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : ""}
        </div>
    );
}

export default JobDetails;