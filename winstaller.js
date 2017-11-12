var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './test/test-win32-x64',
    outputDirectory: './test/installer64',
    authors: 'My App Inc.',
    exe: 'test.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
