export interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  duration: string
  description: string
  features: string[]
  popular: boolean
  icon: "star" | "zap" | "crown"  // Use string for custom icons
  color: string
  gradient: string
  buttonText: string
  badge?: string
}