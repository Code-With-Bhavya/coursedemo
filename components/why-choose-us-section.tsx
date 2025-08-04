"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, Award, Clock, HeartHandshake } from "lucide-react";

export default function WhyChooseUsSection() {
    const features = [
        {
            icon: Shield,
            title: "Guaranteed Success",
            description: "Proven strategies to help you achieve your learning and career goals.",
            color: "blue",
        },
        {
            icon: Zap,
            title: "Accelerated Growth",
            description: "Fast-track your skills and unlock new opportunities for advancement.",
            color: "yellow",
        },
        {
            icon: Users,
            title: "Community Support",
            description: "Join a thriving network of learners and mentors for continuous growth.",
            color: "green",
        },
        {
            icon: Award,
            title: "Top Achievers",
            description: "Learn from industry leaders and award-winning instructors.",
            color: "purple",
        },
        {
            icon: Clock,
            title: "Efficient Learning",
            description: "Maximize your results with time-optimized, effective courses.",
            color: "orange",
        },
        {
            icon: HeartHandshake,
            title: "Personalized Guidance",
            description: "Get tailored advice and feedback to ensure your ongoing success.",
            color: "pink",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-20 px-4 md:px-8 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                        Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Platform?</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">We provide everything you need to succeed, backed by cutting-edge technology and unmatched support</p>
                </motion.div>

                <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white hover:from-white hover:to-slate-50 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-xl"
                            whileHover={{ y: -5, scale: 1.02 }}>
                            <motion.div
                                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}>
                                <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
                            </motion.div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
