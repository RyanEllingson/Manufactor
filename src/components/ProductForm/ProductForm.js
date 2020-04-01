import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const ProductForm = function() {
    const [name, setName] = useState("");
    const { db, user } = useContext(FirebaseContext);

    const changeHandler = function(value) {
        setName(value);
    }

    const clickHandler = function(event) {
        event.preventDefault();
        db.collection("users").doc(`${user.uid}`).collection("products").add({
            name: name
        }).then(function(docRef) {
            console.log("Document successfully created with ID " + docRef.id);
            setName("");
        }).catch(function(error) {
            console.error(error);
        });
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <h5 className="card-header text-center">Add a Product</h5>
                    <div className="card-body">
                        <h5 className="card-title">Enter the name of the product</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={name} onChange={(e) => changeHandler(e.target.value)} aria-label="New product name" aria-describedby="button-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" onClick={(e)=>clickHandler(e)} id="button-addon2">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ProductForm;