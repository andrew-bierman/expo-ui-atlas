import { expect, test } from 'bun:test';
import { ESLint } from 'eslint';

const lint = new ESLint();
const filePath = 'src/pages/lint-fixture/ui/screen.tsx';

test('native UI lint rejects nested catalog scrolling and hardcoded colors', async () => {
  const [result] = await lint.lintText(
    `import { ScrollView, View } from 'react-native';
     export default function Screen() {
       return <ScrollView><ScrollView><View style={{backgroundColor: '#ff0000'}} /></ScrollView></ScrollView>;
     }`,
    { filePath },
  );
  const rules = result?.messages.map((message) => message.ruleId);
  expect(rules).toContain('no-restricted-syntax');
  expect(rules).toContain('react-native/no-color-literals');
});

test('native UI lint forbids nested scrolling on chrome but allows intentional specimens', async () => {
  const source = `import { ScrollView, View } from 'react-native';
    export default function Screen() {
      return <ScrollView nestedScrollEnabled><View style={{backgroundColor: '#ff0000'}} /></ScrollView>;
    }`;
  const [chrome] = await lint.lintText(source, { filePath });
  expect(chrome?.messages.map((message) => message.ruleId)).toContain(
    'no-restricted-syntax',
  );
  const [specimen] = await lint.lintText(source, {
    filePath:
      'src/features/explore-examples/ui/specimens/universal/lint-fixture.tsx',
  });
  expect(specimen?.messages).toEqual([]);
});

test('native UI lint permits a single scrolling owner with layout spacing', async () => {
  const [result] = await lint.lintText(
    `import { ScrollView, View } from 'react-native';
     export default function Screen() {
       return <ScrollView contentInsetAdjustmentBehavior="automatic"><View style={{padding: 16}} /></ScrollView>;
     }`,
    { filePath },
  );
  expect(result?.messages).toEqual([]);
});
