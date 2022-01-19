const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { spawn } = require('child_process');

const versionMapping = {
  Argon: 4,
  Boron: 6,
  Carbon: 8,
  Dubnium: 10,
  Erbium: 12,
  Fermium: 14,
  Gallium: 16,
};

const getCurrentMajor = nvmVer => {
  if (!nvmVer) {
    return null;
  }

  if (nvmVer.includes('.')) {
    return nvmVer.split('.')[0];
  }

  let major = null;
  Object.keys(versionMapping).some(key => {
    if (new RegExp(`${key}`, 'ig').test(nvmVer)) {
      major = versionMapping[key];
      return true;
    }
    return false;
  });

  return major;
};

const start = async () => {
  const nvmrcPath = path.join(process.cwd(), '.nvmrc');
  const nvmrcVer = fs.existsSync(nvmrcPath) ? fs.readFileSync(nvmrcPath, 'utf8') : '';

  if (!nvmrcVer) {
    console.log(`n-switch: now use node v${process.versions.node}`);
    return;
  }

  const targetMajor = getCurrentMajor(nvmrcVer);
  if (targetMajor !== null) {
    const [major] = process.versions.node.split('.');
    if (Number(major) === Number(targetMajor)) {
      // 如果是字母版本，就直接跳过，如果是数字版本，确认满足条件再跳过
      if (!nvmrcVer.includes('.') || semver.gte(nvmrcVer, process.versions.node)) {
        console.log(`n-switch: now use node v${process.versions.node}`);
        return;
      }
    }
  }

  // 只有major相同且 nvmrc 版本低于当前版本才不更新
  console.log(`n-switch: auto-switching, ${process.versions.node} -> ${nvmrcVer}`);
  spawn('n', ['auto'], {
    stdio: 'inherit',
  });
};

start();
