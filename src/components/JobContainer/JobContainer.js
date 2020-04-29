import React, { useState } from "react";
import JobCard from "../JobCard";
import JobDetails from "../JobDetails";
import JobSearchForm from "../JobSearchForm";

const JobContainer = function() {
    const [jobList, setJobList] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [jobId, setJobId] = useState("");

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

    return (
        <>
            {viewDetails ? <JobDetails handleBack={handleBack} jobId={jobId} /> :
            <>
                <JobSearchForm setJobList={setJobList}/>
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
                </div>
            </>}
        </>
    );
}

export default JobContainer;