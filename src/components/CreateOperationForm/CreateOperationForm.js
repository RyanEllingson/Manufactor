import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const CreateOperationForm = function() {
    const { user, db } = useContext(FirebaseContext);
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);

    const clickHandler = function(event) {
        event.preventDefault();
        db.collection("users").doc(`${user.uid}`).collection("operations").add({
            name: name
        }).then(function() {
            setName("");
            const myTimeout = setTimeout(() => {
                setSuccess(false);
                clearTimeout(myTimeout);
            }, 5000);
            setSuccess(true);
        }).catch(function(error) {
            console.error(error);
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <h5 className="card-header text-center">Create an Operation</h5>
                    <div className="card-body container">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="card-title">Enter the name of the operation</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} aria-label="New operation name" aria-describedby="button-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="submit" onClick={(e)=>clickHandler(e)} id="button-addon2">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {success ? <small className="form-text text-muted">Operation successfully created!</small> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOperationForm;