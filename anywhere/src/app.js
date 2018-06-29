const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/router');

// const server = http.createServer((req, res) => {
// 	const filePath = path.join(conf.root, req.url);
// 	fs.stat(filePath, (err, stats) => {
// 		if (err) {
// 			res.statusCode = 404;
// 			res.setHeader('Content-type', 'text/plain');
// 			res.end(`${filePath} is not a directory or not found!`);
// 			return;
// 		}
// 		if(stats.isFile()) {
// 			res.statusCode = 200;
// 			res.setHeader('Content-type', 'text/plain');
// 			fs.createReadStream(filePath).pipe(res);
// 		} else if(stats.isDirectory()) {
// 			fs.readdir(filePath, (err, files) => {
// 				res.statusCode = 200;
// 				res.setHeader('Content-type', 'text/plain');
// 				res.end(files.join(','));
// 			});
// 		}
// 	});
// });

const server = http.createServer((req, res) => {
	// 一进入页面因为req.url为空，所以访问的是项目启动的路径
	const filePath = path.join(conf.root, req.url);
	console.log(`filsePath: ${filePath}`);
	route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.info(`Sever Started at ${chalk.green(addr)}`);
});
