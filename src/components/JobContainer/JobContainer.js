import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import JobCard from "../JobCard";

const JobContainer = function() {
    const { db, user } = useContext(FirebaseContext);
    const [jobList, setJobList] = useState([]);

    const renderJobs = function() {
        db.collection("users").doc(`${user.uid}`).collection("jobs").get().then((querySnapshot) => {
            const jobs = [];
            querySnapshot.forEach((doc) => {
                jobs.push(doc);
            });
            setJobList(jobs);
        });
    }

    const jobCardList = jobList.map((job) => {
        return <JobCard
            key={job.id}
            id={job.id}
            productName={job.data().productName}
            dueDate={job.data().dueDate}
            complete={job.data().complete}
        />
    });

    useEffect(() => {
        renderJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                {jobCardList}
            </ul>
        </div>
    );
}

export default JobContainer;