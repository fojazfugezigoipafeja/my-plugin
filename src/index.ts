// @ts-ignore
const { findByProps } = vendetta.metro;
// @ts-ignore
const { instead } = vendetta.patcher;

const UserStore = findByProps("getCurrentUser");
let unpatch: any;

export default {
  onLoad: () => {
    if (!UserStore) return;
    unpatch = instead("getCurrentUser", UserStore, (args: any, orig: any) => {
      const user = orig(...args);
      if (user) {
        return new Proxy(user, {
          get(target: any, prop: string) {
            if (prop === "username" || prop === "globalName") return "Relapse";
            return target[prop];
          }
        });
      }
      return user;
    });
  },
  onUnload: () => {
    if (unpatch) unpatch();
  }
};
