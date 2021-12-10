export function findCorruptedCharacter(line: string) {
	const expectedCharacters: Array<string> = [];

	for (let char of line.split('')) {
		switch (char) {
			case '(':
				expectedCharacters.push(')');
				break;
			case '[':
				expectedCharacters.push(']');
				break;
			case '{':
				expectedCharacters.push('}');
				break;
			case '<':
				expectedCharacters.push('>');
				break;
			default: {
				const expected = expectedCharacters.pop();
				if (char !== expected) {
					return char;
				}
			}
		}
	}

	return undefined;
}
