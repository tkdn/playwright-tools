module.exports = {
    env: {
        es2020: true,
        node: true,
        browser: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                bracketSpacing: true,
                printWidth: 120,
                semi: true,
                singleQuote: false,
                tabWidth: 4,
                trailingComma: "all",
                useTabs: false,
            },
        ],
    },
};
