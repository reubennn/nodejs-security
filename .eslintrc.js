module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        es2020: true,
        node: true,
        commonjs: true
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
        },
    },
    extends: [
        "eslint:recommended",
        'plugin:prettier/recommended',
        'prettier'
    ],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": 0,
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-console": [
            "warn",
            { "allow": ["log", "clear", "info", "error", "dir", "trace"] }
        ]
    },
};