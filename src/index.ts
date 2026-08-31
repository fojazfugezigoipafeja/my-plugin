import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch: (() => void) | undefined;

const plugin = {
  onLoad: () => {
    const UserStore = findByProps("getCurrentUser");
    if (!UserStore) return;

    unpatch = instead("getCurrentUser", UserStore, (args, orig) => {
      const user = orig(...args);
      if (!user) return user;
      
      // Return a safe object copy to prevent frozen object Proxy crashes
      return Object.assign({}, user, {
        username: "Relapse",
        globalName: "Relapse",
      });
    });
  },
  onUnload: () => {
    if (unpatch) unpatch();
  }
};

export default plugin;
