"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Rocket } from "lucide-react";
import Image from "next/image";

export default function AboutUsSection() {
    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To empower businesses with innovative solutions that drive growth and success",
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Constantly pushing boundaries to deliver cutting-edge technology solutions",
        },
        {
            icon: Users,
            title: "Community",
            description: "Building lasting relationships with our clients and fostering collaboration",
        },
        {
            icon: Rocket,
            title: "Growth",
            description: "Helping businesses scale and achieve their full potential",
        },
    ];

    return (
        <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background Animation */}
            <motion.div
                className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                        About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Story</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Founded with a vision to skill India, Coursewala is dedicated to empowering every Indian with practical, job-ready skills through high-quality, accessible courses.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left Content */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h3 className="text-3xl font-bold text-slate-800 mb-6">Transforming Careers, One Course at a Time</h3>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            We started with a simple belief: every Indian deserves access to world-class education and skills that lead to real opportunities. Our platform offers a wide range of
                            industry-relevant courses designed to help you grow, earn, and succeed.
                        </p>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            From beginners to professionals, our expert instructors and hands-on learning approach ensure you gain practical knowledge that makes a difference in your career journey.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                                <div className="text-sm text-slate-600">Learners Empowered</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
                                <div className="text-sm text-slate-600">Courses Delivered</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div className="relative" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="https://www.jcount.com/wp-content/uploads/2015/07/team.jpg" alt="Our team working together" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                            <div className="text-2xl font-bold text-green-600">99.9%</div>
                            <div className="text-sm text-slate-600">Uptime</div>
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}>
                            <div className="text-2xl font-bold text-blue-600">24/7</div>
                            <div className="text-sm text-slate-600">Support</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Values Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}>
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            whileHover={{ y: -5, scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}>
                            <motion.div
                                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}>
                                <value.icon className="h-8 w-8 text-blue-600" />
                            </motion.div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
