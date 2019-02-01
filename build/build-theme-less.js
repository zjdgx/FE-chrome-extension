/**
 * Author: ZJDGX
 * Date: 2019/02/01
 * Description: 生成主题样式
 */
import fs from 'fs';
import path from 'path';

const SHOW_IMG_LENGTH = 5;
const PRIVATE_IMG_PATH = 'src/static/img/private';
const THEME_FILE = 'src/static/less/theme-build.less';

function buildTheme(isPrivate, theme, showPrivate) {
  const themeImagePath = path.resolve(__dirname, '..', 'src/static/img/theme',  theme);
  let privateImagePath = ''; // theme images
  let privateImageList = []; // private images
  let imgList = fs.readdirSync(themeImagePath);
  let content = [];

  if (isPrivate && showPrivate) {
    privateImagePath = path.resolve(__dirname, '..', PRIVATE_IMG_PATH);
    privateImageList = fs.readdirSync(privateImagePath);
  }

  imgList = privateImageList.concat(imgList);
  
  for(var i = 0; i < SHOW_IMG_LENGTH; i++) {
    if (showPrivate && i < privateImageList.length) {
      content.push(`
        .${theme}-theme .bg${i+1} {
          background: url('../img/private/${imgList[i]}') no-repeat center center;
          background-size: 100%;
        }
      `);
    } else {
      content.push(`
        .${theme}-theme .bg${i+1} {
          background: url('../img/theme/${theme}/${imgList[i]}') no-repeat center center;
          background-size: 100%;
        }
      `);
    }
  }

  fs.writeFileSync(path.resolve(__dirname, '..', THEME_FILE), content.join(''));
}

module.exports.buildTheme = buildTheme;