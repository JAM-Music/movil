const path = require('path');
const ECT = require('ect');
const fs = require('fs');

let hookName = process.argv[2];

if (!hookName) {
  throw Error("Add a name to the hook 'npm run create-hook [name]' ");
}

hookName = hookName.startsWith('use')
  ? hookName
  : `use${hookName.charAt(0).toUpperCase()}${hookName.slice(1)}`;

const values = {
  name: hookName,
};

const indexOfEndPoint = process.argv.indexOf('--endpoint', 2);

if (indexOfEndPoint > -1) {
  values.endpoint = process.argv[indexOfEndPoint + 1];
}

const hooksDir = path.resolve('./src/hooks');
const renderer = ECT({root: `${__dirname}/schemas`, ext: '.ect'});
const parsed = renderer.render('hook', values);

if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir);
}

fs.writeFileSync(`${hooksDir}/${hookName}.js`, parsed);

if (!process.argv.includes('--no-index', 2)) {
  const indexfile = path.join(hooksDir, 'index.ts');

  let isAlreadyIn = false;
  if (fs.existsSync(indexfile)) {
    isAlreadyIn = fs.readFileSync(indexfile).includes(`${hookName}.ts`);
  }

  if (!isAlreadyIn) {
    fs.appendFileSync(indexfile, `export * from './${hookName}';\n`);
  }
}
