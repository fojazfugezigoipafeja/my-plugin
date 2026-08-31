'use strict';

var metro = require('@vendetta/metro');
var patcher = require('@vendetta/patcher');

let unpatch;
const plugin = {
  onLoad: () => {
    const UserStore = metro.findByProps("getCurrentUser");
    if (!UserStore) return;
    unpatch = patcher.instead("getCurrentUser", UserStore, (args, orig) => {
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

module.exports = plugin;
