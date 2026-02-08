"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import { ArrowRight, ChevronRight, Activity, Zap, Shield, Target } from 'lucide-react'
import Link from 'next/link'
import api from '../lib/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products')
        if (res.data.success) {
          setProducts(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <main>
      <Navbar />

      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Transparent Placeholder */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ maxWidth: '700px' }}
          >
            <div className="pro-badge">
              <Activity size={16} />
              <span>Professional Grade Gear</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '32px',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}>
              UNLEASH YOUR <br />
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 30%, #E11D48 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>INNER CHAMPION.</span>
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              maxWidth: '500px',
              lineHeight: 1.7,
              marginBottom: '40px'
            }}>
              Equip yourself with the same gear used by the pros. Precision, power, and absolute control in every smash.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn btn-primary" style={{ gap: '8px' }}>Shop Pro Series <ArrowRight size={18} /></Link>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Explore Tech</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editor's Featured Selection */}
      <section className="container py-32" style={{ marginTop: '40px' }}>
        <div className="flex items-end justify-between mb-20">
          <div>
            <h2 className="h2 mb-4">EDITOR'S <span className="text-primary">SELECTION</span></h2>
            <p className="body-lg">Curated performance gear for the professional circuit.</p>
          </div>
          <Link href="/shop" className="elite-link">
            Explore All <ChevronRight size={22} />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="product-card group relative"
            >
              <Link href={`/product/${product._id}`} className="block">
                <div className="badge">New Arrival</div>
                <div className="img-box bg-[#1a2333]">
                  <img src={product.images[0]} alt={product.name} />
                </div>

                <span className="p-type">{product.category}</span>
                <h3 className="p-name">{product.name}</h3>
              </Link>

              <div className="p-footer">
                <div>
                  <span className="p-price">₹{product.salePrice.toLocaleString()}</span>
                  <span className="p-old">₹{product.basePrice.toLocaleString()}</span>
                </div>
                <button className="p-cart-btn z-10 relative"><ArrowRight size={26} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Breakdown */}
      <section className="bg-surface py-32 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-16">
            {[
              { icon: <Zap />, title: "Hyper-Carbon 4.0", desc: "40T Nano-graphite construction for explosive recovery speed." },
              { icon: <Target />, title: "Precision-Tuned", desc: "Even weight distribution for surgical accuracy in high-speed rallies." },
              { icon: <Shield />, title: "Impact Core", desc: "Reinforced frame handles tensions up to 35lbs strings with no deformation." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-primary mb-10" style={{ transform: 'scale(2.5)' }}>{item.icon}</div>
                <h4 className="h3 mb-6">{item.title}</h4>
                <p className="body-sm" style={{ color: 'var(--text-dim)', fontSize: '15px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .elite-gradient-overlay {
          background: linear-gradient(90deg, rgba(2,6,23,0.95) 30%, rgba(2,6,23,0.7) 50%, transparent 100%),
                      linear-gradient(0deg, rgba(2,6,23,0.9) 0%, transparent 50%);
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .pro-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--primary);
          background: rgba(225, 29, 72, 0.12);
          padding: 10px 22px;
          border-radius: 99px;
          width: fit-content;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 40px;
          border: 1px solid rgba(225, 29, 72, 0.25);
        }
        .elite-link {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-transform: uppercase;
          font-size: 15px;
          transition: var(--transition);
        }
        .elite-link:hover { gap: 24px; text-shadow: 0 0 10px rgba(225, 29, 72, 0.3); }
        .p-type { color: var(--primary); font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; margin-bottom: 12px; display: block; }
        .p-name { font-size: 26px; font-weight: 800; height: 64px; overflow: hidden; margin-bottom: 32px; letter-spacing: -1px; color: #ffffff; }
        .p-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 32px; }
        .p-price { font-size: 32px; font-weight: 950; display: block; line-height: 1; color: #ffffff; }
        .p-old { font-size: 16px; color: var(--text-dim); text-decoration: line-through; }
        .p-cart-btn { width: 64px; height: 64px; border-radius: 50%; background: var(--border); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--transition); }
        .p-cart-btn:hover { background: var(--primary); transform: translateX(8px) scale(1.05); }
      `}</style>
    </main>
  )
}
