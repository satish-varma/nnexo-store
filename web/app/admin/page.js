"use client"
import { useState, useEffect } from 'react'
import api from '../../lib/api'
import { Shield, Lock, Plus, Upload, Check, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function AdminPage() {
    const [step, setStep] = useState('login') // login, otp, dashboard
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [token, setToken] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    // Product Form
    const [product, setProduct] = useState({
        name: '',
        description: '',
        basePrice: '',
        salePrice: '',
        category: 'rackets',
        stock: 10,
        images: '',
        specifications: '' // JSON or simple text
    })

    useEffect(() => {
        const storedToken = localStorage.getItem('admin_token')
        if (storedToken) {
            setToken(storedToken)
            setStep('dashboard')
        }
    }, [])

    const requestOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const res = await api.post('/auth/otp/request', { phoneNumber: phone })
            if (res.data.success) {
                setStep('otp')
                setMessage('OTP sent to console (Check server logs)')
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error sending OTP')
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const res = await api.post('/auth/otp/verify', { phoneNumber: phone, otp })
            if (res.data.success) {
                const accessToken = res.data.accessToken
                if (res.data.user.role !== 'Admin' && res.data.user.role !== 'Super Admin') {
                    setMessage("Access Denied: You are not an Admin.")
                    return
                }
                localStorage.setItem('admin_token', accessToken)
                setToken(accessToken)
                setStep('dashboard')
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Invalid OTP')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const productData = {
                ...product,
                images: product.images.split(',').map(url => url.trim()), // Convert CSV to array
                basePrice: Number(product.basePrice),
                salePrice: Number(product.salePrice),
                stock: Number(product.stock)
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const res = await api.post('/products', productData, config)

            if (res.data.success) {
                setMessage('Product created successfully!')
                setProduct({
                    name: '',
                    description: '',
                    basePrice: '',
                    salePrice: '',
                    category: 'rackets',
                    stock: 10,
                    images: '',
                    specifications: ''
                })
            }
        } catch (err) {
            console.error(err)
            if (err.response?.status === 401 || err.response?.status === 403) {
                setMessage("Session expired or unauthorized. Please login again.")
                setStep('login')
                localStorage.removeItem('admin_token')
            } else {
                setMessage(err.response?.data?.message || 'Error creating product')
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('admin_token')
        setStep('login')
        setToken('')
    }

    return (
        <main className="min-h-screen bg-bg pt-32 pb-20">
            <Navbar />

            <div className="container max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-8 gap-3 text-primary">
                    <Shield size={32} />
                    <h1 className="h2">Admin Portal</h1>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                        {message.includes('success') ? <Check size={20} /> : <AlertCircle size={20} />}
                        {message}
                    </div>
                )}

                {step === 'login' && (
                    <div className="glass p-10 rounded-3xl border border-white/5">
                        <h3 className="h3 mb-6">Admin Login</h3>
                        <form onSubmit={requestOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Phone Number</label>
                                <div className="bg-surface border border-white/10 rounded-xl flex items-center px-4 h-12 focus-within:border-primary transition-colors">
                                    <span className="text-slate-500 mr-3">+91</span>
                                    <input
                                        type="tel"
                                        className="bg-transparent border-none outline-none text-white w-full h-full font-mono text-lg"
                                        placeholder="9876543210"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary w-full">
                                {loading ? 'Sending...' : 'Request OTP'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 'otp' && (
                    <div className="glass p-10 rounded-3xl border border-white/5">
                        <h3 className="h3 mb-6">Verify OTP</h3>
                        <p className="text-slate-400 mb-6 text-sm">Enter the OTP sent to your server console for {phone}.</p>
                        <form onSubmit={verifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">One-Time Password</label>
                                <input
                                    type="text"
                                    className="bg-surface border border-white/10 rounded-xl w-full h-12 px-4 text-white font-mono text-center text-2xl tracking-[0.5em] focus:border-primary outline-none transition-colors"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary w-full">
                                {loading ? 'Verifying...' : 'Login to Dashboard'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 'dashboard' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="h3">Add New Product</h3>
                            <button onClick={logout} className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider">Logout</button>
                        </div>

                        <form onSubmit={handleCreateProduct} className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="product-input"
                                    value={product.name}
                                    onChange={e => setProduct({ ...product, name: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    className="product-input h-32 py-3"
                                    value={product.description}
                                    onChange={e => setProduct({ ...product, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Prices */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Base Price (₹)</label>
                                    <input
                                        type="number"
                                        className="product-input"
                                        value={product.basePrice}
                                        onChange={e => setProduct({ ...product, basePrice: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sale Price (₹)</label>
                                    <input
                                        type="number"
                                        className="product-input"
                                        value={product.salePrice}
                                        onChange={e => setProduct({ ...product, salePrice: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Category & Stock */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                    <select
                                        className="product-input"
                                        value={product.category}
                                        onChange={e => setProduct({ ...product, category: e.target.value })}
                                    >
                                        <option value="rackets">Rackets</option>
                                        <option value="apparel">Apparel</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="accessories">Accessories</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Count</label>
                                    <input
                                        type="number"
                                        className="product-input"
                                        value={product.stock}
                                        onChange={e => setProduct({ ...product, stock: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URLs (comma separated)</label>
                                <input
                                    type="text"
                                    className="product-input"
                                    placeholder="https://example.com/img1.png, https://example.com/img2.png"
                                    value={product.images}
                                    onChange={e => setProduct({ ...product, images: e.target.value })}
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-2">Currently supporting external image URLs only.</p>
                            </div>

                            <button type="submit" disabled={loading} className="btn btn-primary w-full gap-2">
                                <Plus size={20} /> {loading ? 'Creating...' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <style jsx>{`
                .product-input {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    width: 100%;
                    height: 48px;
                    padding: 0 16px;
                    color: white;
                    outline: none;
                    transition: var(--transition);
                }
                .product-input:focus {
                    border-color: var(--primary);
                    background: rgba(255,255,255,0.02);
                }
            `}</style>
        </main>
    )
}
