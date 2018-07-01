module.exports = {
	// process.cwd()在哪个路径下启动node返回哪个路径
	root: process.cwd(),
	hostname: '127.0.0.1',
	port: '9527',
	// 对下列后缀名的文件进行压缩
	compress: /\.(html|js|css|md)/,
	cache: {
		maxAge: 600,
		
	}
};
console.log('root'+process.cwd());
