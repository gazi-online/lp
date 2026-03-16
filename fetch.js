const fs = require('fs');
async function run() {
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' };
  for (const ext of ['html', 'css', 'js']) {
    const res = await fetch(`https://codepen.io/tutsplus/pen/MrjYJK.${ext}`, { headers });
    const text = await res.text();
    fs.writeFileSync(`test.${ext}`, text);
  }
  console.log('done');
}
run();
