import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./component/Loader/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const NoMatchRoute = React.lazy(() => import("./pages/NoMatchRoute.js"));

function App() {
  return (
    <div className="App bg-background overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatchRoute />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
