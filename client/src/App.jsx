import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./views/home/Home.jsx";
import Shop from "./views/shop/Shop.jsx";
import OurRoots from "./views/OurRoots/OurRoots.jsx";
import Contact from "./views/contact/Contact.jsx";
import CreateProduct from "./views/Admin/CreateProduct.jsx";
import UserPanel from "./components/userPanel/userPanel.jsx";
import WeddingsEvents from "./views/weddings&events/Weddings&Events.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourroots" element={<OurRoots />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/weddings-events" element={<WeddingsEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<CreateProduct />} />
        <Route path="/userPanel" element={<UserPanel />} />
      </Routes>
    </>
  );
}

export default App;
