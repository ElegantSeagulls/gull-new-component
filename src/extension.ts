import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as path from 'path'
import * as fs from 'fs';

// Called when extension activated (very first time command executed)
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.gull-component', async (selectedFolder: any) => {
		let pathToFile = selectedFolder && (selectedFolder.fsPath || selectedFolder.path);

		if (!pathToFile) return;

		const imports: vscode.QuickPickItem[] = [
			{
				label: 'React',
				description: 'import React from \'react\';',
				picked: true,
			},
			{
				label: 'Styled Components',
				description: 'import styled from \'styled-components\';',
				picked: true,
			},
			{
				label: 'Prop Types',
				description: 'import PropTypes from \'prop-types\';',
			},
			{
				label: 'Axios',
				description: 'import axios from \'axios\';',
			}
		];

		// Grab component name from user.
		let componentName = await vscode.window.showInputBox();

		// Null or undefined means user hit escape, empty is invalid too
		if (!componentName || componentName.length <= 0) return;

		// Filter name.
		componentName = _.upperFirst(_.camelCase(_.deburr(componentName)));

		// QuickPickOptions for dialog.
		const importOptions: vscode.QuickPickOptions = {
			canPickMany: true,
		};

		// Fetch choices.
		const importResponse =  await vscode.window.showQuickPick(imports, importOptions);

		var fakeComponent: String = '';

		// Add imports to file contents.
		importResponse && Object.keys(importResponse).forEach((key: string, index: number) => {
			const { description } = imports[index];

			fakeComponent += `${description}\n`;
		});

		// Actual component.
		if (importResponse && Object.keys(importResponse).length > 0) {
			fakeComponent += '\n';
		}

		fakeComponent += `const ${componentName} = (props) => (\n\n`;
		fakeComponent += ');\n\n';
    fakeComponent += `export default ${componentName};\n`;

		// Write to selected path.
		try {
			const newPath = path.resolve(pathToFile, componentName);

			fs.writeFileSync(`${newPath}.js`, fakeComponent);
		} catch (writeError) {
			console.log('Error creating new Gull Component.');
		}
	});
test
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
