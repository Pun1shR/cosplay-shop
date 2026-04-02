'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, Sparkles, Plus, Minus, Trash2 } from 'lucide-react';
import '../globals.css';

const formatPrice = (price) => Number(price).toLocaleString('en-IN');

const MOCK_DATA = [
  // FABRICS
  { id: 'f1', name: 'Rexine Fabric', category: 'Fabric', price: 850, image: '/images/rexine_fabric.png' },
  { id: 'f2', name: 'Cotton Fabric', category: 'Fabric', price: 400, image: '/images/cotton_fabric.png' },
  { id: 'f3', name: 'Stretchable Fabric', category: 'Fabric', price: 650, image: '/images/stretchable_fabric.png' },
  { id: 'f4', name: 'Polyester Fabric', category: 'Fabric', price: 350, image: '/images/polyester_fabric.png' },

  // FOAM
  { id: 'fm2', name: 'EVA Foam (2mm)', category: 'Foam', hasDensity: true, priceLD: 150, priceHD: 250, image: '/images/eva_foam_thin.png' },
  { id: 'fm5', name: 'EVA Foam (5mm)', category: 'Foam', hasDensity: true, priceLD: 250, priceHD: 350, image: '/images/eva_foam_thin.png' },
  { id: 'fm8', name: 'EVA Foam (8mm)', category: 'Foam', hasDensity: true, priceLD: 350, priceHD: 450, image: '/images/eva_foam_thin.png' },
  { id: 'fm10', name: 'EVA Foam (10mm)', category: 'Foam', hasDensity: true, priceLD: 400, priceHD: 500, image: '/images/eva_foam_thin.png' },
  { id: 'fm12', name: 'EVA Foam (12mm)', category: 'Foam', hasDensity: true, priceLD: 450, priceHD: 550, image: '/images/eva_foam_thick.png' },
  { id: 'fm15', name: 'EVA Foam (15mm)', category: 'Foam', hasDensity: true, priceLD: 550, priceHD: 700, image: '/images/eva_foam_thick.png' },
  { id: 'fm50', name: 'EVA Foam (50mm)', category: 'Foam', hasDensity: true, priceLD: 1200, priceHD: 1800, image: '/images/eva_foam_thick.png' },

  // STATIONARY
  { id: 's1', name: 'Fabric Scissors', category: 'Stationary', price: 550, image: '/images/fabric_scissors.png' },
  { id: 's2', name: 'Paper Scissors', category: 'Stationary', price: 150, image: '/images/paper_scissors.png' },
  { id: 's3', name: 'Papercutter', category: 'Stationary', price: 100, image: '/images/paper_cutter.png' },
  { id: 's4', name: 'Papercutter Blades (10pc)', category: 'Stationary', price: 80, image: '/images/blades.png' },
  { id: 's5', name: 'Heat Gun', category: 'Stationary', price: 1800, image: '/images/heat_gun.png' },
  { id: 's6', name: 'Rotary Tool Set', category: 'Stationary', price: 2500, image: '/images/rotary_tool.png' },
  { id: 's7', name: 'X-Acto Knife', category: 'Stationary', price: 300, image: '/images/xacto_knife.png' },
  { id: 's8', name: 'White Gel Pen', category: 'Stationary', price: 40, image: '/images/white_gel_pen.png' },

  // WIGS
  { id: 'w1', name: 'Cosplay Wig (Assorted)', category: 'Wigs', price: 1200, image: '/images/wigs.png' },

  // MAKEUP
  { id: 'm1', name: 'SFX Makeup Kit', category: 'Makeup', price: 1500, image: '/images/makeup_kit.png' },
  { id: 'm2', name: 'Makeup Brushes Set', category: 'Makeup', price: 600, image: '/images/makeup_kit.png' },

  // PAINTS
  { id: 'p1', name: 'Acrylic Paints Set', category: 'Paints', price: 800, image: '/images/paints.png' },
  { id: 'p2', name: 'Detail Paint Brushes', category: 'Paints', price: 300, image: '/images/paints.png' },
  { id: 'p3', name: 'Spray Paint (Assorted Colors)', category: 'Paints', price: 450, image: '/images/paints.png' },
  { id: 'p4', name: 'Foam Primer (Flexbond)', category: 'Paints', price: 950, image: '/images/paints.png' },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  // State to track density selection for foam products
  const [densitySelections, setDensitySelections] = useState({});

  const filteredItems = MOCK_DATA.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDensitySelect = (id, density) => {
    setDensitySelections(prev => ({ ...prev, [id]: density }));
  };

  const addToCart = (item, e) => {
    let finalItem = { ...item };
    let cartId = item.id;

    if (item.hasDensity) {
      const selectedDensity = densitySelections[item.id] || 'LD';
      cartId = `${item.id}-${selectedDensity}`;
      finalItem = {
        ...item,
        cartId: cartId,
        name: `${item.name} - ${selectedDensity}`,
        price: selectedDensity === 'LD' ? item.priceLD : item.priceHD
      };
    } else {
      finalItem.cartId = cartId;
    }

    setCart(prevCart => {
      const existing = prevCart.find(i => i.cartId === finalItem.cartId);
      if (existing) {
        return prevCart.map(i => i.cartId === finalItem.cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...finalItem, quantity: 1 }];
    });

  };

  const decrementFromCart = (cartId) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.cartId === cartId);
      if (existing && existing.quantity > 1) {
        return prevCart.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prevCart.filter(i => i.cartId !== cartId);
    });
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotal = formatPrice(cartTotalAmount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Replace YOUR_WHATSAPP_NUMBER with your actual number WITH country code (e.g. 919876543210 for India)
    const phoneNumber = "918355978568"; 
    
    let message = "Hello! I would like to place an order for:\n\n";
    
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} = ₹${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\n*Total Amount:* ₹${cartTotal}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const getItemQuantity = (id) => {
    const selectedDensity = densitySelections[id] || 'LD';
    const item = MOCK_DATA.find(i => i.id === id);
    const cartId = item.hasDensity ? `${id}-${selectedDensity}` : id;
    const cartItem = cart.find(i => i.cartId === cartId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncrementFromCard = (item, e) => {
    addToCart(item, e);
  };

  const handleDecrementFromCard = (item) => {
    const selectedDensity = densitySelections[item.id] || 'LD';
    const cartId = item.hasDensity ? `${item.id}-${selectedDensity}` : item.id;
    decrementFromCart(cartId);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'flex', gap: '2rem' }}>

      {/* Left Column - Main Store */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <header className="animate-fade-in" style={{ marginBottom: '1rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={36} color="var(--accent-primary)" /> House of Purplepaw
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Premium Crafting Materials for Creators</p>
        </header>

        {/* Search Bar */}
        <div className="glass-panel animate-fade-in stagger-1" style={{ padding: '1.5rem', position: 'relative' }}>
          <Search color="var(--text-muted)" style={{ position: 'absolute', top: '50%', left: '2rem', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search for rexine, foam, wigs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 4rem',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>

        {/* Results Grid */}
        <div className="animate-fade-in stagger-2">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredItems.map(item => {
              const currentDensity = densitySelections[item.id] || 'LD';
              const currentPrice = item.hasDensity ? (currentDensity === 'LD' ? item.priceLD : item.priceHD) : item.price;

              return (
                <div key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
                  {/* Product Visual */}
                  <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'var(--accent-gradient)' }}
                    />
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid var(--accent-primary)' }}>
                      {item.category}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', fontWeight: 600 }}>{item.name}</h3>
                    <p style={{ color: 'var(--accent-primary)', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>₹{formatPrice(currentPrice)}</p>

                    {/* Density Selector for Foam */}
                    {item.hasDensity && (
                      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleDensitySelect(item.id, 'LD')}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: currentDensity === 'LD' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', background: currentDensity === 'LD' ? 'rgba(245, 183, 0, 0.1)' : 'transparent', color: 'white', fontWeight: currentDensity === 'LD' ? 'bold' : 'normal' }}
                        >
                          LD Foam
                        </button>
                        <button
                          onClick={() => handleDensitySelect(item.id, 'HD')}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: currentDensity === 'HD' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', background: currentDensity === 'HD' ? 'rgba(245, 183, 0, 0.1)' : 'transparent', color: 'white', fontWeight: currentDensity === 'HD' ? 'bold' : 'normal' }}
                        >
                          HD Foam
                        </button>
                      </div>
                    )}

                    <div style={{ marginTop: 'auto' }}>
                      {getItemQuantity(item.id) > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(245, 183, 0, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '9999px', padding: '10px 16px' }}>
                          <button onClick={() => handleDecrementFromCard(item)} style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Minus size={20} />
                          </button>
                          <span style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{getItemQuantity(item.id)}</span>
                          <button onClick={(e) => handleIncrementFromCard(item, e)} style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Plus size={20} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => addToCart(item, e)}
                          className="button-primary"
                          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Plus size={18} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column - Shopping Cart */}
      <div style={{ flex: '0 0 350px' }} className="animate-fade-in stagger-3">
        <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '2rem', height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <ShoppingCart size={24} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Shopping Cart ({totalItems})</h2>
          </div>

          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            marginBottom: '1.5rem', 
            paddingRight: '0.5rem',
            paddingBottom: '2rem', /* Extra padding for gradient reach */
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
            ) : (
              cart.map((cartItem) => (
                <div key={cartItem.cartId} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem', lineHeight: '1.3' }}>{cartItem.name}</p>
                      <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}>₹{formatPrice(cartItem.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.cartId)}
                      style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.2rem', borderRadius: '4px', marginLeft: '0.5rem' }}
                      title="Remove from Cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', padding: '0.25rem', width: 'fit-content' }}>
                    <button onClick={() => decrementFromCart(cartItem.cartId)} style={{ background: 'transparent', color: 'white', padding: '0.2rem' }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{cartItem.quantity}</span>
                    <button onClick={() => {
                      setCart(prev => prev.map(i => i.cartId === cartItem.cartId ? { ...i, quantity: i.quantity + 1 } : i));
                    }} style={{ background: 'transparent', color: 'white', padding: '0.2rem' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Total */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Total Amount</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>₹{cartTotal}</p>
            </div>
            <button
              className="button-primary"
              style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Checkout Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
