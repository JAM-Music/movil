const path = require('path');
const ECT = require('ect');
const fs = require('fs');

const name = process.argv[2];

if (!name) {
  throw Error("Add a name to the page 'npm run create-page [name]' ");
}

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const values = {
  name: capitalize(name),
};

const reduxIndex = path.resolve('./src/store');
const reduxDir = path.join(reduxIndex, name);
fs.mkdirSync(reduxDir);

const renderer = ECT({root: `${__dirname}/schemas/redux`, ext: '.ect'});

const reducer = renderer.render('reducer', values);
const selector = renderer.render('selector', values);
const types = renderer.render('types', values);

fs.writeFileSync(`${reduxDir}/reducer.ts`, reducer);
fs.writeFileSync(`${reduxDir}/selector.ts`, selector);
fs.writeFileSync(`${reduxDir}/types.ts`, types);
fs.writeFileSync(
  `${reduxDir}/index.ts`,
  "export * from './reducer';\nexport * from './selector';\nexport * from './types';\n",
);

const reduxReducers = fs
  .readdirSync(reduxIndex, {withFileTypes: true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => ({
    reducer: `${capitalize(dirent.name)}Reducer`,
    module: `${capitalize(dirent.name)}ModuleName`,
    name: dirent.name,
  }));

const content = renderer.render('index', {folders: reduxReducers});
fs.writeFileSync(`${reduxIndex}/index.ts`, content);
