module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
				"es6": true,
				"node": true
		},
		"parser": 'babel-eslint',
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015
		},
		"globals":{
		},
    "rules": {
        "indent": [
            "error",
            "tab"
				],
				"no-console": "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
