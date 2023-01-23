"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const user_model_1 = __importDefault(require("../models/user-model"));
const api_error_util_1 = __importDefault(require("../utils/api-error-util"));
const hash_service_1 = __importDefault(require("./hash-service"));
const token_service_1 = __importDefault(require("./token-service"));
class UserService {
    signup(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield user_model_1.default.findOne({ email });
            if (newUser)
                throw api_error_util_1.default.BadRequest('Такой email уже зарегистрирован');
            const hashPassword = yield hash_service_1.default.hashPassword(password);
            const user = yield user_model_1.default.create({ name, email, password: hashPassword });
            const userDto = new user_dto_1.default({ name: user.name, email: user.email, id: user._id.toString() });
            const tokens = token_service_1.default.generateTokens(userDto);
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw api_error_util_1.default.BadRequest('Пользователь с таким email не найден');
            }
            yield hash_service_1.default.compareHash(user.password, password);
            const userDto = new user_dto_1.default({ name: user.name, email: user.email, id: user._id.toString() });
            const tokens = token_service_1.default.generateTokens(userDto);
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    signout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find({}, { password: 0 });
            return users;
        });
    }
    deleteUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.deleteMany({ _id: { $in: ids } });
            return ids;
        });
    }
    toggleBlockUsers(ids, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.updateMany({ _id: { $in: ids } }, { $set: { status } });
            return ids;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_util_1.default.UnauthorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_util_1.default.UnauthorizedError();
            }
            const user = yield user_model_1.default.findById(tokenFromDb.user);
            if (!user) {
                throw api_error_util_1.default.BadRequest('Такого пользователя нет');
            }
            const userDto = new user_dto_1.default({ name: user.name, email: user.email, id: user._id.toString() });
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
}
exports.default = new UserService();
