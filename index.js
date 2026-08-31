import {findByProps}from'@vendetta/metro';import {instead}from'@vendetta/patcher';let unpatch;
var index = {
    onLoad: () => {
        const UserStore = findByProps("getCurrentUser");
        if (!UserStore)
            return;
        unpatch = instead("getCurrentUser", UserStore, (args, orig) => {
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
};export{index as default};