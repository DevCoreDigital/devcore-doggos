module.exports.handler = (event, context, callback) => {
	callback(null, {
		isBase64Encoded: false,
		statusCode: 200,
		body: JSON.stringify({
			healthy: true
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}); 
};