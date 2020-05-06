import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import JobOpCard from "../JobOpCard";
import moment from "moment";

const JobDetails = function({ handleBack, jobId }) {
    const { user, db } = useContext(FirebaseContext);
    const [currentJob, setCurrentJob] = useState(null);
    const [operations, setOperations] = useState([]);

    const renderJob = function() {
        db.collection("users").doc(`${user.uid}`).collection("jobs").doc(`${jobId}`).get()
        .then((querySnapshot) => {
            setCurrentJob(querySnapshot);
            setOperations(querySnapshot.data().operations);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        renderJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startJob = function(event) {
        event.preventDefault();
        Object.assign(operations[0], {started: true});
        db.collection("users").doc(`${user.uid}`).collection("jobs").doc(`${jobId}`).set({
            started: true,
            operations: operations,
            activeStepName: operations[0].name,
            activeStepId: operations[0].opId
        }, { merge: true })
        .then(renderJob())
        .catch((error) => {
            console.error(error);
        });
    };

    const completeStep = function(event, index) {
        event.preventDefault();
        Object.assign(operations[index], {completed: true});
        Object.assign(operations[index + 1], {started: true});
        db.collection("users").doc(`${user.uid}`).collection("jobs").doc(`${jobId}`).set({
            operations: operations,
            activeStep: index + 1,
            activeStepName: operations[index+1].name,
            activeStepId: operations[index+1].opId
        }, { merge: true })
        .then(renderJob())
        .catch((error) => {
            console.error(error);
        });
    };

    const completeJob = function(event) {
        event.preventDefault();
        Object.assign(operations[operations.length - 1], {completed: true});
        db.collection("users").doc(`${user.uid}`).collection("jobs").doc(`${jobId}`).set({
            operations: operations,
            completed: true,
            activeStep: -1,
            activeStepName: "n/a",
            activeStepId: "n/a"
        }, { merge: true })
        .then(renderJob())
        .catch((error) => {
            console.error(error);
        });
    }

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
                                <div className="col-4">
                                    <p className="card-text">Product: {currentJob.data().productName}</p>
                                    <p className="card-text">Due date: {moment(currentJob.data().dueDate).format("dddd, MMMM Do YYYY")}</p>
                                    <p className="card-text">Customer: {currentJob.data().customer}</p>
                                    {currentJob.data().completed ? <p className="card-text font-weight-bold">Job Complete!</p> : ""}
                                </div>
                                <div className="col-8">
                                    <div className="card">
                                        <div className="card-header">
                                            Operations
                                        </div>
                                        <ul className="list-group list-group-flush text-left">
                                            {operations.map((operation) => {
                                                return <JobOpCard
                                                    name={operation.name}
                                                    key={operations.indexOf(operation)}
                                                    index={operations.indexOf(operation)}
                                                    activeStep={currentJob.data().activeStep}
                                                    started={currentJob.data().started}
                                                    handleStart={startJob}
                                                    length={operations.length}
                                                    handleCompleteStep={completeStep}
                                                    handleCompleteJob={completeJob}
                                                />
                                            })}
                                        </ul>
                                    </div>
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