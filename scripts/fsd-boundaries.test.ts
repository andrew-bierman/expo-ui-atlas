import { expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import ts from 'typescript';

const root = resolve('src');
const layers = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];
function files(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const full = resolve(path, entry.name);
    return entry.isDirectory()
      ? files(full)
      : /\.(ts|tsx)$/.test(full)
        ? [full]
        : [];
  });
}
function checkBoundary(source: string, target: string): string | undefined {
  const from = relative(root, source).split(sep);
  const to = relative(root, target).split(sep);
  const fromLayer = layers.indexOf(from[0] ?? '');
  const toLayer = layers.indexOf(to[0] ?? '');
  if (fromLayer < 0 || toLayer < 0) return;
  if (toLayer > fromLayer) return 'imports a higher layer';
  const sameSlice = from[0] === to[0] && from[1] === to[1];
  if (
    fromLayer === toLayer &&
    !sameSlice &&
    !['app', 'shared'].includes(from[0] ?? '')
  )
    return 'cross-imports a sibling slice';
  if (
    !sameSlice &&
    to[0] !== 'app' &&
    to.length > 2 &&
    !/^index(?:\.(?:ios|android|native|web))?(?:\.tsx?)?$/.test(to[2] ?? '')
  )
    return 'bypasses a public entrypoint';
}
test('FSD rejects upward imports, sibling slice coupling, and private imports', () => {
  expect(
    checkBoundary(
      resolve(root, 'entities/item/model/a.ts'),
      resolve(root, 'features/edit/index'),
    ),
  ).toBe('imports a higher layer');
  expect(
    checkBoundary(
      resolve(root, 'pages/a/ui/a.tsx'),
      resolve(root, 'pages/b/index'),
    ),
  ).toBe('cross-imports a sibling slice');
  expect(
    checkBoundary(
      resolve(root, 'pages/a/ui/a.tsx'),
      resolve(root, 'entities/item/model/types'),
    ),
  ).toBe('bypasses a public entrypoint');
  expect(
    checkBoundary(
      resolve(root, 'pages/a/ui/a.tsx'),
      resolve(root, 'entities/item'),
    ),
  ).toBeUndefined();
});
test('source imports follow FSD layer and public API boundaries', () => {
  const violations: string[] = [];
  for (const path of files(root)) {
    expect(layers).toContain(relative(root, path).split(sep)[0] ?? '');
    const source = ts.createSourceFile(
      path,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    function visit(node: ts.Node) {
      const literal =
        ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
          ? node.moduleSpecifier
          : ts.isCallExpression(node) &&
              (node.expression.getText(source) === 'require' ||
                node.expression.kind === ts.SyntaxKind.ImportKeyword)
            ? node.arguments[0]
            : undefined;
      if (
        literal &&
        ts.isStringLiteral(literal) &&
        literal.text.startsWith('.')
      ) {
        const target = resolve(dirname(path), literal.text);
        const violation = checkBoundary(path, target);
        if (violation)
          violations.push(
            `${relative(root, path)} ${violation}: ${literal.text}`,
          );
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  expect(violations).toEqual([]);
});
