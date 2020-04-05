import React from "react";

const ProductCard = function({ name, handleDelete }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <button className="btn btn-danger" onClick={handleDelete}>Delete product</button>
            </div>
        </div>
    );
}

export default ProductCard;