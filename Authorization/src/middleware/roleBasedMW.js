import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function RoleBasedVerification(roles) {
    return async (req, res, next) => {
        try {
            // Extract token from cookies or authorization header
            const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(400).json({ msg: "Token not found" });
            }

            // Verify token
            const decoded = jwt.verify(token, "SECRET-KEY");

            // Fetch user from database
            const user = await User.findById(decoded.id);
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ msg: "Forbidden: You do not have access to this resource" });
            }

            // Attach user to request object
            req.user = user;

            // Proceed to next middleware or route handler
            next();
        } catch (error) {
            console.error("Role verification error:", error);
            return res.status(500).json({ msg: "Server error" });
        }
    };
}
