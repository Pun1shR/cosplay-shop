import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import './globals.css';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      
      {/* Visual Content (GIF) */}
      <div className="animate-fade-in" style={{ marginBottom: '2.5rem' }}>
        <div style={{ 
          width: '320px', 
          height: '320px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          border: '4px solid var(--accent-primary)',
          boxShadow: '0 0 40px rgba(245, 183, 0, 0.4)',
          margin: '0 auto'
        }}>
          <img 
            src="/images/logo.png" 
            alt="Cosplay Shop Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} 
          />
        </div>
      </div>

      {/* Main Copy */}
      <div className="animate-fade-in stagger-1" style={{ maxWidth: '800px' }}>
        <h1 className="text-gradient" style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.1 }}>
          Bring Your Dream <br/>Cosplay to Life
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', marginBottom: '3rem', fontWeight: 300 }}>
          Welcome to the ultimate creator's forge. Stop dreaming and start crafting with our premium selection of foam, fabrics, paints, and exclusive tools.
        </p>
        
        {/* Call to Action */}
        <Link href="/store" passHref>
          <button className="button-primary" style={{
            fontSize: '1.3rem', 
            padding: '1.2rem 3rem', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            animation: 'pulse 2s infinite'
          }}>
            <Sparkles size={24} />
            Enter The Store
            <ArrowRight size={24} />
          </button>
        </Link>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 183, 0, 0.5); }
          70% { box-shadow: 0 0 0 25px rgba(245, 183, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 183, 0, 0); }
        }
      `}</style>
    </div>
  );
}
