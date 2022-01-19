const fs = require('fs');
const path = require('path');
const { $ } = require('zx');
const semver = require('semver');

const start = async () => {
  const nvmrcPath = path.join(process.cwd(), '.nvmrc');
  const nvmrcVer = fs.existsSync(nvmrcPath) ? fs.readFileSync(nvmrcPath, 'utf8') : '';

  if (nvmrcVer) {
    // 如果指定了特殊的版本号也自动切换
    if (nvmrcVer.includes('.')) {
      const [targetMajor] = nvmrcVer.split('.');
      const [major] = process.versions.node.split('.');
      if (major === targetMajor && semver.gte(nvmrcVer, process.versions.node)) {
        console.log('n-switch: nvmrc is already set to the latest version.');
        return;
      }
    }
    // 只有major相同且 nvmrc 版本低于当前版本才不更新
    console.log(`n-switch: auto-switching, ${process.versions.node} -> ${nvmrcVer}`);
    await $`n auto`;
  }
};

start();
