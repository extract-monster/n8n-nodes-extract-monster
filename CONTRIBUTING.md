# Contributing to n8n-nodes-extract-monster

Thank you for your interest in contributing! We welcome contributions from the community.

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/extract-monster/n8n-nodes-extract-monster.git
cd n8n-nodes-extract-monster
```

2. Install dependencies:
```bash
npm install
```

3. Build the node:
```bash
npm run build
```

4. Link to your n8n installation for testing:
```bash
npm link
cd ~/.n8n/custom
npm link n8n-nodes-extract-monster
```

## Development Workflow

1. Make your changes in the `credentials/` or `nodes/` directories
2. Build: `npm run build`
3. Test in your local n8n instance
4. Run linter: `npm run lint`
5. Format code: `npm run format`

## Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and descriptive

## Testing

Before submitting a PR:

1. Test both operations (Extract From File and Extract From Text)
2. Test with and without JSON schemas
3. Test error handling
4. Verify credentials work correctly

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Questions?

Feel free to open an issue for any questions or concerns.
