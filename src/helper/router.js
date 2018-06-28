const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig'); // require 中可以放心使用相对路径

const tplPath = path.join(__dirname, '../template/dir.tpl'); // 要拼接
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath) {
	try {
		const stats = await stat(filePath);
		if(stats.isFile()) {
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/plain');
			fs.createReadStream(filePath).pipe(res);
		} else if(stats.isDirectory()) {
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');
			const data = {
				tittle: path.basename(filePath),
				dir: path.relative(config.root, filePath),
				files
			};
			res.end(template(data));
		}
	} catch(ex) {
		console.error(ex);
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/plain');
		res.end(`${filePath} is not a directory or not found!`);
		return;
	}
};

