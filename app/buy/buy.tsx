// "use client";

// import type React from "react";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import {
//   QrCode,
//   Shield,
//   CheckCircle,
//   Upload,
//   AlertTriangle,
//   Send,
//   Loader2,
//   ExternalLink,
//   Copy,
//   Check,
//   MessageCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { toast } from "@/components/ui/use-toast";
// import { useRouter, useSearchParams } from "next/navigation";

// const uploadToCloudinary = async (file: File): Promise<string> => {
//   const url = "https://api.cloudinary.com/v1_1/daunyqttb/upload";
//   const preset = "learnpreset";

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", preset);

//   const res = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Failed to upload image to Cloudinary");
//   }

//   const data = await res.json();
//   return data.secure_url; // This is the uploaded image URL
// };

// export default function BuyPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const courseid = searchParams.get("id") as string; // Get course ID from URL queryx
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [showVerifyForm, setShowVerifyForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [upiCopied, setUpiCopied] = useState(false);
//   const [formData, setFormData] = useState({
//     upiName: "",
//     courseid: courseid,
//     telegramUsername: "",
//     screenshot: null as File | null,
//   });
//   const [previewUrl, setPreviewUrl] = useState<string>("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const upiId = "ydvdevil4@axl";
//   const recipientName = "Pranav Kumar";
//   const supportLink = "https://t.me/csytSupport_bot";

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       toast({
//         title: "Invalid file type",
//         description: "Please upload an image file (JPG, PNG, etc.)",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "File too large",
//         description: "Please upload an image smaller than 5MB",
//         variant: "destructive",
//       });
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       screenshot: file,
//     }));

//     // Create preview URL
//     const objectUrl = URL.createObjectURL(file);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//     }
//     setPreviewUrl(objectUrl);
//   };

//   const copyUpiId = async () => {
//     try {
//       await navigator.clipboard.writeText(upiId);
//       setUpiCopied(true);
//       toast({
//         title: "UPI ID Copied!",
//         description: "UPI ID has been copied to clipboard",
//       });
//       setTimeout(() => setUpiCopied(false), 2000);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       toast({
//         title: "Copy failed",
//         description: "Please copy the UPI ID manually",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleVerifyClick = () => {
//     setShowVerifyForm(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.upiName.trim()) {
//       toast({
//         title: "UPI Name Required",
//         description: "Please enter your UPI registered name",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.telegramUsername.trim()) {
//       toast({
//         title: "Telegram Username Required",
//         description: "Please enter your Telegram username",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.telegramUsername.startsWith("@")) {
//       toast({
//         title: "Invalid Telegram Username",
//         description: "Telegram username should start with @",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.screenshot) {
//       toast({
//         title: "Payment Screenshot Required",
//         description: "Please upload your payment screenshot",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setIsUploading(true);

//     try {
//       // Upload image to Cloudinary first
//       const imageUrl = await uploadToCloudinary(formData.screenshot);
//       setIsUploading(false);

//       // Send JSON data to API
//       const response = await fetch("/api/buy_courses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           upiName: formData.upiName,
//           courseid: formData.courseid,
//           telegramUsername: formData.telegramUsername,
//           screenshotUrl: imageUrl,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsSuccess(true);
//       } else {
//         toast({
//           title: "Submission Failed",
//           description: data.message || "Please try again or contact support",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting payment verification:", error);
//       if (isUploading) {
//         toast({
//           title: "Upload Failed",
//           description: "Failed to upload screenshot. Please try again.",
//           variant: "destructive",
//         });
//       } else {
//         toast({
//           title: "Network Error",
//           description: "Please check your connection and try again",
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
//             Complete Your Purchase
//           </h1>
//           <p className="text-gray-300">Secure payment via UPI</p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto">
//           <AnimatePresence mode="wait">
//             {!showVerifyForm ? (
//               /* Payment Section */
//               <motion.div
//                 key="payment"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid md:grid-cols-2 gap-8"
//               >
//                 {/* QR Code Section */}
//                 <Card className="bg-gradient-to-b from-purple-950/40 to-black/90 border-purple-500/20">
//                   <CardHeader className="text-center">
//                     <CardTitle className="flex items-center justify-center gap-2 text-purple-300">
//                       <QrCode className="h-5 w-5" />
//                       Scan QR Code
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="text-center space-y-4">
//                     <div className="relative mx-auto w-64 h-64 bg-white rounded-lg p-4">
//                       <Image
//                         src="/qr.jpg"
//                         alt="Payment QR Code"
//                         fill
//                         className="object-contain rounded-lg"
//                         priority
//                       />
//                     </div>
//                     <p className="text-sm text-gray-400">
//                       Scan this QR code with any UPI app
//                     </p>
//                   </CardContent>
//                 </Card>

//                 {/* Payment Details Section */}
//                 <Card className="bg-gradient-to-b from-purple-950/40 to-black/90 border-purple-500/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2 text-purple-300">
//                       <Shield className="h-5 w-5" />
//                       Payment Details
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-3">
//                       <div>
//                         <Label className="text-sm text-gray-400">UPI ID</Label>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="flex-1 bg-black/50 px-3 py-2 rounded border border-purple-500/30 text-purple-300 font-mono">
//                             {upiId}
//                           </code>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={copyUpiId}
//                             className="border-purple-500/30 hover:bg-purple-800/20"
//                           >
//                             {upiCopied ? (
//                               <Check className="h-4 w-4" />
//                             ) : (
//                               <Copy className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </div>
//                       </div>

//                       <div>
//                         <Label className="text-sm text-gray-400">
//                           Recipient Name
//                         </Label>
//                         <div className="bg-black/50 px-3 py-2 rounded border border-purple-500/30 mt-1">
//                           <span className="text-white font-medium">
//                             {recipientName}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <Alert className="border-amber-500/30 bg-amber-950/20">
//                       <AlertTriangle className="h-4 w-4 text-amber-500" />
//                       <AlertDescription className="text-amber-200">
//                         Make sure to complete the payment before clicking
//                         &quot;Verify Now&quot;
//                       </AlertDescription>
//                     </Alert>

//                     <Button
//                       onClick={handleVerifyClick}
//                       className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
//                       size="lg"
//                     >
//                       <CheckCircle className="h-5 w-5 mr-2" />
//                       Verify Now
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ) : isSuccess ? (
//               /* Success Screen */
//               <motion.div
//                 key="success"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="max-w-md mx-auto bg-gradient-to-b from-green-950/40 to-black/90 border-green-500/20 text-center">
//                   <CardContent className="p-8 space-y-6">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{
//                         delay: 0.2,
//                         type: "spring",
//                         stiffness: 200,
//                       }}
//                     >
//                       <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
//                     </motion.div>

//                     <div className="space-y-2">
//                       <h2 className="text-2xl font-bold text-green-400">
//                         Verification Submitted!
//                       </h2>
//                     </div>

//                     <Alert className="border-blue-500/30 bg-blue-950/20 text-left">
//                       <MessageCircle className="h-4 w-4 text-blue-400" />
//                       <AlertDescription className="text-blue-200">
//                         Thank you for your purchase! We are currently verifying
//                         your payment. Please check your Telegram in a few
//                         minutes for Course Access
//                       </AlertDescription>
//                     </Alert>

//                     <Button
//                       onClick={() => router.push("/")}
//                       className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                       size="lg"
//                     >
//                       Back to Home
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ) : (
//               /* Verification Form */
//               <motion.div
//                 key="verification"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="max-w-2xl mx-auto bg-gradient-to-b from-purple-950/40 to-black/90 border-purple-500/20">
//                   <CardHeader>
//                     <CardTitle className="text-center text-purple-300">
//                       Payment Verification
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {/* Warning Alert */}
//                     <Alert className="mb-6 border-red-500/30 bg-red-950/20">
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                       <AlertDescription className="text-red-200">
//                         <strong>Important:</strong> Please ensure all details
//                         are correct. Incorrect information may delay your course
//                         access.
//                       </AlertDescription>
//                     </Alert>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                       {/* UPI Name */}
//                       <div>
//                         <Label htmlFor="upiName" className="text-white">
//                           UPI Registered Name *
//                         </Label>
//                         <Input
//                           id="upiName"
//                           name="upiName"
//                           value={formData.upiName}
//                           onChange={handleInputChange}
//                           placeholder="e.g., Pranav Kumar"
//                           required
//                           className="mt-1 bg-black/50 border-purple-500/30 focus:border-purple-500 text-white"
//                         />
//                         <p className="text-xs text-gray-400 mt-1">
//                           Enter the exact name registered with your UPI account
//                         </p>
//                       </div>

//                       {/* Telegram Username */}
//                       <div>
//                         <Label
//                           htmlFor="telegramUsername"
//                           className="text-white"
//                         >
//                           Telegram Username *
//                         </Label>
//                         <Input
//                           id="telegramUsername"
//                           name="telegramUsername"
//                           value={formData.telegramUsername}
//                           onChange={handleInputChange}
//                           placeholder="e.g., @Devil"
//                           required
//                           className="mt-1 bg-black/50 border-purple-500/30 focus:border-purple-500 text-white"
//                         />
//                         <p className="text-xs text-gray-400 mt-1">
//                           We&apos;ll contact you here for course access
//                         </p>
//                       </div>

//                       {/* Screenshot Upload */}
//                       <div>
//                         <Label className="text-white">
//                           Payment Screenshot *
//                         </Label>
//                         <div
//                           className="mt-1 border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500/50 transition-colors"
//                           onClick={() => fileInputRef.current?.click()}
//                         >
//                           {previewUrl ? (
//                             <div className="space-y-2">
//                               <div className="relative w-32 h-32 mx-auto">
//                                 <Image
//                                   src={previewUrl || "/placeholder.svg"}
//                                   alt="Payment screenshot preview"
//                                   fill
//                                   className="object-cover rounded-lg"
//                                 />
//                               </div>
//                               <p className="text-sm text-green-400">
//                                 Screenshot uploaded
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 Click to change
//                               </p>
//                             </div>
//                           ) : (
//                             <div className="space-y-2">
//                               <Upload className="h-8 w-8 mx-auto text-purple-400" />
//                               <p className="text-purple-300">
//                                 Upload Payment Screenshot
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 Click here or drag and drop your screenshot
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                         <input
//                           ref={fileInputRef}
//                           type="file"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           className="hidden"
//                           required
//                         />
//                         <p className="text-xs text-gray-400 mt-1">
//                           Upload a clear screenshot of your payment confirmation
//                         </p>
//                       </div>

//                       {/* Support Link */}
//                       <Alert className="border-blue-500/30 bg-blue-950/20">
//                         <MessageCircle className="h-4 w-4 text-blue-400" />
//                         <AlertDescription className="text-blue-200">
//                           Having issues? Contact our support:{" "}
//                           <a
//                             href={supportLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-300 hover:text-blue-200 underline inline-flex items-center gap-1"
//                           >
//                             Telegram Support
//                             <ExternalLink className="h-3 w-3" />
//                           </a>
//                         </AlertDescription>
//                       </Alert>

//                       {/* Action Buttons */}
//                       <div className="flex gap-4">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => setShowVerifyForm(false)}
//                           className="flex-1 border-purple-500/30 hover:bg-purple-800/20"
//                           disabled={isSubmitting}
//                         >
//                           Back
//                         </Button>
//                         <Button
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                         >
//                           {isUploading ? (
//                             <>
//                               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                               Uploading Screenshot...
//                             </>
//                           ) : isSubmitting ? (
//                             <>
//                               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                               Submitting...
//                             </>
//                           ) : (
//                             <>
//                               <Send className="h-4 w-4 mr-2" />
//                               Submit Verification
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-12 text-gray-400"
//         >
//           <p className="text-sm">
//             Secure payment processing • Your data is protected
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
