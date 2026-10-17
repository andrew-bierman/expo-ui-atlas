import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { readInventory } from '../../scripts/ui-inventory';
import { catalog } from './catalog';
import { supportExports } from './coverage';
import inventory from './inventory.json';

test('installed public runtime exports match the reviewed SDK inventory', () => {
  expect(readInventory()).toEqual(inventory.families);
});
test('every runtime export has catalog coverage or an explicit support-context explanation', () => {
  for (const [family, exports] of Object.entries(inventory.families)) {
    const covered = new Set(
      catalog.filter((e) => e.family === family).flatMap((e) => e.exports),
    );
    const missing = exports.filter(
      (name) => !covered.has(name) && !supportExports[family]?.[name],
    );
    expect({ family, missing }).toEqual({ family, missing: [] });
  }
});
test('metadata and platform renderer registrations stay in sync', () => {
  const registrations = [
    ['universal', 'src/examples/universal/index.tsx', 'universalExamples', ''],
    ['swiftui', 'src/examples/native/index.ios.tsx', 'nativeExamples', ''],
    [
      'compose',
      'src/examples/native/index.android.tsx',
      'specimens',
      'compose-',
    ],
  ];
  for (const [family, path, variable, prefix] of registrations) {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    let ids: string[] = [];
    function visit(node: ts.Node) {
      if (
        ts.isVariableDeclaration(node) &&
        node.name.getText(source) === variable &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        ids = node.initializer.properties.map(
          (p) =>
            `${prefix}${p.name?.getText(source).replace(/^['"]|['"]$/g, '')}`,
        );
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    expect(ids.sort()).toEqual(
      catalog
        .filter((e) => e.family === family)
        .map((e) => e.id)
        .sort(),
    );
  }
});
