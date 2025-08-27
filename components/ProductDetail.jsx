import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError('Failed to fetch product details: ' + err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-detail">
            <Link to="/" className="back-link">← Back to Products</Link>

            <div className="product-detail-content">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-detail-info">
                    <h1>{product.title}</h1>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">ZAR{product.price}</p>
                    <p className="product-rating">
                        Rating: {product.rating?.rate}  ({product.rating?.count} reviews)
                    </p>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;