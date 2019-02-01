/**
 * 编译项目
 * 使用方法: 
 *    1. 编译线上: babel-node build.js true
 *    2. 编译本地: babel-node build.js
 */

import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
// var less = require('less');
import { categories } from '../src/config/category';
import config from './config';
import getMarkCompiledContent from './compile-markdown';
import { buildTheme } from './build-theme-less';

const pagePath = './src/pages';
const tabFilePath = './tab/';
const showTabsContentFile = './src/pages/content/showContent.html';
const categoryFilePath = './src/pages/content/categories.html';
const isPrivate = process.argv[2] === 'true'; // 是否私人模式
const IS_DEV = process.argv[3] === 'true'; // 是否DEV模式
const includeHtml = /\$\{include file=('|")\.*(\/[a-zA-Z0-9\-]+)+\.html('|")\}/gi;
const includeMarkdown = /\$\{include file=('|")\.*(\/[a-zA-Z0-9\-\.]+)+\.md('|")\}/gi;
const includeFileReg = /\.*(\/[a-zA-Z0-9\-]+)+\.html/gi;
const includeMdReg = /\.*(\/[a-zA-Z0-9\-\.]+)+\.md/gi;

// 递归查找替换文件
function searchReplaceFileSync(inputFile, isRootFile) {
  var content = fs.readFileSync(inputFile, 'utf-8');

  var matches = content.toString().match(includeHtml);
  var mdMatches = content.toString().match(includeMarkdown);

  if (matches && matches.length) {
    for (var i = 0; i < matches.length; i++) {
      var includeFilePath = matches[i].match(includeFileReg);
      var backNum = includeFilePath[0].match(/\.\./gi);
      backNum = backNum ? backNum.length + 1 : 1;
      var pathReg = new RegExp('(\/[a-zA-Z0-9\-]+){' + backNum + '}\.html', 'gi');
      var target = inputFile.replace(pathReg, includeFilePath[0].replace(/^(\.\.?\/)*/, '/'));
      // console.log(`=============\ninput file: ${inputFile}\nfile: ${includeFilePath[0]}\ntarget: ${target}\n=============`);
      var reg = new RegExp('\\$\\{include file=(\'|")' + includeFilePath[0].replace(/\//g, '\/').replace(/\./g, '\\.').replace(/\-/g, '\\-') + '(\'|")\}', 'gi');
      content = content.toString().replace(reg, searchReplaceFileSync(target, false));
    }
  }

  if (mdMatches && mdMatches.length) {
    for (var i = 0; i < mdMatches.length; i++) {
      var includeMdFilePath = mdMatches[i].match(includeMdReg);
      var backNum = includeMdFilePath[0].match(/\.\./gi);
      backNum = backNum ? backNum.length + 1 : 1;
      var pathReg = new RegExp('(\/[a-zA-Z0-9\-]+){' + backNum + '}\.html', 'gi');
      var mdTarget = inputFile.replace(pathReg, includeMdFilePath[0].replace(/^(\.\.?\/)*/, '/'));
      // console.log(`=============\ninput file: ${inputFile}\nfile: ${includeMdFilePath[0]}\ntarget: ${mdTarget}\n=============`);
      var reg = new RegExp('\\$\\{include file=(\'|")' + includeMdFilePath[0].replace(/\//g, '\/').replace(/\./g, '\\.').replace(/\-/g, '\\-') + '(\'|")\}', 'gi');
      content = content.toString().replace(reg, getMarkCompiledContent(mdTarget));
    }
  }

  if (isRootFile) {
    // console.log(`inputFile: ${inputFile}, content: ${newCss}`);
    const destFile = path.resolve('./dist', inputFile.replace(process.cwd() + '/src', '.'));
    content = content.replace(/\$\{theme\}/g, config.showPrivatePhoto ? `private ${config.showTheme}` : config.showTheme);
    // console.log(`dest file: ${destFile}`);
    mkdirsSync(destFile);
    fs.writeFile(destFile, content, function(err) {
      if (err) {
        return console.log(err);
      } else {
        console.log(`页面 ${inputFile.replace(__dirname, '.')} 生成完毕!`);
      }
    });
  } else {
    return content;
  }
}

// 递归创建目录 同步方法  
function mkdirsSync(to) { //文件写入
  var sep = path.sep
  var folders = path.dirname(to).split(sep);
  var p = '';
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}

// 复制文件
function copyFileSync( source, target ) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
    if ( fs.lstatSync( target ).isDirectory() ) {
      targetFile = path.join( target, path.basename( source ) );
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

// 复制目录
function copyFolderRecursiveSync( source, excludeFiles, target ) {
  var files = [];
  excludeFiles = [excludeFiles];

  for (var i = 0; i < excludeFiles.length; i++) {
    if (source.indexOf(excludeFiles[i]) > -1) {
      return false;
    }
  }

  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
    fs.mkdirSync( targetFolder );
  }

  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolderRecursiveSync( curSource, excludeFiles, targetFolder );
      } else {
        copyFileSync( curSource, targetFolder );
      }
    });
  }
}

function cleanFiles () {
  if (fs.existsSync(path.resolve(__dirname, showTabsContentFile))) {
    fs.unlink(path.resolve(__dirname, showTabsContentFile), (err) => {
      if (err) {
        console.log(`文件${categoryFilePath}删除失败: ${JSON.stringify(err)}`)
      } else {
        console.log(`文件 ${categoryFilePath} 删除成功!`)
      }
    });
  }
  if (fs.existsSync(path.resolve(__dirname, categoryFilePath))) {
    fs.unlink(path.resolve(__dirname, categoryFilePath), (err) => {
      if (err) {
        console.log(`文件${categoryFilePath}删除失败: ${JSON.stringify(err)}`)
      } else {
        console.log(`文件 ${categoryFilePath} 删除成功!`)
      }
    });
  }
}

function build () {
  // build theme less
  buildTheme(isPrivate, config.showTheme, config.privatePhotoBg);
  if (config.showTempFile && config.showTempFile.length) {// 是否显示临时背景图
    fs.appendFileSync(path.resolve(__dirname, '../src/static/less/theme-build.less'), `.main {
      background: url(${config.showTempFile}) no-repeat center center;
      background-size: 600px;
    }`);
  }

  // compile less
  require('child_process').exec('lessc src/static/less/newtab.less > src/static/css/newTab.min.css', (err, stdout, stderr) => {
    if (err) {
      console.log(`exec error: ${err}`);
    } else {
      console.log('less compile finished....');
      // 复制static目录
      copyFolderRecursiveSync('./src/static', ['/less'], './dist');
    }
  });
  
  // build categories.html
  let firstLevelTabs = ['<div class="wrapper">'];
  let showTabs = [];
  categories.forEach((category) => {
    if (!(!isPrivate && category.private)) {
      firstLevelTabs.push(`<span class="link${category.active ? ' active' : ''}" data-target="#${category.id}">${category.id[0].toUpperCase() + category.id.substring(1).toLowerCase()}</span>`)
      showTabs.push(`\${include file="${tabFilePath + category.id + '.html'}"}`);
    }
  });
  firstLevelTabs.push('</div>');

  fs.writeFileSync(showTabsContentFile, showTabs.join(''), function(err) {
    if (err) {
      console.log(`${showTabsContentFile} write failed: ${JSON.stringify(err)}`);
      return console.log(err);
    } else {
      console.log(`${showTabsContentFile} write finished...`);
    }
  });
  fs.writeFileSync(categoryFilePath, firstLevelTabs.join('\r\n'), function(err) {
    if (err) {
      console.log(`${categoryFilePath} write failed: ${JSON.stringify(err)}`);
      return console.log(err);
    } else {
      console.log(`${categoryFilePath} write finished...`);
    }
  });

  // build pages
  fs.readdir(pagePath, (err, pages) => {
    pages.forEach(function (page) {
      var file = path.resolve(pagePath, page);
      if (fs.statSync(file).isFile()) {
        searchReplaceFileSync(file, true);
      }
    });
  });
}

// fs.watch(path.resolve(__dirname, '/src'), build);
// console.log(`is dev: ${IS_DEV}`);
cleanFiles();
if (IS_DEV) {// 死循环
  // chokidar.watch('./src', {ignored: [
  //   /\/src\/pages\/(categories|showContent)\.html/,
  //   // /\/src\/static\/css\/*\.css/
  //   '*.css'
  // ]}).on('all', function (event, path) {
  //   console.log(path)
  //   build();
  // });
  build();
} else {
  build();
}

// copyFileSync(path.resolve(__dirname, './node_modules/highlight.js/lib/highlight.js'), path.resolve(__dirname, './dist/static/js'));


// =======: http://onedayitwillmake.com/blog/2013/03/compiling-less-from-a-node-js-script/
// var less = require( 'less' );
// var fs = require( 'fs' );
// var path = require('path');
 

// // http://onedayitwillmake.com/blog/2013/03/compiling-less-from-a-node-js-script/
// // https://stackoverflow.com/questions/19956265/synchronous-less-compiling-in-nodejs 
// // Load the file, convert to string
// fs.readFile( 'src/static/less/newTab.less', function ( error, data ) {
//   var dataString = data.toString();
//   var options = {
//     paths         : ["src/static/less"],      // .less file search paths
//     outputDir     : "dist/static/css",   // output directory, note the '/'
//     optimization  : 1,                // optimization level, higher is better but more volatile - 1 is a good value
//     filename      : "newTab.less",       // root .less file
//     compress      : true,             // compress?
//     yuicompress   : true              // use YUI compressor?
//   };
 
 
//   // Create a file name such that
//   //  if options.filename == gaf.js and options.compress = true
//   //    outputfile = gaf.min.css
//   options.outputfile = options.filename.split(".less")[0] + (options.compress ? ".min" : "") + ".css";
//   // Resolves the relative output.dir to an absolute one and ensure the directory exist
//   options.outputDir = path.resolve( process.cwd(), options.outputDir) + "/";
//   ensureDirectory( options.outputDir );
 
//   // Create a parser with options, filename is passed even though its loaded
//   // to allow less to give us better errors
//   var parser = new less.Parser(options);
//   parser.parse( dataString, function ( error, cssTree ) {
//       if ( error ) {
//         less.writeError( error, options );
//         return;
//       }
 
//     // Create the CSS from the cssTree
//     var cssString = cssTree.toCSS( {
//       compress   : options.compress,
//       yuicompress: options.yuicompress
//     } );
 
//     // Write output
//     fs.writeFileSync( options.outputDir + options.outputfile, cssString, 'utf8' );
//     console.log("Converted Less: '" + options.filename + "', to CSS: " + options.outputDir + options.outputfile);
//   });
// });
 
// //
// var ensureDirectory = function (filepath) {
//   var dir = path.dirname(filepath);
//   var existsSync = fs.existsSync || path.existsSync;
//   if (!existsSync(dir)) { fs.mkdirSync(dir); }
// };


// =====: https://blog.csdn.net/qq_16415157/article/details/58374872
// const fs = require( 'fs' )      // 引入 fs 文件读写模块
// const less = require( 'less' )  // 引入 less 模块
// const path = require( 'path' )  // 引入 path 路径模块

// // 当前文件绝对目录 __dirname : C:\Users\54721\Desktop\node\less编译工具\node--less-\lib

// const srcPath = path.join(__dirname, 'src/static/less/newTab.less')
// const distPath = path.join(__dirname, 'dist/static/css/newTab.min.css')
// console.log(`====       source: ${srcPath}\n======destination: ${distPath}\n\n\n\n\n`);

// // readFile 第二个参数，可以指定编码类型
// // 指定编码类型后，得到的数据会自动转换
// fs.readFile( srcPath, 'utf8', ( err, data ) => {
//   // data.toString()
//   console.log('===== zjdgx 1 ======\n');
//   if( err ) {
//     throw err
//   }
//   console.log('===== zjdgx 2 ======\n');
//   // 这里我们读取到了 less 文件内容
//   // console.log( data )

//   // 在代码中调用 less
//   less.render( data, ( err, css ) => {
//     // import less找不到相应的文件
//     console.log('===== zjdgx 3 ======\n');
//     if( err ) {
//       console.log(err);
//       throw err
//     }


//     // 在这里我们得到了 less 编译后的 css 内容
//     // console.log( css.css )
//     // 下面就是要将 css.css 写入到文件中
//     fs.writeFile( distPath, css.css, ( err ) => {
//       if ( err ) {
//         throw err
//       }
//       // 输出 success 编译写入成功
//       console.log( 'success' )
//     })
//   })
// })






