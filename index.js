var plugin = (function (metro, patcher) {
    'use strict';

    let unpatch;
    const plugin = {
        onLoad: () => {
            const UserStore = metro.findByProps("getCurrentUser");
            if (!UserStore)
                return;
            unpatch = patcher.instead("getCurrentUser", UserStore, (args, orig) => {
                const user = orig(...args);
                if (!user)
                    return user;
                // Return a safe object copy to prevent frozen object Proxy crashes
                return Object.assign({}, user, {
                    username: "Relapse",
                    globalName: "Relapse",
                });
            });
        },
        onUnload: () => {
            if (unpatch)
                unpatch();
        }
    };

    return plugin;

})(vendetta.metro, vendetta.patcher);
module.exports = plugin.default || plugin;
