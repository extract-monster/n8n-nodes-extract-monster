import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ExtractMonsterApi implements ICredentialType {
	name = 'extractMonsterApi';
	displayName = 'Extract Monster API';
	documentationUrl = 'https://extract.monster/docs/essentials/getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Extract Monster API key. Get it from your dashboard at extract.monster',
			placeholder: 'em_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.extract.monster',
			url: '/me',
			method: 'GET',
		},
	};
}
