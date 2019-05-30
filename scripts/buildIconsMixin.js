const fs = require('fs');
const iconsFolder = './src/assets/icons';
const stylePath = './src/styles/mixins/icons.scss';

fs.readdir(iconsFolder, (err, files) => {
    const iconMixin = '@mixin icon {\n  background-repeat: no-repeat;\n  background-position: center;\n ' +
        ' background-size: contain;\n}';
    const content = files.map((file) => {
        let fileClass = file.replace('.svg', '');
        let data = fs.readFileSync(`${iconsFolder}/${file}`, 'utf8');
        let width = data.match(/width="(.+?)"/)[1].replace('px', '');
        let height = data.match(/height="(.+?)"/)[1].replace('px', '');
        return `\n\n@mixin ${fileClass} {\n  @include icon;\n  width: ${width}px;\n  height: ${height}px;\n  background: url("../../assets/icons/${fileClass}.svg");\n}`
    });
    try {
        fs.unlinkSync(stylePath);
    } catch (e) {
    }
    saveFile(stylePath, [iconMixin, ...content].join(''));
});

function saveFile(path, content) {
    fs.appendFile(path, (content), function (err) {
        if (err) throw err;
        console.log('✅ -> Styles were saved to ' + path);
    });
}
