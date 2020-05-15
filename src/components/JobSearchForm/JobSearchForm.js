import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const JobSearchForm = function({ setJobList, setModifiedJobList }) {
    const { db, user } = useContext(FirebaseContext);
    const [completed, setCompleted] = useState("any");
    const [operationList, setOperationList] = useState([]);
    const [chosenOperations, setChosenOperations] = useState([]);
    const [chosenOperationIds, setChosenOperationIds] = useState([]);
    const [operationsError, setOperationsError] = useState(false);

    useEffect(() => {
        db.collection("users").doc(`${user.uid}`).collection("operations").get()
        .then((querySnapshot) => {
            const operations = [];
            querySnapshot.forEach((doc) => {
                operations.push(doc);
            });
            setOperationList(operations);
        }).catch((error) => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    const handleSelectOperations = function(items) {
        const selection = [];
        const selectionIds = [];
        for (let i=0; i<items.length; i++) {
            selection.push(items[i].value);
            selectionIds.push(items[i].id);
        }
        setChosenOperations(selection);
        setChosenOperationIds(selectionIds);
    }

    const handleSubmit = function(event) {
        event.preventDefault();
        if (chosenOperations.length < 1) {
            setOperationsError(true);
        } else {
            setOperationsError(false);
            const jobsRef = db.collection("users").doc(`${user.uid}`).collection("jobs");
            let completedQuery;
            switch (completed) {
                case "any":
                    completedQuery = jobsRef;
                    break;
                case "completed":
                    completedQuery = jobsRef.where("completed", "==", true);
                    break;
                case "not completed":
                    completedQuery = jobsRef.where("completed", "==", false);
                    break;
                default:
                    break;
            }
            const operationsQuery = completedQuery.where("activeStepId", "in", chosenOperationIds);
            operationsQuery.get().then((querySnapshot) => {
                const jobs = [];
                querySnapshot.forEach((doc) => {
                    jobs.push(doc);
                });
                setJobList(jobs);
                // setModifiedJobList(jobs);
            }).catch((error) => {
                console.error(error);
            })
        }
    }

    return (
        <div className="card mb-3">
            <div className="card-header text-center">
                Search for Jobs
            </div>
            <form>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Completed?</label>
                                <select className="form-control" value={completed} onChange={(e)=>{setCompleted(e.target.value)}}>
                                    <option value="any">any</option>
                                    <option value="completed">completed</option>
                                    <option value="not completed">not completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Select operations</label>
                                        <select multiple={true} className="form-control" value={chosenOperations} onChange={(e)=>{handleSelectOperations(e.target.selectedOptions)}}>
                                            {operationList.map((operation)=>{
                                                return <option key={operation.id} id={operation.id} value={operation.data().name}>{operation.data().name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {operationsError ? <small className="form-text text-muted">Please select at least one operation</small> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default JobSearchForm;