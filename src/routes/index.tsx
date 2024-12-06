import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/404";
import { MarketplaceCheckout } from "../pages/MarketplaceCheckout";
import { ExternalCheckout } from "../pages/ExternalCheckout";
import Feedback from "../pages/Feedback";
import { ProductProvider } from "../hooks/useProduct";
import { SaleProvider } from "../hooks/useSale";
import { ScheduledDeliveryCheckout } from "../pages/ScheduledDeliveryCheckout";

function Router() {
  return (
    <ProductProvider>
      <SaleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/externo/:saleId" element={<ExternalCheckout />} />
            <Route path="/marketplace/:affiliationCode" element={<MarketplaceCheckout />} />
            <Route path="/:affiliationCode" element={<MarketplaceCheckout />} />
            <Route path="/scheduledDelivery/:affiliationCode" element={<ScheduledDeliveryCheckout />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </SaleProvider>
    </ProductProvider>
  );
}

export default Router;
