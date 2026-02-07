"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar' // Adjusted path for nested route
import { ArrowLeft, Star, Shield, Truck, Zap, Minus, Plus, ShoppingBag } from 'lucide-react'
import api from '../../../lib/api'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`)
                if (res.data.success) {
                    setProduct(res.data.data)
                }
            } catch (err) {
                console.error("Error fetching product", err)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchProduct()
    }, [id])

    if (loading) return (
        <div className="min-h-screen bg-bg flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )

    if (!product) return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-4">
            <h2 className="h2 mb-4">Product Not Found</h2>
            <Link href="/shop" className="btn btn-outline">Back to Shop</Link>
        </div>
    )

    return (
        <main className="min-h-screen bg-bg pb-20">
            <Navbar />

            <div className="container pt-32">
                <Link href="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="aspect-square bg-surface rounded-3xl p-8 flex items-center justify-center border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-[80%] h-[80%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-24 h-24 rounded-xl bg-surface p-2 border transition-all flex-shrink-0 ${activeImage === idx ? 'border-primary' : 'border-white/5 hover:border-white/20'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-primary text-xs font-black uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                {product.category}
                            </span>
                            {product.stock > 0 ? (
                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> In Stock
                                </span>
                            ) : (
                                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                            )}
                        </div>

                        <h1 className="h2 mb-4 leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-black text-white">₹{product.salePrice.toLocaleString()}</span>
                            {product.basePrice > product.salePrice && (
                                <span className="text-xl text-slate-500 line-through">₹{product.basePrice.toLocaleString()}</span>
                            )}
                        </div>

                        <p className="body-lg text-slate-300 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Specs Grid (Example) */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                { label: "Material", value: "High Modulus Graphite" },
                                { label: "Weight", value: "83g (4U)" },
                                { label: "Balance", value: "Head Heavy" },
                                { label: "Flex", value: "Stiff" }
                            ].map((spec, i) => (
                                <div key={i} className="bg-surface/50 p-4 rounded-xl border border-white/5">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">{spec.label}</span>
                                    <span className="text-white font-semibold">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center bg-surface rounded-xl border border-white/10 h-14 w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button className="btn btn-primary flex-1 h-14 text-base gap-3">
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex gap-6 pt-8 border-t border-white/10">
                            {[
                                { icon: <Shield size={18} />, text: "2 Year Warranty" },
                                { icon: <Truck size={18} />, text: "Free Express Shipping" },
                                { icon: <Zap size={18} />, text: "100% Authentic" }
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                                    <span className="text-primary">{badge.icon}</span>
                                    <span>{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
