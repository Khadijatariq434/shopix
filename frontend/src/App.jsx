import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import Register from "./pages/Register";
import ManageProdutcs from "./admin/ManageProducts";
import Cart from "./pages/Cart";
import OAuthCallback from "./components/OAuthCallback";
import OrderList from "./components/OrderList";
import Checkout from "./components/Checkout";
import AdminOrders from "./components/AdminOrder1";
import About from "./pages/About";
import Categories from "./components/Categories";
import ProductDetail from "./pages/ProductDetail";
import ContactUs from "./pages/ContactUs";
import FAQPage from "./pages/Faq";

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area that grows to fill available space */}
      <main className="flex-grow pb- ">
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/category/:category" element={<CategoryList />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/account" element={<Auth />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin/products" element={<ManageProdutcs/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/orders" element={<OrderList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin-orders" element={<AdminOrders/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          {/* <Route path="/oauth/callback" element={<OAuthCallback/>} />        */}
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path="/faq" element={<FAQPage/>}/>
           </Routes>
      </main>

      {/* Footer fixed at the bottom */}
      <Footer />
    </div>
  );
}

export default App;