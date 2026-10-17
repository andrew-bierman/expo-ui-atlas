#!/usr/bin/env python3
"""Build a public notice inventory from license-checker-rseidelsohn JSON.

Regenerate input after `bun install --frozen-lockfile`:
bunx license-checker-rseidelsohn@5.0.1 --production --json \
  --excludePrivatePackages --customPath scripts/legal/license-format.json \
  > .expo/qa-receipts/production-licenses.json
python3 scripts/legal/build-notices.py

Publisher/email/path metadata is deliberately excluded. Copyright-holder contact
details inside verbatim license text must remain part of that notice.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INPUT = ROOT / '.expo/qa-receipts/production-licenses.json'
OUTPUT = ROOT / 'docs/dependency-notices.md'
METRO_SOURCE = 'https://raw.githubusercontent.com/react/metro/v0.87.1/LICENSE'
HERMES_SOURCE = ('https://raw.githubusercontent.com/facebook/hermes/'
                 'd412d3bd851278712c20cca25d094e32641a0465/LICENSE')


def main():
    packages = json.loads(INPUT.read_text())
    groups = {}
    unresolved = []
    rows = []
    for name, metadata in sorted(packages.items()):
        package_dir = Path(metadata.get('path', ''))
        text = metadata.get('licenseText') or ''
        source = 'Installed package license text'
        if not text and name.startswith('metro-') and name.endswith('@0.87.1'):
            text = (ROOT / 'scripts/legal/upstream/metro-v0.87.1-LICENSE.txt').read_text()
            source = METRO_SOURCE
        if not text and name == 'hermes-compiler@260318099.0.4':
            text = (ROOT / 'scripts/legal/upstream/hermes-LICENSE.txt').read_text()
            source = HERMES_SOURCE + ' (commit from published npm version gitHead)'
        notices = []
        if package_dir.is_dir():
            for file in sorted(package_dir.iterdir()):
                if file.is_file() and 'notice' in file.name.lower():
                    notice = file.read_text(errors='strict')
                    if notice not in text:
                        notices.append((file.name, notice))
        # Only byte-identical complete license/NOTICE combinations share a section.
        key = (text, tuple(notices))
        if text:
            if key not in groups:
                groups[key] = {'id': len(groups) + 1, 'packages': []}
            group = groups[key]
            group['packages'].append((name, source))
            target = f'[Notice {group["id"]}](#notice-{group["id"]})'
        else:
            unresolved.append(name)
            target = '**UNRESOLVED — no complete notice in installed package**'
        license_id = str(metadata.get('licenses', 'UNKNOWN')).replace('|', '\\|')
        rows.append(f'| `{name}` | {license_id} | {target} |')

    output = [
        '# Dependency licenses and notices',
        '',
        'Generated from the installed, lockfile-resolved production dependency graph using '
        '`license-checker-rseidelsohn@5.0.1`. Regenerate with the commands in '
        '`scripts/legal/build-notices.py`; do not edit generated notice text.',
        '',
        'This graph includes transitive build tools (including Metro and TypeScript). '
        'It is an inclusive source dependency inventory, not an audit of an iOS/Android '
        'archive or proof that every listed package ships in an app. Native SDK and '
        'final archive notices still require verification. License identifiers are '
        'package declarations, not a legal compatibility determination.',
        '',
        'Package publisher/email metadata and local filesystem paths are omitted. '
        'Required copyright/contact details inside original license notices are preserved. '
        'Identical complete notices are shared by reference; distinct copyright text '
        'and additional NOTICE files remain separate.',
        '',
        f'Packages: {len(packages)}. Complete notice groups: {len(groups)}. '
        f'Unresolved package notices: {len(unresolved)}.',
        '',
        '## Unresolved notices',
        '',
    ]
    for name in unresolved:
        output.append(f'- `{name}`: package declares a license but supplies no complete '
                      'license text in the installed distribution. No replacement boilerplate '
                      'has been inferred. Obtain the exact applicable upstream notice before '
                      'claiming a complete distribution audit.')
    output += ['', '## Package index', '', '| Package | Declared license | Full text |',
               '| --- | --- | --- |', *rows, '', '## Full notices', '']
    for (text, notices), group in groups.items():
        output += [f'### Notice {group["id"]}', '']
        for name, source in group['packages']:
            output.append(f'- `{name}` — {source}')
        output += ['', '````text', text.rstrip('\n'), '````', '']
        for filename, notice in notices:
            output += [f'Additional `{filename}`:', '', '````text',
                       notice.rstrip('\n'), '````', '']
    OUTPUT.write_text('\n'.join(output))
    print(f'{len(packages)} packages; {len(groups)} groups; unresolved: {", ".join(unresolved)}')


if __name__ == '__main__':
    main()
