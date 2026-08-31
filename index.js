(function(metro,patcher){'use strict';const UserStore = metro.findByProps("getCurrentUser");
let unpatch;
var index = {
    onLoad: () => {
        if (!UserStore)
            return;
        unpatch = patcher.instead("getCurrentUser", UserStore, (args, orig) => {
            const user = orig(...args);
            if (user) {
                return new Proxy(user, {
                    get(target, prop) {
                        if (prop === "username" || prop === "globalName")
                            return "Relapse";
                        return target[prop];
                    }
                });
            }
            return user;
        });
    },
    onUnload: () => {
        if (unpatch)
            unpatch();
    }
};return index;})(metro,patcher);