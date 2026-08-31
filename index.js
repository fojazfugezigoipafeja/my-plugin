var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_metro = require("@vendetta/metro");
var import_patcher = require("@vendetta/patcher");
var unpatch;
var plugin = {
  onLoad: () => {
    const UserStore = (0, import_metro.findByProps)("getCurrentUser");
    if (!UserStore) return;
    unpatch = (0, import_patcher.instead)("getCurrentUser", UserStore, (args, orig) => {
      const user = orig(...args);
      if (!user) return user;
      return Object.assign({}, user, {
        username: "Relapse",
        globalName: "Relapse"
      });
    });
  },
  onUnload: () => {
    if (unpatch) unpatch();
  }
};
var index_default = plugin;
