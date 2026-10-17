import tsParser from '@typescript-eslint/parser';
import reactNative from 'eslint-plugin-react-native';

export default [
  { ignores: ['node_modules/**', 'dist*/**', '.expo/**', '.agents/**'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-native': reactNative },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-single-element-style-arrays': 'error',
    },
  },
  {
    files: [
      'src/app/**/*.tsx',
      'src/pages/**/*.tsx',
      'src/shared/ui/**/*.tsx',
      'src/features/explore-examples/ui/*.tsx',
    ],
    rules: {
      'react-native/no-color-literals': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="nestedScrollEnabled"]',
          message:
            'Catalog screens must use one scrolling owner. Keep nested scrolling inside explicit native component demonstrations.',
        },
        {
          selector:
            'JSXElement[openingElement.name.name=/^(ScrollView|FlatList|SectionList)$/] JSXElement[openingElement.name.name=/^(ScrollView|FlatList|SectionList)$/]',
          message:
            'Do not nest catalog scroll containers. Present secondary content in a separate screen or sheet.',
        },
      ],
    },
  },
];
