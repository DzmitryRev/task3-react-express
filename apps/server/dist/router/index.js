"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const auth_mw_1 = __importDefault(require("../middlewares/auth-mw"));
const router = (0, express_1.Router)();
router.post('/signup', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), user_controller_1.default.signup);
router.post('/signin', user_controller_1.default.signin);
router.post('/signout', user_controller_1.default.signout);
router.get('/users', auth_mw_1.default, user_controller_1.default.getUsers);
router.put('/users/block', auth_mw_1.default, user_controller_1.default.toggleBlockUsers);
router.post('/users/delete', auth_mw_1.default, user_controller_1.default.deleteUsers);
router.get('/refresh', user_controller_1.default.refresh);
exports.default = router;
