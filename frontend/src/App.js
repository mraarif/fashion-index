import {Navbar} from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

function App() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Navbar/>
            <ProductList/>
            <Footer/>
        </div>
    );
}

export default App;
