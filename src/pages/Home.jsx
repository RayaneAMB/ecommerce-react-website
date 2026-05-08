import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
  const products = getProducts();

  return (
    <div className="rs-page">
      {/* Hero */}
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

      {/* Products */}
      <div className="section" id="products">
        <p className="section-label">Our Collection</p>
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}