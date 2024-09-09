import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";
import Home from "../../pages/Home/Home";

namespace Navigation {
  export type Props = {};
}

function Navigation(props: Navigation.Props) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={RouteHelper.Home()} element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Navigation;
