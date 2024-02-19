import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "role"
    },
    permission: {
        type: Array,
        default: [
            {
                "name": "Hotels",
                "rules": {
                    "modify": false,
                    "view": true
                }
            },
            {
                "name": "Packages",
                "rules": {
                    "modify": false,
                    "view": true
                }
            },
            {
                "name": "Users",
                "rules": {
                    "modify": false,
                    "view": true
                }
            },
            {
                "name": "Roles",
                "rules": {
                    "modify": false,
                    "view": true
                }
            },
            {
                "name": "Bookings",
                "rules": {
                    "modify": false,
                    "view": true
                }
            }
        ]
    }
}, { timestamps: true });

export default mongoose.model("Role",RoleSchema);