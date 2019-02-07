// @ts-ignore

const fs = require('fs');
const util = require('util');
const vttToJson = require('vtt-to-json');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function main() {
  const vtt = await readFileAsync('./src/subs/subs.vtt');
  const json = await vttToJson(vtt.toString('utf8'));

  const jsonShrunk = json.map((i) => {
    delete i.words;
    return i;
  });

  await writeFileAsync('./src/subs/subs.json', JSON.stringify(json, null, 2));
}

main().catch(e => console.error(e));
