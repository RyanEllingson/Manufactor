import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import ProductCard from "../ProductCard";
import OperationPage from "../OperationPage";
import JobForm from "../JobForm";

const ProductContainer = function() {
    const [productList, setProductList] = useState([]);
    const [displayProducts, setDisplayProducts] = useState(true);
    const [displayOperations, setDisplayOperations] = useState(false);
    const [displayJobForm, setDisplayJobForm] = useState(false);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productOperations, setProductOperations] = useState([]);
    const { db, user } = useContext(FirebaseContext);

    const handleBack = function() {
        setDisplayOperations(false);
        setDisplayJobForm(false);
        setDisplayProducts(true);
    }

    const renderProducts = function() {
        db.collection("users").doc(`${user.uid}`).collection("products").get().then((querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(doc);
            })
            setProductList(products);
        });
    };

    const deleteProduct = function(id) {
        db.collection("users").doc(`${user.uid}`).collection("products").doc(id).delete().then(() => {
            renderProducts();
        }).catch((error) => {
            console.error(error);
        });
    }

    const viewOperations = function(id, name) {
        setProductId(id);
        setProductName(name);
        setDisplayOperations(true);
        setDisplayProducts(false);
    };

    const viewJobForm = function(id, name, operations) {
        setProductId(id);
        setProductName(name);
        setDisplayJobForm(true);
        setDisplayProducts(false);
        setProductOperations(operations);
    }

    useEffect(() => {
        renderProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayOperations]);

    const productCardList = productList.map((product) => {
        return (
            <div className="col-3" key={product.id}>
                <ProductCard name={product.data().name}
                    handleDelete={() => {deleteProduct(product.id)}}
                    viewOperations={()=>viewOperations(product.id, product.data().name)}
                    operations={product.data().operations}
                    viewJobForm={()=>viewJobForm(product.id, product.data().name, product.data().operations)}
                />
            </div>
        );
    });

    return (
        <>
            {displayProducts ? <div className="row">
                {productCardList}
            </div> : ""}
            {displayOperations ? <OperationPage productId={productId} productName={productName} handleBack={handleBack}/> : ""}
            {displayJobForm ? <JobForm productId={productId} productName={productName} handleBack={handleBack} operations={productOperations}/> : ""}
        </>
    );
}

export default ProductContainer;