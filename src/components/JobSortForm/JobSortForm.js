import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import moment from "moment";

const JobSortForm = function({ jobList, modifiedJobList, setModifiedJobList }) {
    const { user, db } = useContext(FirebaseContext);
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
        }).catch((error) => {
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
    };

    const filterByProduct = function(event) {
        event.preventDefault();
        const jobs = [];
        modifiedJobList.forEach((job) => {
            console.log(job.id);
            if (chosenProductIds.includes(job.data().productId)) {
                jobs.push(job);
            }
        });
        setModifiedJobList(jobs);
        console.log(chosenProductIds);
    };

    const swap = function(array, index1, index2) {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    };

    const sortByProduct = function(event) {
        event.preventDefault();
        const tempArray = [...modifiedJobList];
        for (let i=0; i<tempArray.length - 1; i++) {
            for (let j=i; j<tempArray.length; j++) {
                if (tempArray[i].data().productName < tempArray[j].data().productName) {
                    console.log("swapping elements " + i + " and " + j);
                    swap(tempArray, i, j);
                }
            }
        }
        setModifiedJobList(tempArray);
    };

    const sortByDate = function(event) {
        event.preventDefault();
        const tempArray = [...modifiedJobList];
        for (let i=0; i<tempArray.length - 1; i++) {
            for (let j=i; j<tempArray.length; j++) {
                const dueDate1 = moment(tempArray[i].data().dueDate);
                const dueDate2 = moment(tempArray[j].data().dueDate);
                if (dueDate1 > dueDate2) {
                    swap(tempArray, i, j);
                }
            }
        }
        setModifiedJobList(tempArray);
    }

    const restoreJobList = function(event) {
        event.preventDefault();
        setModifiedJobList(jobList);
    }

    return (
        <div className="card mb-3">
            <div className="card-header text-center">
                Sort and Filter Jobs
            </div>
            <form>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Select products</label>
                                <select multiple={true} className="form-control" value={chosenProducts} onChange={(e)=>{handleSelectProducts(e.target.selectedOptions)}}>
                                    {productList.map((product)=>{
                                        return <option key={product.id} id={product.id} value={product.data().name}>{product.data().name}</option>
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-secondary" onClick={(e)=>{filterByProduct(e)}}>Filter by products</button>
                        </div>
                        <div className="col-2 my-auto">
                            <button className="btn btn-secondary" onClick={(e)=>{sortByProduct(e)}}>Sort by product</button>
                        </div>
                        <div className="col-2 my-auto">
                            <button className="btn btn-secondary" onClick={(e)=>{sortByDate(e)}}>Sort by due date</button>
                        </div>
                        <div className="col-2 my-auto">
                            <button className="btn btn-secondary" onClick={(e)=>{restoreJobList(e)}}>Restore original list</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default JobSortForm;