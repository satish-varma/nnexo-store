"use client"
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Target, Video, Activity, Users, Trophy, ChevronRight } from 'lucide-react'

export default function AcademyPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/academy-hero.jpg')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-primary/25 mb-8">
                            <Trophy size={14} />
                            <span>Elite Training Center</span>
                        </div>
                        <h1 className="h1 mb-6 gradient-text">Master <br /> The Court</h1>
                        <p className="body-lg max-w-2xl mx-auto mb-10 text-slate-400">
                            Join the NNEXO Academy to train with champions. precision coaching,
                            advanced analytics, and a roadmap to professional excellence.
                        </p>
                        <button className="btn btn-primary group">
                            Start Your Journey <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container">
                    <div className="grid grid-cols-3 gap-8">
                        {[
                            { icon: <Target />, title: "Precision Drills", desc: "Scientific approach to shot accuracy and consistency." },
                            { icon: <Video />, title: "Video Analysis", desc: "Frame-by-frame stroke breakdown using AI-assisted tools." },
                            { icon: <Activity />, title: "Physical Conditioning", desc: "Badminton-specific fitness programs for endurance and speed." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-colors group"
                            >
                                <div className="text-primary mb-6 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coaches Preview */}
            <section className="py-20 border-t border-white/5">
                <div className="container">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">Mentorship</span>
                            <h2 className="h2">World-Class <span className="text-primary">Coaches</span></h2>
                        </div>
                        <button className="btn btn-outline text-sm py-2 px-6">View All Coaches</button>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h3 className="text-xl font-bold leading-tight mb-1">Coach Name</h3>
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider">Senior Instructor</p>
                                </div>
                                {/* Placeholder for coach image - replacing with a solid color/gradient if no image */}
                                <div className="absolute inset-0 bg-slate-800 opacity-50 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration CTA */}
            <section className="py-32">
                <div className="container">
                    <div className="glass rounded-[40px] p-20 text-center border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                        <h2 className="h2 mb-6">Ready to <span className="text-primary">Level Up?</span></h2>
                        <p className="body-lg max-w-xl mx-auto mb-10 text-slate-400">
                            Admissions for the upcoming season are now open. Secure your spot in our elite training program.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="btn btn-primary">Apply Now</button>
                            <button className="btn btn-outline">Download Brochure</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
