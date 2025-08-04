"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CourseCard from "@/components/course-card";
import type { Course } from "@/types/plan";
import { toast } from "@/components/ui/use-toast";
import { Loader, Flame, TrendingUp, Award, Clock, Percent } from "lucide-react";

interface CourseSectionProps {
    searchQuery: string;
    onKnowMore: (course: Course) => void;
}

export default function CourseSection({ searchQuery, onKnowMore }: CourseSectionProps) {
    const [courses, setCourses] = useState([] as Course[]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
    const [hotDealCourses, setHotDealCourses] = useState([] as Course[]);
    const [bestsellerCourses, setBestsellerCourses] = useState([] as Course[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCourses(courses);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = courses.filter(
                (course) =>
                    course.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                    course.title.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query) ||
                    course.level.toLowerCase().includes(query)
            );
            setFilteredCourses(filtered);
        }
    }, [courses, searchQuery]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const getCourses = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/get_courses", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (data.success) {
                setCourses(data.data);

                // Filter hot deal courses
                const hotDeals = data.data.filter((course: Course) => course.hotdeal && isHotDealValid(course));
                setHotDealCourses(hotDeals);

                // Filter bestseller courses
                const bestsellers = data.data.filter((course: Course) => course.bestSeller && !course.hotdeal);
                setBestsellerCourses(bestsellers);
            } else {
                toast({
                    title: "Error",
                    description: data.message || "Failed to fetch courses",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast({
                title: "Error",
                description: "Failed to fetch courses. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Check if hot deal is still valid
    const isHotDealValid = (course: Course) => {
        if (!course.hotdeal || !course.start_time || !course.hours) return false;

        const startTime = new Date(course.start_time).getTime();
        const endTime = startTime + course.hours * 60 * 60 * 1000;
        const now = new Date().getTime();

        return now < endTime;
    };

    // Get average discount for hot deals section
    const getAverageDiscount = () => {
        if (hotDealCourses.length === 0) return 30;

        const totalDiscount = hotDealCourses.reduce((sum, course) => {
            return sum + (course.offer || 30);
        }, 0);

        return Math.round(totalDiscount / hotDealCourses.length);
    };

    return (
        <>
            {/* Hot Deals Section */}
            {hotDealCourses.length > 0 && (
                <section className="py-10 px-4 md:px-8 relative overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-red-600/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <motion.div className="flex items-center justify-center gap-3 mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 0, 10, 0],
                                    scale: [1, 1.2, 1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                }}>
                                <Flame className="h-8 w-8 text-orange-500" />
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">HOT DEALS</h2>
                            <motion.div
                                animate={{
                                    rotate: [0, 10, 0, -10, 0],
                                    scale: [1, 1.2, 1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                }}>
                                <Flame className="h-8 w-8 text-orange-500" />
                            </motion.div>
                        </motion.div>

                        <motion.div className="text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <div className="inline-block bg-gradient-to-r from-orange-900/40 to-red-900/40 px-6 py-2 rounded-full border border-orange-500/30">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-orange-400" />
                                    <p className="text-orange-100 font-medium">
                                        Limited Time Offers - <span className="text-white font-bold">UP TO {getAverageDiscount()}% OFF</span>
                                    </p>
                                    <Percent className="h-4 w-4 text-yellow-400" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {hotDealCourses.map((course) => (
                                <CourseCard key={course.id} course={course} onKnowMore={() => onKnowMore(course)} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Bestseller Section */}
            {bestsellerCourses.length > 0 && (
                <section className="py-10 px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto mb-8 flex items-center justify-center gap-3">
                        <Award className="h-6 w-6 text-yellow-500" />
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Bestsellers</h2>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {bestsellerCourses.map((course) => (
                            <CourseCard key={course.id} course={course} onKnowMore={() => onKnowMore(course)} />
                        ))}
                    </motion.div>
                </section>
            )}

            {/* Regular Courses Section */}
            <section id="courses-section" className="py-10 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto mb-8 flex items-center justify-center gap-3">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">All Courses</h2>
                </motion.div>

                {isLoading ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center justify-center gap-4">
                        <Loader className="w-8 h-8 text-purple-400 animate-spin" />
                        <p className="text-lg text-gray-400">Loading courses...</p>
                    </motion.div>
                ) : filteredCourses.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <p className="text-xl text-gray-400">No courses found matching your search.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredCourses
                            .filter((course) => !course.hotdeal && !course.bestSeller)
                            .map((course) => (
                                <CourseCard key={course.id} course={course} onKnowMore={() => onKnowMore(course)} />
                            ))}
                    </motion.div>
                )}
            </section>
        </>
    );
}
