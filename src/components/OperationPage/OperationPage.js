import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import OperationForm from "../OperationForm";
import OperationCard from "../OperationCard";

const OperationPage = function({ productId, productName, handleBack }) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const { db, user } = useContext(FirebaseContext);
    const [operations, setOperations] = useState([]);

    const renderOperations = function() {
        db.collection("users").doc(`${user.uid}`).collection("products").doc(`${productId}`).get()
        .then((querySnapshot) => {
            setOperations(querySnapshot.data().operations);
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        renderOperations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addOperation = function(event) {
        event.preventDefault();
        const newOperation = {
            name: name,
            duration: duration
        }
        const tempOperations = [...operations];
        tempOperations.push(newOperation);
        db.collection("users").doc(`${user.uid}`).collection("products").doc(`${productId}`).set({
            operations: tempOperations
        }, { merge: true })
        .then(() => {
            console.log("Operations successfully written");
            renderOperations();
        }).catch((error) => {
            console.error(error);
        })
    };

    const moveUp = function(startIndex) {
        const tempOperations = [...operations];
        const movedOperation = tempOperations.splice(startIndex, 1);
        tempOperations.splice(startIndex - 1, 0, movedOperation[0]);
        db.collection("users").doc(`${user.uid}`).collection("products").doc(`${productId}`).set({
            operations: tempOperations
        }, { merge: true })
        .then(() => {
            renderOperations();
        }).catch((error) => {
            console.error(error);
        });
    };

    const moveDown = function(startIndex) {
        const tempOperations = [...operations];
        const movedOperation = tempOperations.splice(startIndex, 1);
        tempOperations.splice(startIndex + 1, 0, movedOperation[0]);
        db.collection("users").doc(`${user.uid}`).collection("products").doc(`${productId}`).set({
            operations: tempOperations
        }, { merge: true })
        .then(() => {
            renderOperations();
        }).catch((error) => {
            console.error(error);
        });
    }

    const deleteOperation = function(index) {
        const tempOperations = [...operations];
        tempOperations.splice(index, 1);
        db.collection("users").doc(`${user.uid}`).collection("products").doc(`${productId}`).set({
            operations: tempOperations
        }, { merge: true })
        .then(() => {
            renderOperations();
        }).catch((error) => {
            console.error(error);
        });
    }

    const operationList = operations.map((operation) => {
        return <OperationCard
            name={operation.name}
            duration={operation.duration}
            key={operations.indexOf(operation)}
            step={operations.indexOf(operation)+1}
            moveUp={()=>{moveUp(operations.indexOf(operation))}}
            moveDown={()=>{moveDown(operations.indexOf(operation))}}
            numOperations={operations.length}
            handleDelete={()=>{deleteOperation(operations.indexOf(operation))}}
        />
    });

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <button className="btn btn-info" onClick={handleBack}>Back to Products</button>
                </div>
                <div className="col-9">
                    <h3>{productName} Operations</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <OperationForm name={name} setName={setName} duration={duration} setDuration={setDuration} handleSubmit={(e)=>addOperation(e)}/>
                </div>
                <div className="col-8">
                    {operationList}
                </div>
            </div>
        </>
    );
}

export default OperationPage;