import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const JobSearchForm = function({ setJobList }) {
    const { db, user } = useContext(FirebaseContext);
    const [completed, setCompleted] = useState("any");
    const [productList, setProductList] = useState([]);
    const [operationList, setOperationList] = useState([]);
    const [chosenProducts, setChosenProducts] = useState([]);
    const [chosenProductIds, setChosenProductIds] = useState([]);
    const [chosenOperations, setChosenOperations] = useState([]);
    const [chosenOperationIds, setChosenOperationIds] = useState([]);
    const [productsError, setProductsError] = useState(false);
    const [operationsError, setOperationsError] = useState(false);

    useEffect(() => {
        db.collection("users").doc(`${user.uid}`).collection("products").get()
        .then((querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(doc);
            });
            setProductList(products);
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
        })
        .catch((error) => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectProducts = function(items) {
        const selection = [];
        const selectionIds = [];
        for (let i=0; i<items.length; i++) {
            selection.push(items[i].value)
            selectionIds.push(items[i].id);
        }
        setChosenProducts(selection);
        setChosenProductIds(selectionIds);
    }

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
        if (chosenProducts.length < 1) {
            setProductsError(true);
        } else if (chosenOperations.length < 1) {
            setProductsError(false);
            setOperationsError(true);
        } else {
            setProductsError(false);
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
            const productsQuery = completedQuery.where("productId", "in", chosenProductIds);
            productsQuery.get().then((querySnapshot) => {
                const jobs = [];
                querySnapshot.forEach((doc) => {
                    if (chosenOperationIds.includes(doc.data().activeStepId)) {
                        jobs.push(doc);
                    }
                });
                setJobList(jobs);
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
                        <div className="col-4">
                            <div className="form-group">
                                <label>Completed?</label>
                                <select className="form-control" value={completed} onChange={(e)=>{setCompleted(e.target.value)}}>
                                    <option value="any">any</option>
                                    <option value="completed">completed</option>
                                    <option value="not completed">not completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Select products</label>
                                        <select multiple={true} className="form-control" value={chosenProducts} onChange={(e)=>{handleSelectProducts(e.target.selectedOptions)}}>
                                            {productList.map((product)=>{
                                                return <option key={product.id} id={product.id} value={product.data().name}>{product.data().name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {productsError ? <small className="form-text text-muted">Please select at least one product</small> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
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