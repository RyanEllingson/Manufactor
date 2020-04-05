import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/firebase";
import ProductCard from "../ProductCard";

const ProductContainer = function() {
    const [productList, setProductList] = useState([]);
    const { db, user } = useContext(FirebaseContext);

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

    useEffect(() => {
        renderProducts();
    }, []);

    const productCardList = productList.map((product) => {
        return (
            <div className="col-3" key={product.id}>
                <ProductCard name={product.data().name} handleDelete={() => {deleteProduct(product.id)}}/>
            </div>
        );
    })

    return (
        <div className="row">
            {productCardList}
        </div>
    );
}

export default ProductContainer;