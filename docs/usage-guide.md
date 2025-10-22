# Extract Monster Node Usage Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Operations](#operations)
- [JSON Schemas](#json-schemas)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Getting Started

The Extract Monster node allows you to extract structured data from files and text using AI-powered extraction.

### Prerequisites
- An Extract Monster API key (sign up at [extract.monster](https://extract.monster))
- n8n instance (v0.196.0 or higher)

## Authentication

1. In n8n, go to **Credentials** → **New**
2. Search for "Extract Monster API"
3. Enter your API key (starts with `em_`)
4. Test the connection
5. Save

Your API key can be found in your Extract Monster dashboard.

## Operations

### Extract From File

Extracts structured data from various file formats:
- **PDF documents**
- **Images** (PNG, JPG, TIFF, etc.)
- **Word documents** (.docx, .doc)
- **Excel spreadsheets** (.xlsx, .xls)
- **Scanned documents**

**Configuration:**
- **Input Data Field Name**: The binary property name containing the file (default: `data`)
- **Use JSON Schema**: Optional - define the structure you want
- **JSON Schema**: Your schema definition (if enabled)

### Extract From Text

Extracts structured data from plain text input.

**Configuration:**
- **Text**: The text to extract from (can be mapped from previous nodes)
- **Use JSON Schema**: Optional - define the structure you want
- **JSON Schema**: Your schema definition (if enabled)

## JSON Schemas

JSON schemas tell Extract Monster exactly what data to extract and in what format.

### Basic Schema Format

```json
{
  "field_name": {
    "type": "string|number|boolean|array|object"
  }
}
```

### Examples

#### Contact Information
```json
{
  "name": {"type": "string"},
  "email": {"type": "string"},
  "phone": {"type": "string"},
  "company": {"type": "string"}
}
```

#### Invoice
```json
{
  "invoice_number": {"type": "string"},
  "date": {"type": "string"},
  "total": {"type": "number"},
  "vendor": {"type": "string"},
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

#### Receipt
```json
{
  "merchant_name": {"type": "string"},
  "date": {"type": "string"},
  "total": {"type": "number"},
  "payment_method": {"type": "string"}
}
```

## Examples

### Example 1: Extract Data from PDF Invoice

1. **HTTP Request Node**: Download PDF
2. **Extract Monster Node**: 
   - Operation: Extract From File
   - Enable JSON Schema
   - Define invoice structure
3. **Process Results**: Use extracted data in subsequent nodes

### Example 2: Extract Contact Info from Text

1. **Webhook/Trigger**: Receive text input
2. **Extract Monster Node**:
   - Operation: Extract From Text
   - Map text from previous node
   - Define contact schema
3. **Database Node**: Store extracted contacts

### Example 3: Batch Process Documents

1. **Google Drive Node**: List files in folder
2. **Loop Node**: Iterate over files
3. **Extract Monster Node**: Extract from each file
4. **Google Sheets Node**: Store results

## Error Handling

The node handles errors gracefully:

### Common Errors

**Invalid API Key (401)**
- Verify your API key is correct
- Check if key has expired
- Ensure key is not disabled

**Quota Exceeded (429)**
- Wait for quota reset (shown in error)
- Upgrade your plan at extract.monster

**Unsupported File Type (400)**
- Check file format is supported
- Verify file is not corrupted

**Invalid Schema**
- Validate JSON schema syntax
- Ensure schema follows correct format

### Continue on Fail

Enable "Continue On Fail" in node settings to:
- Process remaining items even if one fails
- Capture errors in output for logging
- Maintain workflow execution

## Best Practices

### 1. Use JSON Schemas
Always define schemas for predictable, structured output.

### 2. Handle Binary Data
Ensure file data is properly passed:
```javascript
// In previous node, ensure binary data is available
// Use correct field name in Extract Monster node
```

### 3. Optimize File Size
- Compress large files before processing
- Split large documents into pages if possible
- Use appropriate file formats (PDF for documents, PNG/JPG for images)

### 4. Error Handling
- Always enable "Continue On Fail" for batch processing
- Log errors for debugging
- Implement retry logic for transient failures

### 5. API Quota Management
- Monitor your quota usage
- Implement rate limiting for high-volume workflows
- Cache results when possible

### 6. Schema Design
- Keep schemas focused and specific
- Use appropriate data types
- Include descriptions for complex fields
- Test schemas with sample data first

## Advanced Usage

### Dynamic Schemas
Map schemas from previous nodes:
```json
// In Edit Fields node, build schema dynamically
{
  "schema": "={{$json.dynamicSchema}}"
}
```

### Conditional Processing
Use Switch/IF nodes to process different file types differently.

### Result Transformation
Use Edit Fields or Code nodes to transform extracted data into desired format.

## Troubleshooting

### Files Not Processing
- Check binary data field name matches configuration
- Verify file format is supported
- Ensure file size is within limits

### Incorrect Extraction
- Refine JSON schema to be more specific
- Add descriptions to schema fields
- Test with multiple sample files

### Performance Issues
- Process files in batches
- Use appropriate file formats
- Consider file size optimization

## Support

- **Documentation**: https://extract.monster/docs
- **Email**: support@extract.monster
- **GitHub Issues**: Report node-specific issues on GitHub
