const {createGzip, createDeflate} = require('zlib');

module.exports = (rs, req, res) => {
	// 先从请求中读取接受的压缩方式
	const acceptEncoding = req.headers['accept-encoding'];
	// 查看是否支持压缩以及是否有这两种压缩方式
	if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
		return rs;
	} else if (acceptEncoding.match(/\bgzip\b/)) {
		res.setHeader('Content-Encoding', 'gzip');
		return rs.pipe(createGzip());
	} else if (acceptEncoding.match(/\bdeflate\b/)) {
		res.setHeader('Content-Encoding', 'deflate');
		return rs.pipe(createDeflate());
	}
};
