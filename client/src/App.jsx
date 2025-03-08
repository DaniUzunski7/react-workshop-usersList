import { useState } from "react";

import "./App.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserList } from "./UserList";

function App() {
  return (
    <>
        <Header />
        
        <main className="main">
          <UserList />
        </main>

        <Footer />
    </>
  );
}

export default App;
