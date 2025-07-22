const sharedConfig = require('@repo/tailwind-config')

module.exports = {
    presets : [sharedConfig],
    content : [
        "./**/*.{js,ts,jsx,tsx}",
    ],
};