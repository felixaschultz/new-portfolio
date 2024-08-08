import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

/* const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}); */

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AnalyticsSchema = new Schema([
    {
        date: {
            type: Date,
            default: Date.now
        },
        data: [
            {
                event: {
                    type: String,
                    required: true,
                    enum: ["PageView", "Login", "Signup", "Click"]
                },
                title: {
                    type: String,
                    required: true
                },
                uniqueViews: [
                    {
                        view: {
                            type: Number,
                            default: 0
                        },
                        uniqueUser: {
                            type: String,
                        }
                    }
                ],
                totalViews: {
                    type: Number,
                    default: 0
                },
                landingPage: [{
                    path: {
                        type: String,
                    },
                    pageTitle: {
                        type: String,
                    },
                    referrer: {
                        type: String,
                    },
                    views: {
                        type: Number,
                        default: 0
                    },
                }],
                timeSpendOnPage: {
                    type: Number,
                    default: 0
                },
                device: [
                    {
                        browser: {
                            type: String,
                            required: true
                        },
                        language: {
                            type: String,
                            required: true
                        },
                        userAgent: {
                            type: String,
                            required: true
                        },
                        screenSize: {
                            type: String,
                            required: true
                        },
                        devicePixelRatio: {
                            type: Number,
                            required: true
                        },
                        platform: {
                            type: String,
                            required: true
                        },
                        osVersion: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    }
]);

export const models = [
    {
        name: "Project",
        schema: projectSchema,
        collection: "projects",
    },
    {
        name: "Analytics",
        schema: AnalyticsSchema,
        collection: "analytics",
    }
]