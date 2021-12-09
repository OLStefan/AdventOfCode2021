export function getCommands(lines: Array<string>) {
	return lines.map((text) => {
		const [command, value] = text.split(' ') as [string, string];
		return { command, value: parseInt(value) };
	});
}
