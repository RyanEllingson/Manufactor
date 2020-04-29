import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const JobSearchForm = function({ setJobList }) {
    const { db, user } = useContext(FirebaseContext);
    const [completed, setCompleted] = useState("any");
    const [productList, setProductList] = useState([]);
    const [chosenProducts, setChosenProducts] = useState([]);
    const [chosenProductIds, setChosenProductIds] = useState([]);

    useEffect(() => {
        db.collection("users").doc(`${user.uid}`).collection("products").get()
        .then((querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(doc);
            });
            setProductList(products);
        })
        .catch((error) => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = function(items) {
        const selection = [];
        const selectionIds = [];
        for (let i=0; i<items.length; i++) {
            selection.push(items[i].value)
            selectionIds.push(items[i].id);
        }
        setChosenProducts(selection);
        setChosenProductIds(selectionIds);
        console.log(selection);
        console.log(selectionIds);
    }

    const handleSubmit = function(event) {
        event.preventDefault();
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
                            <div className="form-group">
                                <label>Select products</label>
                                <select multiple={true} className="form-control" value={chosenProducts} onChange={(e)=>{handleSelect(e.target.selectedOptions)}}>
                                    {productList.map((product)=>{
                                        return <option key={product.id} id={product.id} value={product.data().name}>{product.data().name}</option>
                                    })}
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
            </form>
        </div>
    );
};

export default JobSearchForm;