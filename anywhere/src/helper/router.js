const mime = require('./mime');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// require 中可以放心使用相对路径，永远是相对于该文件的相对路径
const config = require('../config/defaultConfig');
// 拿到dir.tpl模板文件的
const tplPath = path.join(__dirname, '../','template/dir.tpl'); // 要拼接
console.log('1'+__dirname);
console.log('2'+tplPath); // C:\Users\admin\Desktop\node_anywhere\anywhere\src\template\dir.tpl
// tplPath不能写相对路径，因为在不同的node启动目录下相对路径不一样
const source = fs.readFileSync(tplPath); // 默认读出来的是buffer
const template = Handlebars.compile(source.toString()); // template编译

module.exports = async function (req, res, filePath) {
	try {
		// filePath是客户端请求的url地址
		const stats = await stat(filePath);
		// 如果filePath对应的属性时文件，就读出来
		if(stats.isFile()) {
			const contentType = mime(filePath);
			res.statusCode = 200;
			res.setHeader('Content-type', contentType);
			fs.createReadStream(filePath).pipe(res);
		} else if(stats.isDirectory()) {
			// 如果filePth地址是文件夹
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');
			const dir =  path.relative(config.root, filePath);
			console.log('3'+dir);
			const data = {
				tittle: path.basename(filePath),
				// root 是当前进程所在的路径,dir的意思是要访问的路径相对root的路径
				dir: dir ? `/${dir}` : '',
				files
			};
			console.log(`tittle:${data.tittle}`);
			console.log(`files:${files}`);
			res.end(template(data)); // 使用template(),直接返回html
		}
	} catch(ex) {
		console.error(ex);
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/plain');
		res.end(`${filePath} is not a directory or not found!`);
		return;
	}
};

