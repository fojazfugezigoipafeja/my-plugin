(() => {
var plugin = (function (metro, patcher) {
  'use strict';

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

  return plugin;

})(vendetta.metro, vendetta.patcher);
return plugin.default || plugin;
})()
