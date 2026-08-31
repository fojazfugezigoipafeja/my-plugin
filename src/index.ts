mkdir -p src && cat << 'EOF' > src/index.ts
import { findByStore } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const UserStore = findByStore("UserStore");

// Set your Target ID and new names here
const TARGET_ID = "1536517857092051014";
const FAKE_DISPLAY_NAME = "91";
const FAKE_USERNAME = "91";

let unpatch: () => void;

export default {
    onLoad: () => {
        unpatch = after("getCurrentUser", UserStore, (_, user) => {
            if (user && user.id === TARGET_ID) {
                user.globalName = FAKE_DISPLAY_NAME;
                user.username = FAKE_USERNAME;
            }
        });
    },
    onUnload: () => {
        if (unpatch) unpatch();
    }
};
EOF
pnpm build
