import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase/firebase";

const Login = function() {
    const { googleSignIn } = useContext(FirebaseContext);

    return (
        <div className="row">
            <div className="col-12">
                <div className="jumbotron text-center">
                    <h1 className="display-4">Manufactor</h1>
                    <p className="lead">Manufactor allows manufacturers to define products including sub-operations, create jobs for existing products with due dates, view all the jobs currently in the system, and analyze the actual time each operation has historically taken</p>
                    <hr className="my-4"/>
                    <p>Please log in to get started</p>
                    <button className="btn btn-primary btn-lg" onClick={googleSignIn}>Log in with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login;