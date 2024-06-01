import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store/store";
import SignInForm from "./pages/Login";
import RegisterPage from "./pages/register";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";
import Clients from "./pages/Clients/Clients";
import ClientDetail from "./pages/Clients/ClientDetail";
import Factures from "./pages/Factures/Facture";
import FactureDetail from "./pages/Factures/FactureDeatail";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/Users/UsersDetails";
import Devis from "./pages/Devis/Devis";
import DevisDetail from "./pages/Devis/DevisDetail";
import Dashboard from "./Layout/Dashbord/Dashbord";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Profile from "./pages/profile/profile";
// PrivateRoute component to handle protected routes
const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/login" />;
};

// Defining the routes structure
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />{" "}
        {/* Default child route for "/" */}
        <Route path="products" element={<Products />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<ClientDetail />} />
        <Route path="factures" element={<Factures />} />
        <Route path="factures/:id" element={<FactureDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="devis" element={<Devis />} />
        <Route path="devis/:id" element={<DevisDetail />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);
