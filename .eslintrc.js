module.exports = {
    //lint 環境
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
        "jest": true
    },
    'extends': 'airbnb-base',
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        /*
          'off' 或 0 - 关闭规则
          'warn' 或 1 - 开启规则，使用警告级别的错误：warn
          'error' 或 2 - 开启规则，使用错误级别的错误：error
        */
        'indent': [2, 4, { 'SwitchCase': 1 }],
        // 強制使用單引號
        'quotes': [2, 'single'],
        // airbnb 不允許使用 console ，這邊打開
        'no-console': 0,
        'class-methods-use-this': 0,
        // allow underscore
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'strict': 0,
        'max-len': [1, { "code": 140, "tabWidth": 4 }],
        'camelcase': 1,
        'no-unused-vars': 1,
        'no-unused-expressions': [2, {
            'allowShortCircuit': false,
            'allowTernary': true
        }],
        'brace-style': [2, 'stroustrup'],
        'import/no-unresolved': 0,
        // 因為性能測試是透過網頁，網頁的import要有副檔名 .js
        'import/extensions': [2, 'always'],
        'no-param-reassign': 1,
        // 不使用 array destructuring
        'prefer-destructuring': 0,
        // 部分情境下會使用到
        'import/prefer-default-export': 1,
        // 保留 continue 使用
        'no-continue': 1,
        // 允許提升 functions & classes
        'no-use-before-define': [2, { "functions": false, "classes": false }],
        // 使用 Windows /r/n
        'linebreak-style': ["error", "windows"]
    },
    // 告知 lint 有這些 global variable
    'globals': {
        'wz3': false,
        'cc': false,
        'Editor': false,
        'jsb': false,
        'CC_EDITOR': false,
        'CC_PREVIEW': false,
        'CC_DEV': false,
        'CC_DEBUG': false,
        'CC_BUILD': false,
        'CC_JSB': false,
        'CC_TEST': false,
        'Immutable': false,
    }
};
