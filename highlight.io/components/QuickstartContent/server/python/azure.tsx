import { QuickStartContent } from '../../QuickstartContent'
import { verifyLogs } from '../shared-snippets-logging'
import { frontendInstallSnippet } from '../shared-snippets-monitoring'
import { verifyTraces } from '../shared-snippets-tracing'
import { downloadSnippet, init } from './shared-snippets-monitoring'

export const PythonAzureReorganizedContext: QuickStartContent = {
	title: 'Python Azure Functions',
	subtitle: 'Learn how to set up highlight.io with Azure Functions.',
	logoKey: 'azure',
	products: ['Errors', 'Logs', 'Traces'],
	entries: [
		frontendInstallSnippet,
		downloadSnippet(),
		{
			title: 'Initialize the Highlight SDK.',
			content:
				'Setup the SDK. Add the `@observe_handler` decorator to your azure functions.',
			code: [
				{
					text: `import azure.functions as func

import highlight_io
from highlight_io.integrations.azure import observe_handler

${init}


@observe_handler
def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "This HTTP triggered function executed successfully.",
        status_code=200,
    )
`,
					language: 'python',
				},
			],
		},
		{
			title: 'Verify your installation.',
			content:
				'Check that your installation is valid by throwing an error. ' +
				'Add an operation that raises an exception to your azure function. ' +
				'Setup an HTTP trigger and visit your azure function on the internet. ' +
				'You should see a `DivideByZero` error in the [Highlight errors page](https://app.highlight.io/errors) ' +
				'within a few moments.',
			code: [
				{
					text: `import azure.functions as func

import highlight_io
from highlight_io.integrations.azure import observe_handler

${init}


@observe_handler
def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        f"Not a good idea: {5 / 0}.",
    )
`,
					language: 'python',
				},
			],
		},
		verifyLogs,
		verifyTraces,
	],
}
