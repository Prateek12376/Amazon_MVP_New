import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(r => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(searchQuery, selectedCategory)
      .then(r => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 0', marginBottom: 16 }}>
        <button onClick={() => setSelectedCategory('')}
          style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #ddd', background: selectedCategory === '' ? '#131921' : 'white', color: selectedCategory === '' ? 'white' : '#131921', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          All
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.name)}
            style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #ddd', background: selectedCategory === c.name ? '#131921' : 'white', color: selectedCategory === c.name ? 'white' : '#131921', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #232f3e, #37475a)', borderRadius: 12, padding: '32px 24px', marginBottom: 24, color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Great Indian Sale 🎉</h1>
        <p style={{ fontSize: 16, opacity: 0.9 }}>Up to 70% off on top products</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, fontSize: 18 }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40 }}>No products found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Home;