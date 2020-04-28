import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import JobCard from "../JobCard";
import JobDetails from "../JobDetails";

const JobContainer = function() {
    const { db, user } = useContext(FirebaseContext);
    const [jobList, setJobList] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [jobId, setJobId] = useState("");

    const renderJobs = function() {
        db.collection("users").doc(`${user.uid}`).collection("jobs").get().then((querySnapshot) => {
            const jobs = [];
            querySnapshot.forEach((doc) => {
                jobs.push(doc);
            });
            setJobList(jobs);
        });
    }

    const viewJobDetails = function(event, id) {
        event.preventDefault();
        setJobId(id);
        setViewDetails(true);
    }

    const handleBack = function() {
        setViewDetails(false);
    };

    const jobCardList = jobList.map((job) => {
        return <JobCard
            key={job.id}
            id={job.id}
            productName={job.data().productName}
            dueDate={job.data().dueDate}
            complete={job.data().complete}
            handleClick={(e)=>{viewJobDetails(e, job.id)}}
        />
    });

    useEffect(() => {
        renderJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {viewDetails ? <JobDetails handleBack={handleBack} jobId={jobId} /> :
            <div className="card">
                <div className="card-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <p className="card-text">Job ID</p>
                            </div>
                            <div className="col-3">
                                <p className="card-text">Product</p>
                            </div>
                            <div className="col-2">
                                <p className="card-text">Due:</p>
                            </div>
                            <div className="col-2">
                                <p className="card-text">Complete?</p>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {jobCardList}
                </ul>
            </div>}
        </>
    );
}

export default JobContainer;