"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import api from '../../lib/api'

export default function ShopPage() {
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
        <main className="min-h-screen pt-32 pb-20">
            <Navbar />

            <div className="container">
                <header className="mb-12">
                    <h1 className="h1 mb-4">NNEXO <span className="text-primary">COLLECTION</span></h1>
                    <p className="body-lg text-slate-400">Precision gear for the modern athlete.</p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="product-card h-96 opacity-50 animate-pulse bg-slate-900/50 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-8">
                        {products.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="product-card group relative"
                            >
                                <Link href={`/product/${product._id}`} className="block">
                                    <div className="img-box mb-6 bg-slate-900/40 rounded-2xl p-8 group-hover:bg-slate-800/40 transition-colors">
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <span className="type-tag text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">{product.category}</span>
                                    <h3 className="product-title text-xl font-bold mb-4 h-[60px] leading-tight text-white">{product.name}</h3>
                                </Link>
                                <div className="product-footer flex items-center justify-between border-t border-white/10 pt-6 mt-2">
                                    <div>
                                        <span className="final-price text-2xl font-black block text-white">₹{product.salePrice.toLocaleString()}</span>
                                    </div>
                                    <button className="cart-btn w-12 h-12 rounded-full bg-slate-800 border-none text-white flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300 z-10 relative">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
