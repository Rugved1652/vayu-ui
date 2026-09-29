import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { allEntries } from 'vayu-ui-registry';
import { fileURLToPath } from 'node:url';
const client = new Client({ name: 'vayu-integration-tests', version: '1.0.0' });
before(async () =>
  client.connect(
    new StdioClientTransport({
      command: process.execPath,
      args: [fileURLToPath(new URL('../bin/vayu-ui-mcp.js', import.meta.url))],
    }),
  ),
);
after(async () => client.close());
const call = async (name, args) => {
  const response = await client.callTool({ name, arguments: args });
  assert.ok(!response.isError, `${name}: ${JSON.stringify(response)}`);
  return JSON.parse(response.content[0].text);
};
test('advertises all 17 tools and guidance during initialization', async () => {
  assert.equal((await client.listTools()).tools.length, 17);
  assert.match(client.getInstructions(), /Typography/);
});
test('discovery and design tokens work', async () => {
  for (const args of [{}, { type: 'component' }, { type: 'hook' }])
    await call('list_components', args);
  await call('find_component', { query: 'dialog with a close button' });
  await call('get_design_tokens', {});
});
test('all component and hook detail tools return data for their registry entries', async () => {
  for (const entry of allEntries) {
    for (const tool of [
      'get_component_summary',
      'get_component_example',
      'get_component_do_not',
      'get_component_dependencies',
      'get_install_guide',
      'scaffold_component_usage',
    ])
      await call(tool, { slug: entry.slug });
    for (const tag of new Set(entry.examples.flatMap((example) => example.tags ?? [])))
      await call('get_component_example', { slug: entry.slug, tag });
    const tools =
      entry.type === 'hook'
        ? ['get_hook_details']
        : [
            'get_component_props',
            'get_component_variants',
            'get_component_states',
            'get_component_events',
            'get_component_a11y',
            'get_component_peer_components',
            'get_component_composition',
          ];
    for (const tool of tools) await call(tool, { slug: entry.slug });
  }
});
test('source imports follow configuration; package mode is explicit', async () => {
  const source = await call('get_install_guide', {
    slug: 'modal',
    fromFile: 'app/page.tsx',
    config: { paths: { components: 'lib/widgets' } },
  });
  assert.equal(source.imports[0], "import { Modal } from '../lib/widgets/Modal';");
  const shared = await call('get_install_guide', {
    slug: 'button',
    config: { aliases: { components: '@repo/ui/components' } },
  });
  assert.equal(shared.imports[0], "import { Button } from '@repo/ui/components/Button';");
  const pkg = await call('get_install_guide', { slug: 'button', mode: 'package' });
  assert.equal(pkg.imports[0], "import { Button } from 'vayu-ui';");
  const scaffold = await call('scaffold_component_usage', { slug: 'modal' });
  assert.match(scaffold.code, /<Modal.Content>/);
  assert.match(scaffold.code, /Typography.P/);
  assert.ok(!scaffold.code.includes("from 'vayu-ui'"));
});
test('unknown items and unsupported variants are actionable tool errors', async () => {
  for (const name of [
    'get_component_summary',
    'get_install_guide',
    'scaffold_component_usage',
    'get_hook_details',
  ]) {
    assert.equal((await client.callTool({ name, arguments: { slug: 'missing' } })).isError, true);
  }
  assert.equal(
    (
      await client.callTool({
        name: 'scaffold_component_usage',
        arguments: { slug: 'modal', size: 'giant' },
      })
    ).isError,
    true,
  );
  assert.equal(
    (
      await client.callTool({
        name: 'scaffold_component_usage',
        arguments: { slug: 'button', features: ['missing'] },
      })
    ).isError,
    true,
  );
});
