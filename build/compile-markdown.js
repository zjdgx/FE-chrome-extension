import fs from 'fs';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})


function getMarkCompiledContent (file) {
  var content = fs.readFileSync(file, 'utf-8');

  return marked(content.toString());
}

export default getMarkCompiledContent;