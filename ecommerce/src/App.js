import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import NewProducts from './pages/NewProducts';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './pages/CartPage';
import EditProduct from './pages/EditProduct';


function App() {
  const user = useSelector((state) => state.user)
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navigation/>
          <Routes>
            <Route index element={<Home />}/>
            {!user && (
              <>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
              </>
            )}
            {user && (
              <>
                <Route path="/carts/" element={<CartPage />}/>
              </>
            )}
            {user && user.admin && (
              <>
                <Route path='/products/:id/edit' element={<EditProduct />}/>
              </>
            )}
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/new-product" element={<NewProducts />} />
              <Route path="*" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
