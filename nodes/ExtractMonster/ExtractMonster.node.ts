import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import FormData from 'form-data';

export class ExtractMonster implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Extract Monster',
		name: 'extractMonster',
		icon: 'file:extractmonster.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'AI-powered data extraction from PDFs, images, documents, audio, and video. Extract invoices, receipts, forms, tables, and custom data with flexible JSON schemas.',
		defaults: {
			name: 'Extract Monster',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'extractMonsterApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'File Extraction',
						value: 'extractFile',
						description: 'Extract structured data from PDF, images, or documents',
						action: 'Extract data from file',
					},
					{
						name: 'Text Extraction',
						value: 'extractText',
						description: 'Extract structured data from plain text input',
						action: 'Extract data from text',
					},
				],
				default: 'extractFile',
			},
			// File input method selection
			{
				displayName: 'Input Method',
				name: 'inputMethod',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['extractFile'],
					},
				},
				options: [
					{
						name: 'From Previous Node',
						value: 'binary',
						description: 'Use file from a previous node (e.g., Read Binary File, HTTP Request)',
					},
					{
						name: 'File Path',
						value: 'path',
						description: 'Specify a file path on the server',
					},
				],
				default: 'binary',
				description: 'Choose how to provide the file',
			},
			// Binary property option
			{
				displayName: 'Input Binary Field',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				displayOptions: {
					show: {
						operation: ['extractFile'],
						inputMethod: ['binary'],
					},
				},
				description: 'The name of the field containing the file from the previous node. Usually "data".',
				hint: 'Connect a "Read Binary File" or "HTTP Request" node before this one',
				placeholder: 'data',
			},
			// File path option
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['extractFile'],
						inputMethod: ['path'],
					},
				},
				description: 'Full path to the file on the server',
				placeholder: '/path/to/invoice.pdf',
			},
			// Extract from Text options
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['extractText'],
					},
				},
				description: 'The text to extract structured data from',
				placeholder: 'e.g. Invoice #12345 dated 2024-01-15 for $500.00',
			},
			// Common options
			{
				displayName: 'Use JSON Schema',
				name: 'useSchema',
				type: 'boolean',
				default: false,
				description: 'Whether to provide a JSON schema to define the structure of extracted data',
			},
			{
				displayName: 'JSON Schema',
				name: 'jsonSchema',
				type: 'json',
				default: '{\n  "field_name": {\n    "type": "string"\n  }\n}',
				required: true,
				displayOptions: {
					show: {
						useSchema: [true],
					},
				},
				description: 'JSON schema defining the structure of data to extract. Example: {"invoice_number": {"type": "string"}, "total": {"type": "number"}}',
				placeholder: '{"field_name": {"type": "string"}}',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Output Field Name',
						name: 'outputFieldName',
						type: 'string',
						default: 'extracted_data',
						description: 'Name of the field to store extracted data in the output',
					},
					{
						displayName: 'Include Metadata',
						name: 'includeMetadata',
						type: 'boolean',
						default: true,
						description: 'Whether to include metadata like filename, file type, and status in the output',
					},
					{
						displayName: 'Simplify',
						name: 'simplify',
						type: 'boolean',
						default: true,
						description: 'Whether to return a simplified version of the response instead of the raw data',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		const useSchema = this.getNodeParameter('useSchema', 0) as boolean;

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('extractMonsterApi');
				const apiKey = credentials.apiKey as string;
				const options = this.getNodeParameter('options', i, {}) as {
					outputFieldName?: string;
					includeMetadata?: boolean;
					simplify?: boolean;
				};
				const outputFieldName = options.outputFieldName || 'extracted_data';
				const includeMetadata = options.includeMetadata !== false;
				const simplify = options.simplify !== false;

				let schema: string | undefined;
				if (useSchema) {
					const jsonSchema = this.getNodeParameter('jsonSchema', i) as string;
					schema = typeof jsonSchema === 'string' ? jsonSchema : JSON.stringify(jsonSchema);
				}

				let response: any;

				if (operation === 'extractFile') {
					// Extract from file
					const inputMethod = this.getNodeParameter('inputMethod', i, 'binary') as string;
					const formData = new FormData();

					let fileBuffer;
					let fileName: string;
					let mimeType: string | undefined;

					if (inputMethod === 'binary') {
						// Get file from previous node
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						fileBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
						fileName = binaryData.fileName || 'file';
						mimeType = binaryData.mimeType;
					} else {
						// Get file from path
						let filePath = this.getNodeParameter('filePath', i) as string;

						try {
							const readFile = require('fs').promises.readFile;
							const path = require('path');
							const os = require('os');

							// Expand ~ to home directory
							if (filePath.startsWith('~/')) {
								filePath = path.join(os.homedir(), filePath.slice(2));
							} else if (filePath === '~') {
								filePath = os.homedir();
							}

							fileBuffer = await readFile(filePath);
							fileName = path.basename(filePath);
							mimeType = 'application/octet-stream'; // Let server determine actual type
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							throw new NodeOperationError(
								this.getNode(),
								`Failed to read file: ${errorMessage}`,
								{ itemIndex: i },
							);
						}
					}

					formData.append('file', fileBuffer, {
						filename: fileName,
						contentType: mimeType,
					});

					// Add schema if provided
					if (schema) {
						formData.append('schema', schema);
					}

					// Make request using httpRequest which handles FormData better
					const requestOptions = {
						method: 'POST' as const,
						url: 'https://api.extract.monster/v1/extract/file',
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							...formData.getHeaders(),
						},
						body: formData,
					};

					response = await this.helpers.httpRequest(requestOptions);
				} else if (operation === 'extractText') {
					// Extract from text
					const text = this.getNodeParameter('text', i) as string;

					// Build form-encoded body (API expects form data, not JSON)
					const formBody = new URLSearchParams();
					formBody.append('text', text);

					// Add schema if provided
					if (schema) {
						formBody.append('schema', schema);
					}

					// Make request
					response = await this.helpers.httpRequest({
						method: 'POST',
						url: 'https://api.extract.monster/v1/extract/text',
						headers: {
							'Authorization': `Bearer ${apiKey}`,
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: formBody.toString(),
					});
				}

				// Handle response
				if (response.status === 'error') {
					const errorCode = response.error_code || 'unknown_error';
					throw new NodeOperationError(
						this.getNode(),
						`The API returned an error: ${errorCode}`,
						{ 
							itemIndex: i,
							description: 'Check your schema format and input data. Verify your API key is valid and has sufficient credits.',
						},
					);
				}

				// Build output data
				const outputData: any = {};

				if (includeMetadata) {
					outputData.status = response.status;
					if (response.filename) outputData.filename = response.filename;
					if (response.file_type) outputData.file_type = response.file_type;
				}

				// Add extracted data
				const extractedData = response.extracted_data || {};
				
				if (simplify && typeof extractedData === 'object' && extractedData !== null) {
					// Return simplified version with only the extracted data
					outputData[outputFieldName] = extractedData;
				} else {
					// Return full response
					outputData[outputFieldName] = extractedData;
					if (!simplify && response.raw_response) {
						outputData.raw_response = response.raw_response;
					}
				}

				returnData.push({
					json: outputData,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
