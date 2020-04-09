import React from "react";

const OperationForm = function({ name, setName, duration, setDuration, handleSubmit }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add an operation</h5>
                <form>
                    <div className="form-group">
                        <label>Operation name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)}/>
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