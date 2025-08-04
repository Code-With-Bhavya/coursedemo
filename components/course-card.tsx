"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronRight, ShoppingCart, Clock, Flame, Award, Zap, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/plan";
import { useRouter } from "next/navigation";

interface CourseCardProps {
    course: Course;
    onKnowMore: () => void;
}

export default function CourseCard({ course, onKnowMore }: CourseCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

    const router = useRouter();

    // Calculate and update time left for hot deals
    useEffect(() => {
        if (!course.hotdeal || !course.start_time || !course.hours) return;

        const calculateTimeLeft = () => {
            const startTime = new Date(course.start_time ?? 0).getTime();
            const endTime = startTime + (course.hours ?? 0) * 60 * 60 * 1000;
            const now = new Date().getTime();

            if (now > endTime) {
                setTimeLeft(null);
                return;
            }

            const difference = endTime - now;

            setTimeLeft({
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [course.hotdeal, course.start_time, course.hours]);

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // Get discount percentage - use offer field if available, otherwise default to 30%
    const getDiscountPercentage = () => {
        if (course.offer && course.offer > 0) {
            return course.offer;
        }
        return course.hotdeal ? 30 : 0;
    };

    // Format price with discount for hot deals
    const formatPrice = () => {
        if (course.hotdeal) {
            const originalPrice = course.price;
            const discountPercentage = getDiscountPercentage();
            const discountedPrice = Math.floor(originalPrice * (1 - discountPercentage / 100));
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
                    <span className="text-white font-bold">₹{discountedPrice}</span>
                </div>
            );
        }
        return <span>₹{course.price}</span>;
    };

    return (
        <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`relative rounded-xl overflow-hidden shadow-lg ${
                course.hotdeal
                    ? "bg-gradient-to-b from-red-950/50 to-black/90 border-2 border-orange-500/50"
                    : course.bestSeller
                    ? "bg-gradient-to-b from-amber-950/40 to-black/80 border-2 border-yellow-500/30"
                    : "bg-gradient-to-b from-purple-950/40 to-black/80 border border-purple-500/10"
            }`}
            style={{ height: "520px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 rounded-xl"
                animate={{
                    boxShadow: isHovered
                        ? course.hotdeal
                            ? "0 0 25px 5px rgba(249, 115, 22, 0.4)"
                            : course.bestSeller
                            ? "0 0 20px 2px rgba(245, 158, 11, 0.3)"
                            : "0 0 20px 2px rgba(168, 85, 247, 0.3)"
                        : "0 0 0px rgba(168, 85, 247, 0)",
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Hot Deal Ribbon */}
            {course.hotdeal && (
                <div className="absolute -right-8 top-6 z-20 rotate-45">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-1 px-10 shadow-lg">HOT DEAL</div>
                </div>
            )}

            {/* Best Seller Badge */}
            {course.bestSeller && !course.hotdeal && (
                <div className="absolute top-3 left-3 z-20">
                    <motion.div
                        className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-1 rounded-md shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}>
                        <Award className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">BESTSELLER</span>
                    </motion.div>
                </div>
            )}

            {/* Discount Badge for Hot Deals */}
            {course.hotdeal && getDiscountPercentage() > 0 && (
                <div className="absolute top-3 left-3 z-20">
                    <motion.div
                        className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-orange-600 px-2 py-1 rounded-md shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}>
                        <Percent className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">{getDiscountPercentage()}% OFF</span>
                    </motion.div>
                </div>
            )}

            {/* Image container - fixed 16:9 ratio */}
            <div className="relative w-full pt-[56.25%]">
                <div className="absolute inset-0">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority />

                    {/* Image overlay gradient */}
                    <div
                        className={`absolute inset-0 ${
                            course.hotdeal
                                ? "bg-gradient-to-t from-red-950/80 via-red-900/20 to-transparent"
                                : course.bestSeller
                                ? "bg-gradient-to-t from-amber-950/80 via-amber-900/20 to-transparent"
                                : "bg-gradient-to-t from-purple-950/80 via-purple-900/20 to-transparent"
                        }`}
                    />

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-xs font-medium text-yellow-100">{course.rating.toFixed(1)}</span>
                    </div>

                    {/* Tags positioned at bottom of image */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                        {course.tags.slice(0, 2).map((tag, index) => (
                            <motion.span
                                key={index}
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                    course.hotdeal ? "bg-orange-600/80" : course.bestSeller ? "bg-amber-600/80" : "bg-purple-600/80"
                                } backdrop-blur-sm text-white font-medium`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                {tag}
                            </motion.span>
                        ))}
                        {course.tags.length > 2 && (
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                    course.hotdeal ? "bg-orange-900/60 text-orange-200" : course.bestSeller ? "bg-amber-900/60 text-amber-200" : "bg-purple-900/60 text-purple-200"
                                }`}>
                                +{course.tags.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col h-[calc(100%-43.25%)]">
                {/* Hot Deal Countdown */}
                {course.hotdeal && timeLeft && (
                    <div className="mb-2">
                        <div className={`flex items-center justify-center gap-1 py-1 px-2 rounded-md bg-gradient-to-r from-orange-900/60 to-red-900/60 border border-orange-500/30`}>
                            <Flame className="h-4 w-4 text-orange-400" />
                            <div className="text-xs font-bold text-orange-100">
                                ENDS IN:{" "}
                                <span className="text-white">
                                    {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold line-clamp-2 ${course.hotdeal ? "text-orange-100" : course.bestSeller ? "text-amber-100" : "text-white"}`}>{course.title}</h3>

                    {course.hotdeal && (
                        <motion.div
                            animate={{
                                rotate: [0, -5, 0, 5, 0],
                                scale: [1, 1.1, 1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                            }}>
                            <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                    )}
                </div>

                <p className={`text-sm mb-3 line-clamp-3 flex-grow ${course.hotdeal ? "text-orange-100/80" : course.bestSeller ? "text-amber-100/80" : "text-gray-300"}`}>{course.description}</p>

                {/* Course details */}
                <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center">
                        <Clock className={`h-3 w-3 mr-1 ${course.hotdeal ? "text-orange-400" : course.bestSeller ? "text-amber-400" : "text-purple-400"}`} />
                        <span className={course.hotdeal ? "text-orange-200" : course.bestSeller ? "text-amber-200" : "text-gray-300"}>{course.duration}</span>
                    </div>
                    <div
                        className={`px-2 py-0.5 rounded-full ${
                            course.hotdeal ? "bg-orange-900/40 text-orange-200" : course.bestSeller ? "bg-amber-900/40 text-amber-200" : "bg-purple-900/40 text-purple-200"
                        }`}>
                        {course.level}
                    </div>
                </div>

                <div className="mt-auto space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                            onClick={onKnowMore}
                            variant="outline"
                            className={`w-full justify-between text-white group relative overflow-hidden ${
                                course.hotdeal
                                    ? "border-orange-500/30 hover:bg-orange-800/20"
                                    : course.bestSeller
                                    ? "border-amber-500/30 hover:bg-amber-800/20"
                                    : "border-purple-500/30 hover:bg-purple-800/20"
                            }`}>
                            <span className="relative z-10">Know More</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0"
                                whileHover={{
                                    background: course.hotdeal
                                        ? "linear-gradient(to right, rgba(249, 115, 22, 0), rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0))"
                                        : course.bestSeller
                                        ? "linear-gradient(to right, rgba(245, 158, 11, 0), rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0))"
                                        : "linear-gradient(to right, rgba(147, 51, 234, 0), rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0))",
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            />
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button
                            //Redirect to /buy
                            onClick={() => router.push(`/buy?id=${course.id}`)}
                            className={`w-full text-white group ${
                                course.hotdeal
                                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg shadow-orange-600/20"
                                    : course.bestSeller
                                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-lg shadow-amber-600/20"
                                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            }`}>
                            <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            {formatPrice()}

                            {course.hotdeal && getDiscountPercentage() > 0 && (
                                <motion.div className="absolute right-2 top-0 bottom-0 flex items-center" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                                    <div className="bg-white text-red-600 text-xs font-bold rounded-full px-1.5 py-0.5 ml-1">-{getDiscountPercentage()}%</div>
                                </motion.div>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Pulsing effect for hot deals */}
            {course.hotdeal && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-orange-500 pointer-events-none"
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                />
            )}

            {/* Subtle glow for bestsellers */}
            {course.bestSeller && !course.hotdeal && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-yellow-500 pointer-events-none"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.01, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                />
            )}
        </motion.div>
    );
}
