var metro = require('@vendetta/metro');
var patcher = require('@vendetta/patcher');

mkdir - p;
src && cat << 'EOF' > src / index.ts;
const UserStore = metro.findByStore("UserStore");
// Set your Target ID and new names here
const TARGET_ID = "1536517857092051014";
const FAKE_DISPLAY_NAME = "91";
const FAKE_USERNAME = "91";
let unpatch;
var index$1 = {
    onLoad: () => {
        unpatch = patcher.after("getCurrentUser", UserStore, (_, user) => {
            if (user && user.id === TARGET_ID) {
                user.globalName = FAKE_DISPLAY_NAME;
                user.username = FAKE_USERNAME;
            }
        });
    },
    onUnload: () => {
        if (unpatch)
            unpatch();
    }
};
EOF;
pnpm;
build;

module.exports = index$1;
