import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import moment from "moment";

const JobForm = function({ productId, productName, handleBack, operations }) {
    const [customer, setCustomer] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [dateError, setDateError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, db } = useContext(FirebaseContext);

    const handleSubmit = function(event) {
        event.preventDefault();
        const dueDate = moment(year + "-" + month + "-" + day + "T08");
        console.log(dueDate);
        if (!dueDate._isValid) {
            setDateError(true);
        } else {
            setDateError(false);
            setDay("");
            setMonth("");
            setYear("");
            db.collection("users").doc(`${user.uid}`).collection("jobs").add({
                productId: productId,
                productName: productName,
                operations: operations,
                customer: customer,
                dueDate: dueDate._i,
                started: false,
                completed: false,
                activeStep: 0
            }).then(()=> {
                const myTimeout = setTimeout(() => {
                    setSuccess(false);
                    clearTimeout(myTimeout);
                }, 5000);
                setSuccess(true);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <>
        <div className="row mb-1">
            <div className="col-12">
                <button className="btn btn-info" onClick={handleBack}>Back to Products</button>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <h5 className="card-header text-center">Add a Job for product {productName}</h5>
                    <div className="card-body container">
                        <div className="row">
                            <div className="col-12">
                                <h6 className="card-title">Enter the customer for this job</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={customer} onChange={(e) => setCustomer(e.target.value)} aria-label="Customer name" aria-describedby="button-addon2"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h6 className="card-title">Enter the due date</h6>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                <label>MM</label>
                                <input type="text" className="form-control" value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Due date month"/>
                            </div>
                            <div className="col-4">
                                <label>DD</label>
                                <input type="text" className="form-control" value={day} onChange={(e) => setDay(e.target.value)} aria-label="Due date month"/>
                            </div>
                            <div className="col-4">
                                <label>YYYY</label>
                                <input type="text" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Due date year"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                {dateError ? <small className="form-text text-muted">Please enter a valid date</small> : ""}
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-12">
                                <button className="btn btn-outline-secondary" type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {success ? <small className="form-text text-muted">Job successfully created!</small> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default JobForm;