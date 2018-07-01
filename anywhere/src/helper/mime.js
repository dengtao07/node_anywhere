const path = require('path');
const mimeTypes = {
	'.css': 'text/css',
	// '.css': {
	// 	text: 'text/css',
	// 	icon: 'url'
	// },
	'.gif': 'image/gif',
	'.html': 'text/html',
	'.ico': 'image/x-icon',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.swf': 'application/x-shockwave-flash',
	'.tiff': 'image/tiff',
	'.txt': 'text/plain',
	'.wav': 'audio/x-wav',
	'.wma': 'audio/x-ms-wma',
	'.wmv': 'video/x-ms-wmv',
	'.xml':	'text/xml'
};

module.exports = (filePath) => {
	// 有可能出现这样的：a.b.js,
	let ext = path.extname(filePath);
	// 如果没有拓展名，就返回路径
	if (!ext) {
		ext = filePath;
	}
	// 如果有对应的后缀名，返回相应的type；没有则返回纯文本
	return mimeTypes[ext] || mimeTypes['.txt'];
};

