// "use client";

// import { useRef, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Star, Clock, Award, Users, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import type { Course } from "@/types/plan";

// interface CourseModalProps {
//     course: Course;
//     onClose: () => void;
// }

// export default function CourseModal({ course, onClose }: CourseModalProps) {
//     const modalRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleEscape = (e: KeyboardEvent) => {
//             if (e.key === "Escape") {
//                 onClose();
//             }
//         };

//         const handleClickOutside = (e: MouseEvent) => {
//             if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//                 onClose();
//             }
//         };

//         document.addEventListener("keydown", handleEscape);
//         document.addEventListener("mousedown", handleClickOutside);

//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [onClose]);

//     // Magical reveal animation variants
//     const backdropVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { duration: 0.3 },
//         },
//         exit: {
//             opacity: 0,
//             transition: { delay: 0.2, duration: 0.3 },
//         },
//     };

//     const modalVariants = {
//         hidden: {
//             opacity: 0,
//             y: 20,
//         },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.2,
//             },
//         },
//         exit: {
//             opacity: 0,
//             y: 20,
//             transition: { duration: 0.2 },
//         },
//     };

//     // Magical glow animation
//     const glowVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 0.5,
//             transition: {
//                 duration: 0.5,
//             },
//         },
//     };

//     return (
//         <AnimatePresence>
//             <motion.div
//                 key="backdrop"
//                 variants={backdropVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//                 {/* Magical glow effect */}
//                 <motion.div variants={glowVariants} initial="hidden" animate="visible" className="absolute inset-0 pointer-events-none flex items-center justify-center">
//                     <div className="w-96 h-96 rounded-full bg-purple-600/30 blur-3xl" />
//                 </motion.div>

//                 <motion.div
//                     ref={modalRef}
//                     variants={modalVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     className="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-b from-purple-950/90 to-black/95 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl">
//                     {/* Close button */}
//                     <motion.button
//                         onClick={onClose}
//                         className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}>
//                         <X className="h-5 w-5" />
//                     </motion.button>

//                     <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
//                         {/* Left side - Image and basic info */}
//                         <div className="md:w-2/5 relative">
//                             <div className="relative h-53 md:h-full">
//                                 <Image src={course.image || "/placeholder.svg"} alt={course.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-contain" priority />
//                                 <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-purple-950/90 via-purple-900/70 to-transparent" />

//                                 {/* Mobile view info overlay */}
//                                 <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
//                                     <div className="flex items-center mb-2">
//                                         {Array.from({ length: 5 }).map((_, i) => (
//                                             <Star key={i} className={`h-4 w-4 ${i < course.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
//                                         ))}
//                                         <span className="ml-2 text-sm text-gray-300">{course.rating.toFixed(1)}</span>
//                                     </div>
//                                     <h2 className="text-xl font-bold">{course.title}</h2>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right side - Content */}
//                         <div className="md:w-3/5 p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-16rem)] md:max-h-[90vh]">
//                             {/* Desktop view info - hidden on mobile */}
//                             <div className="hidden md:block mb-4">
//                                 <div className="flex items-center mb-2">
//                                     {Array.from({ length: 5 }).map((_, i) => (
//                                         <Star key={i} className={`h-5 w-5 ${i < course.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
//                                     ))}
//                                     <span className="ml-2 text-gray-300">{course.rating.toFixed(1)}</span>
//                                 </div>
//                                 <h2 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h2>
//                             </div>

//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//                                 <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
//                                     <Clock className="h-5 w-5 text-purple-400 mr-2" />
//                                     <span className="text-sm text-gray-300">{course.duration}</span>
//                                 </motion.div>
//                                 <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
//                                     <Award className="h-5 w-5 text-purple-400 mr-2" />
//                                     <span className="text-sm text-gray-300">{course.level}</span>
//                                 </motion.div>
//                                 <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
//                                     <Users className="h-5 w-5 text-purple-400 mr-2" />
//                                     <span className="text-sm text-gray-300">{course.students} students</span>
//                                 </motion.div>
//                             </div>

//                             <div className="mb-6">
//                                 <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About this course</h3>
//                                 <p className="text-gray-300 mb-4 line-clamp-3 whitespace-normal break-words">{course.fullDescription}</p>

//                                 <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">What you&apos;ll learn</h3>
//                                 <ul className="space-y-2 mb-4">
//                                     {course.learningPoints.map((point, index) => (
//                                         <motion.li key={index} className="flex items-start" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}>
//                                             <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
//                                             <span className="text-gray-300">{point}</span>
//                                         </motion.li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div className="flex flex-wrap gap-2 mb-6">
//                                 {course.tags.map((tag, index) => (
//                                     <motion.span
//                                         key={index}
//                                         className="text-xs px-2 py-1 rounded-full bg-purple-900/60 text-purple-200"
//                                         whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.5)" }}>
//                                         {tag}
//                                     </motion.span>
//                                 ))}
//                             </div>

//                             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//                                 <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group">
//                                     <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
//                                     Buy Now for ₹{course.price}
//                                 </Button>
//                             </motion.div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </motion.div>
//         </AnimatePresence>
//     );
// }
