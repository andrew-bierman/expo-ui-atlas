import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

const roots = {
  universal: 'node_modules/@expo/ui/build/universal/index.d.ts',
  swiftui: 'node_modules/@expo/ui/build/swift-ui/index.d.ts',
  compose: 'node_modules/@expo/ui/build/jetpack-compose/index.d.ts',
};
export function readInventory() {
  const program = ts.createProgram(Object.values(roots), {
    skipLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
  });
  const checker = program.getTypeChecker();
  return Object.fromEntries(
    Object.entries(roots).map(([family, path]) => {
      const source = program.getSourceFile(path);
      const symbol = source && checker.getSymbolAtLocation(source);
      if (!symbol)
        throw new Error(`Cannot read installed Expo UI exports: ${path}`);
      const names = checker
        .getExportsOfModule(symbol)
        .filter((s) => {
          const resolved =
            s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s;
          return Boolean(resolved.flags & ts.SymbolFlags.Value);
        })
        .map((s) => s.name)
        .sort();
      return [family, names];
    }),
  ) as Record<string, string[]>;
}
if (import.meta.main) {
  const inventory = {
    version: JSON.parse(
      await Bun.file(resolve('node_modules/@expo/ui/package.json')).text(),
    ).version,
    families: readInventory(),
  };
  writeFileSync(
    'src/entities/catalog-entry/data/inventory.json',
    `${JSON.stringify(inventory, null, 2)}\n`,
  );
}
