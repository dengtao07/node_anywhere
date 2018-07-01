<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>{{tittle}}</title>
	<style>
		a {
			display: block;
			height:30px;
		}
	</style>
</head>
<body>
<!-- 会直接进入当前的文件遍历，所以this代表自身的文件名-->
<!-- each宏用来遍历文件 -->
{{#each files}}
	<!--  比如这里访问的是anywhere,即this是anywhere，那么dir传来的值实际上是写到
	anywhere的，如...../anywhere，所以需要加一个../回到上层目录才行。 -->
	<!-- <a href="{{./filePath}}/{{this}}">{{this}}</a> 这样直接传入filePath是有问题的，
	这个filePath实际上是本地的路径，如：C:\Users\admin\Desktop\node_anywhere\anywhere，
	直接传到html中，线上怎么能识别本地的绝对路径，所以线上的url始终都是以node服务器启动为根路径，
	所以传入的路径也要是相对于node启动路径的根路径！ -->
	<a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
{{/each}}
</body>
</html>
