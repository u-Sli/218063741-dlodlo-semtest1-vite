import { React, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import ProductList from '../components/ProductList';


function App() {


  return (
    <>
      {<Router>
        <div className='App'>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </Router>}
    </>
  )
}

export default App
