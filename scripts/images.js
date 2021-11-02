const fs = require('fs');
const imageFileNames = () => {
  const array = fs
    .readdirSync('./src/assets/images')
    .filter(file => {
      return file.endsWith('.png');
    })
    .map(file => {
      return file.replace(/@.*/, '').replace('.png', '');
    });
  return Array.from(new Set(array));
};

const generate = () => {
  let properties = imageFileNames()
    .map(name => {
      return `${name}: require('./images/${name}.png')`;
    })
    .join(',\n  ');
  const string = `const images = {
  ${properties},
};
export default images;\n`;
  fs.writeFileSync('./src/assets/images.js', string, 'utf8');
};

generate();
