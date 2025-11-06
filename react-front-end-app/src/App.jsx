
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
import './components/styles.css'

/*<header className="banner">Urban Spice</header>
*/
function App() {
  return (
    <div>

     <Header />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:mealType" element={<MealType />} />
        <Route path="/address" element={<AddressForm />} /> {/*  NEW */}
        <Route path="/checkout" element={<PaymentPreference />} />
        <Route path="/about" element={<About /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
