import React from 'react';
import Container from "./components/Container";
import { Firebase } from "./firebase/firebase";
import { Page } from "./page/page";

function App() {
  return (
    <Firebase>
      <Page>
        <div className="App">
          <Container/>
        </div>
      </Page>
    </Firebase>
  );
}

export default App;
