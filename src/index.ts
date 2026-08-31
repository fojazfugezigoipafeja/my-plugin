// Do NOT use: import { findByProps } from "@vendetta/metro";
// Do NOT use: import { instead } from "@vendetta/patcher";

// Access metro & patcher via the global vendetta/revenge object:
const { metro, patcher } = (window as any).vendetta;
const { findByProps } = metro;
const { instead } = patcher;

let unpatch: (() => void) | undefined;

export default {
  onLoad: () => {
    const UserStore = findByProps("getCurrentUser");
    if (!UserStore) return;

    unpatch = instead("getCurrentUser", UserStore, (args, orig) => {
      const user = orig(...args);
      if (user) {
        return {
          ...user,
          username: "Relapse",
          globalName: "Relapse",
        };
      }
      return user;
    });
  },
  onUnload: () => {
    if (unpatch) unpatch();
  },
};
