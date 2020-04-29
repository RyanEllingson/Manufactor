import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const JobSearchForm = function({ setJobList }) {
    const { db, user } = useContext(FirebaseContext);
    const [completed, setCompleted] = useState("any");

    const handleSubmit = function(event) {
        event.preventDefault();
        const jobsRef = db.collection("users").doc(`${user.uid}`).collection("jobs");
        let query;
        switch (completed) {
            case "any":
                query = jobsRef;
                break;
            case "completed":
                query = jobsRef.where("completed", "==", true);
                break;
            case "not completed":
                query = jobsRef.where("completed", "==", false);
                break;
            default:
                break;
        }
        query.get().then((querySnapshot) => {
            const jobs = [];
            querySnapshot.forEach((doc) => {
                jobs.push(doc);
            });
            setJobList(jobs);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className="card mb-3">
            <div className="card-header text-center">
                Search for Jobs
            </div>
            <form>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label>Completed?</label>
                                <select className="form-control" value={completed} onChange={(e)=>{setCompleted(e.target.value)}}>
                                    <option value="any">any</option>
                                    <option value="completed">completed</option>
                                    <option value="not completed">not completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
                        </div>
                    </div>
                </div>
                
                {/* <div class="form-group">
                    <label for="exampleFormControlSelect2">Example multiple select</label>
                    <select multiple class="form-control" id="exampleFormControlSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div> */}
                
            </form>
        </div>
    );
};

export default JobSearchForm;