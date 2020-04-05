import React from "react";

const ContentCard = function({ title, text, clickHandler, buttonText }) {
    return (
        <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <button onClick={clickHandler} className="btn btn-primary">{buttonText}</button>
            </div>
        </div>
    )
};

export default ContentCard;