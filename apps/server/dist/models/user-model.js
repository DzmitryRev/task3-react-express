"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, default: 'active' },
    registrationDate: { type: String, required: true, default: new Date().toLocaleString('en-US') },
    lastVisitDate: { type: Date, default: null },
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
