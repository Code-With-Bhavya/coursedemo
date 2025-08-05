"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Star, Users, BookOpen, Award, ArrowRight } from "lucide-react";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const handleGetStarted = () => {
        const plansSection = document.getElementById("plans");
        if (plansSection) {
            plansSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const stats = [
        { icon: Users, value: "10K+", label: "Happy Clients" },
        { icon: BookOpen, value: "500+", label: "Projects Done" },
        { icon: Award, value: "99%", label: "Success Rate" },
        { icon: Star, value: "4.9", label: "Rating" },
    ];

    return (
        <motion.div
            id="home"
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50"
            style={{ opacity, scale, y }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-20 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 -right-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                    <motion.div
                        className="mt-20 inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-200"
                        animate={{
                            boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0.1)", "0 0 0 0 rgba(59, 130, 246, 0)"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                        }}>
                        <Star className="h-4 w-4 fill-current" />
                        Unlock Your Potential with Skill-Based Courses
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        <motion.span
                            className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}>
                            Build Skills. Unlock Opportunities.
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.p
                    className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}>
                    Join thousands of learners who have upskilled, advanced their careers, and unlocked new opportunities with our expert-led, practical courses. Start your journey to growth and
                    success today!
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-6 justify-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg shadow-blue-500/25 transition-all duration-300"
                            size="lg">
                            <BookOpen className="h-5 w-5 mr-2" />
                            View Our Plans
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-6 rounded-full text-lg font-medium bg-white/80 backdrop-blur-sm" size="lg">
                            <Play className="h-5 w-5 mr-2" />
                            Watch Demo
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            animate={{
                                y: [0, -10],
                            }}
                            style={{
                                animationDelay: `${index * 0.2}s`,
                            }}>
                            <motion.div
                                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4 group-hover:shadow-lg transition-shadow"
                                whileHover={{
                                    background: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
                                }}>
                                <stat.icon className="h-8 w-8 text-blue-600" />
                            </motion.div>
                            <motion.div
                                className="text-3xl md:text-4xl font-bold text-slate-800 mb-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}>
                                {stat.value}
                            </motion.div>
                            <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}>
                <ChevronDown className="h-8 w-8 text-slate-400" />
            </motion.div>
        </motion.div>
    );
}
