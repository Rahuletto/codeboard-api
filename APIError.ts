export type errOptions = {
	function: string;
	error: string;
};

export class APIError extends Error {
	/**
	 * Emit errors and provide sufficient details to help users debug easily
	 * @param {String} function
	 * @param {String} error
	 */

	constructor(options: errOptions = { function: "Generic", error: "Placeholder" }) {
		const msg = `\x1b[35mCodeBoard\x1b[0m - \x1b[31m[FatalError]:\x1b[0m ${options.error.toString()}`;
		super(msg);
	}
}

Object.defineProperty(APIError.prototype, 'name', {
	value: ''
});