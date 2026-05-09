import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]); // State to hold DB products

  useEffect(() => {
    // Fetch from your live backend!
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  return (
    <div className="rs-page">
      <div className="hero">
        <p className="hero-subtitle">Curated Collection</p>
        <h1 className="hero-title">
          Shop with<br />
          <em>intention</em>
        </h1>
        <p className="hero-desc">
          Handpicked products chosen for quality, beauty, and everyday joy.
        </p>
        <a href="#products" className="btn btn-primary">
          Explore Now ↓
        </a>
      </div>

      <div className="section" id="products">
        <p className="section-label">Our Collection</p>
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {/* Automatically creates a card for every item in your database */}
          {products.map((product) => (
            <ProductCard product={product} key={product._id} /> 
          ))}
        </div>
      </div>
    </div>
  );
}