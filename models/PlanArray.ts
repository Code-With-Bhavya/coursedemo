import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
    icon: "star" | "zap" | "crown";
    color: string;
    gradient: string;
    buttonText: string;
    badge?: string;
}

const SinglePlanSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    popular: { type: Boolean, default: false },
    icon: { type: String, enum: ["star", "zap", "crown"], required: true },
    color: { type: String, required: true },
    gradient: { type: String, required: true },
    buttonText: { type: String, required: true },
    badge: { type: String, default: null },
});

const PlanArraySchema: Schema = new Schema({
    plans: { type: [SinglePlanSchema], required: true },
});

export default mongoose.models.PlanArray || mongoose.model("PlanArray", PlanArraySchema);
