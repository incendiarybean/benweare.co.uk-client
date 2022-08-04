const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                width: "width",
            },
            height: {
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
            maxHeight: {
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
            minWidth: {
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
        },
    },
    plugins: [],
};
