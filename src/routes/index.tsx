import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/404";
// import Feedback from "../pages/Feedback";
// import { ScheduledDeliveryCheckout } from "../pages/ScheduledDeliveryCheckout";
import ProtectedRoute from "./ProtectedRouter";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Protected Routes */}

        <Route path='/:type/:id' element={
          <ProtectedRoute>
            <ErrorPage />
          </ProtectedRoute>
        }/>

        {/* <Route path="/feedback" element={<Feedback />} /> */}
        {/* <Route path="/scheduledDelivery/:affiliationCode" element={<ScheduledDeliveryCheckout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
