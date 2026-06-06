import admin from "../config/firebase.js";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const googleLogin = async (req,res)=>{
    try{
        const {idToken} = req.body;

        if(!idToken){
            return res.status(400).json({message:"ID token is required"});
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const {email, name, picture} = decodedToken;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                photo: picture,
            });
        }

        const token = jwt.sign(
            { userId: user._id,
                role: user.role,
             },
             process.env.JWT_SECRET, 
             { expiresIn: "7d" }
        );

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error in googleLogin:", error);
        res.status(500).json({ message: "Authentication failed" });
    }
}