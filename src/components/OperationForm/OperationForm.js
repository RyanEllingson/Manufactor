import React from "react";

const OperationForm = function({ duration, setDuration, operationList, chosenOperation, setChosenOperation, setChosenOpId, handleSubmit }) {
    const handleSelect = function(options) {
        setChosenOperation(options[0].value);
        setChosenOpId(options[0].id);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add an operation</h5>
                <form>
                    <div className="form-group">
                        <label>Choose from defined operations</label>
                            <select className="form-control" value={chosenOperation} onChange={(e)=>{handleSelect(e.target.selectedOptions)}}>
                                {operationList.map((operation)=>{
                                    return <option key={operation.id} id={operation.id} value={operation.data().name}>{operation.data().name}</option>
                                })}
                            </select>
                        </div>
                    <div className="form-group">
                        <label>Expected operation duration in minutes</label>
                        <input type="text" className="form-control" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create new operation</button>
                </form>
            </div>
        </div>
        
    );
};

export default OperationForm;