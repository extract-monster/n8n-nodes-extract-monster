const eslintPluginN8nNodesBase = require('eslint-plugin-n8n-nodes-base');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**', '*.js'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		plugins: {
			'n8n-nodes-base': eslintPluginN8nNodesBase,
		},
		rules: {
			...eslintPluginN8nNodesBase.configs.community.rules,
			'n8n-nodes-base/node-param-default-missing': 'off',
		},
	},
];
