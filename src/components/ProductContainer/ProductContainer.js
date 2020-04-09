import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import ProductCard from "../ProductCard";
import OperationPage from "../OperationPage";

const ProductContainer = function() {
    const [productList, setProductList] = useState([]);
    const [displayOperations, setDisplayOperations] = useState(false);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const { db, user } = useContext(FirebaseContext);

    const handleBack = function() {
        setDisplayOperations(false);
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
    };

    useEffect(() => {
        renderProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const productCardList = productList.map((product) => {
        return (
            <div className="col-3" key={product.id}>
                <ProductCard name={product.data().name} handleDelete={() => {deleteProduct(product.id)}} viewOperations={()=>viewOperations(product.id, product.data().name)}/>
            </div>
        );
    });

    return (
        <>
            {displayOperations ? <OperationPage productId={productId} productName={productName} handleBack={handleBack}/> : <div className="row">
                {productCardList}
            </div>}
        </>
    );
}

export default ProductContainer;