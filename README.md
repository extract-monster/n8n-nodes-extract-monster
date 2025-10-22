# n8n-nodes-extract-monster

This is an n8n community node that lets you use [Extract Monster](https://extract.monster) in your n8n workflows.

Extract Monster is a powerful API for extracting structured data from documents, images, and text using advanced AI models.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-extract-monster` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

### Manual Installation

To install manually, navigate to your n8n installation folder and run:

```bash
npm install n8n-nodes-extract-monster
```

## Operations

### Extract From File
Extract structured data from files including:
- PDF documents
- Images (PNG, JPG, etc.)
- Word documents
- Spreadsheets
- And more

### Extract From Text
Extract structured data from plain text input.

Both operations support optional JSON schemas to define the exact structure of data you want to extract.

## Credentials

To use this node, you need an Extract Monster API key:

1. Sign up at [extract.monster](https://extract.monster)
2. Go to your dashboard
3. Generate a new API key
4. Copy the key (it starts with `em_`)

Then in n8n:
1. Go to **Credentials**
2. Create new **Extract Monster API** credentials
3. Paste your API key

## Compatibility

- Minimum n8n version: 0.196.0
- Tested against n8n version: 1.0.0+

## Usage

### Basic File Extraction

1. Add a file input node (e.g., HTTP Request, Google Drive, etc.)
2. Connect it to the Extract Monster node
3. Select **Extract From File** operation
4. Configure credentials
5. Execute the workflow

### With JSON Schema

Define exactly what data you want to extract:

```json
{
  "invoice_number": {"type": "string"},
  "date": {"type": "string"},
  "total": {"type": "number"},
  "items": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "description": {"type": "string"},
        "quantity": {"type": "number"},
        "price": {"type": "number"}
      }
    }
  }
}
```

### Text Extraction Example

1. Add an input node with text data
2. Connect to Extract Monster node
3. Select **Extract From Text** operation
4. Enter or map the text field
5. Optionally add a schema to define structure
6. Execute

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Extract Monster Documentation](https://extract.monster/docs)
* [Extract Monster API Reference](https://extract.monster/docs/developers/api-reference)

## Support

For issues with the n8n node:
- Create an issue on [GitHub](https://github.com/extract-monster/n8n-nodes-extract-monster/issues)

For Extract Monster API support:
- Email: support@extract.monster
- Documentation: https://extract.monster/docs

## License

[MIT](LICENSE.md)
