module.exports = {
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
  extends: [
    'next',
    '@react-native-community/eslint-config', // Default RN config
    'standard-with-typescript',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Required for Standard plugin
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 0, // Turn off prettier
    // Recommended rules
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'error',
    'react-native/no-single-element-style-arrays': 'warn',
    'object-curly-spacing': 'error',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        allowMultiline: true,
        children: true,
      },
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    semi: ['error', 'never'],
    // Indent with 2 spaces
    indent: ['error', 2],
    // Indent JSX with 2 spaces
    'react/jsx-indent': ['error', 2],
    // Indent props with 2 spaces
    'react/jsx-indent-props': ['error', 2],
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/triple-slash-reference': 0,
  },
}
