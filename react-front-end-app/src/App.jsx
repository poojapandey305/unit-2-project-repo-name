import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MealType from "./components/MealType";
import AddressForm from "./components/AddressForm";
import PaymentPreference from "./components/PaymentPreference";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import Login from "./components/Login";     
import "./components/styles.css";

function App() {
  return (
    <div>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:mealType" element={<MealType />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/checkout" element={<PaymentPreference />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />   

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;