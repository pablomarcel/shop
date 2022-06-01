import React from "react";
import {Route, Routes} from "react-router-dom";
// import Header from './components/Header'

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import './default.scss'

function App() {
  return (
    <div className="App">

        <Routes>
            <Route exact path="/" element={<HomepageLayout><Homepage/></HomepageLayout>}/>
            <Route path="/registration" element={<MainLayout><Registration /></MainLayout>} />
        </Routes>
    </div>
  );
}

export default App;
