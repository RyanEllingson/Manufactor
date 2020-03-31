import React from 'react';
import Home from "./components/Home/Home";
import { Firebase } from "./firebase/firebase";

function App() {
  return (
    <Firebase>
      <div className="App">
        <Home/>
      </div>
    </Firebase>
  );
}

export default App;
