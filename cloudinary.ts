// cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: 'daunyqttb', 
    api_key: '959786933277458', 
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;
