// Copyright (C) Atlas City Global <https://atlascity.io>
// This file is part of vuex-orm-plugin-lokijs <https://github.com/atlascity/vuex-orm-plugin-lokijs>.
//
// vuex-orm-plugin-lokijs is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// vuex-orm-plugin-lokijs is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with vuex-orm-plugin-lokijs.  If not, see <http://www.gnu.org/licenses/>.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import AES from 'crypto-js/aes';
function encrypt(data, password) {
    try {
        return AES.encrypt(JSON.stringify(data), password).toString();
    }
    catch (exception) {
        throw new Error(exception.message);
    }
}
var $update = function (context) {
    return function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var collectionName, password, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collectionName = this.name;
                        password = payload.password;
                        if (this.AES) {
                            this.AES.forEach(function (key) {
                                if (payload.data[key] && !password) {
                                    throw new Error("attempted to update an encrypted field \"" + key + "\" without providing password");
                                }
                                if (payload.data[key]) {
                                    payload.data[key] = encrypt(payload.data[key], password);
                                }
                            });
                        }
                        collection = context.loki.getCollection(collectionName);
                        if (typeof payload.where === 'function') {
                            collection.updateWhere(payload.where, function (item) {
                                return Object.assign(item, payload.data);
                            });
                        }
                        else {
                            console.error("data has not been put into loki, use vuexorm where() filter function when you do updates:\n\n        User.update({\n          where: (record) => {\n            return record.id === 2\n          },\n\n          data: { age: 24 }\n        })\n\n      ");
                        }
                        return [4 /*yield*/, this.update(payload)];
                    case 1:
                        result = _a.sent();
                        context.loki.saveDatabase();
                        return [2 /*return*/];
                }
            });
        });
    };
};
export default $update;
//# sourceMappingURL=Update.js.map