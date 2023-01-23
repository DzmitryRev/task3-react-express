"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.id = model.id;
    }
}
exports.default = UserDto;
