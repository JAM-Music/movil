const path = require('path');
const ECT = require('ect');
const fs = require('fs');

let name = process.argv[2];
let isScreen;

if (!name) {
  throw Error("Add a name to the component 'npm run create-component [name]' ");
}

name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

if (process.argv.includes('--screen', 2)) {
  isScreen = true;
}

const values = {
  name,
};
let componentsDir = path.resolve(
  `./src/${isScreen ? 'screens' : 'components'}`,
);

const indexOfFolder = process.argv.indexOf('--folder');
let folder = '';
if (indexOfFolder > -1) {
  if (!process.argv[indexOfFolder + 1]) {
    throw Error('No argument for --folder option');
  }
  componentsDir = path.join(componentsDir, process.argv[indexOfFolder + 1]);
  folder = process.argv[indexOfFolder + 1];
  folder = folder.endsWith('/') ? folder : folder + '/';
}

const componentDir = path.join(componentsDir, `/${name}`);
fs.mkdirSync(componentDir, {recursive: true});

if (!process.argv.includes('--no-style', 2)) {
  values.style = true;
  let content = `/*${name} component style file*/\n`;
  content += "import {StyleSheet} from 'react-native';\n";
  content += 'export default StyleSheet.create({});\n';
  fs.writeFileSync(`${componentDir}/${name}.style.ts`, content);
}

const renderer = ECT({root: `${__dirname}/schemas/component`, ext: '.ect'});

if (!process.argv.includes('--no-template', 2) && !isScreen) {
  values.template = true;
  const view = renderer.render('view', values);
  fs.writeFileSync(`${componentDir}/${name}.template.tsx`, view);
} else {
  values.indexStyle = values.style;
}

const index = renderer.render('index', values);

if (!process.argv.includes('--no-test', 2)) {
  const testDir = path.resolve('./__tests__');
  const testRenderer = ECT({
    root: `${__dirname}/schemas/page`,
    ext: '.ect',
  });
  const test = testRenderer.render('test', {...values, folder});
  fs.writeFileSync(
    `${testDir}/${name}${isScreen ? '-screen' : ''}-test.tsx`,
    test,
  );
}

fs.writeFileSync(`${componentDir}/index.tsx`, index);
