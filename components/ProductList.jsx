import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './ProductList.css';

export default function ProductList() { 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list">
            <h1>Our Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">ZAR{product.price}</p>
                    <p className="product-category">{product.category}</p>
                </div>
            </div>
        </Link>
    );
};