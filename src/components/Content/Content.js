import React, { useContext } from "react";
import { PageContext } from "../../page/page";
import Home from "../Home";
import ProductForm from "../ProductForm";
import ProductContainer from "../ProductContainer";

const Content = function() {
    const { page } = useContext(PageContext);
    
    return (
        <>
            {page === "home" ? <Home/> : ""}
            {page === "addProduct" ? <ProductForm/> : ""}
            {page === "viewProducts" ? <ProductContainer/> : ""}
        </>
    );
};

export default Content;