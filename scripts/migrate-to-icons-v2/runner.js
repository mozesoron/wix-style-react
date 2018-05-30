#!/usr/bin/env node
const {exec} = require('child_process');
const [,, ...args] = process.argv;
const pathArg = args.find(arg => arg.startsWith('--path')) || '--path=src/';
const typeArg = args.find(arg => arg.startsWith('--type')) || '--type=external';

const path = pathArg.split('=')[1];
const type = typeArg.split('=')[1];

const moduleName = 'wix-style-react';
const pathToModuleRoot = require.resolve(moduleName);
const pathToModuleFolder = pathToModuleRoot
    .substr(0, pathToModuleRoot.indexOf(moduleName) + moduleName.length)

const execProc = exec(`MIGRATION=${type} jscodeshift -t ${pathToModuleFolder}/scripts/migrate-to-icons-v2 ${path}`);

execProc.stdout.on('data', (data) => console.log(data.toString()))

execProc.stderr.on('data', (data) => console.log(data.toString()))

execProc.on('exit', (code) => console.log('Done with code:', code.toString()))
