#!/usr/bin/env node
/* eslint-disable prettier/prettier */
const program = require('commander');
const { resolve } = require('path');
const { unlink, createReadStream, createWriteStream } = require('fs');
const { exec } = require('child_process');

const CURRENT_DIR = process.cwd();
const ESLINT_FILENAME = '.eslintrc.js';
const PRETTIER_FILENAME = '.prettierrc.js';
const ESLINT_TEMPLATE = resolve(__dirname, './templates/eslint-with-prettier.js');
const ESLINT_NO_PRETTIER_TEMPLATE = resolve(__dirname, './templates/eslint-without-prettier.js');
const PRETTIER_TEMPLATE = resolve(__dirname, './templates/prettier.js');

/**
 * Removes the ESLint and Prettier config files
 *
 * @return void
 */
function remove() {
  const eslintFile = resolve(CURRENT_DIR, ESLINT_FILENAME);
  const prettierFile = resolve(CURRENT_DIR, PRETTIER_FILENAME);

  unlink(eslintFile,
    () => { console.log('Removed .eslintrc.js') },
    error => { console.error(error) });
  unlink(prettierFile,
    () => { console.log('Removed .prettierrc.js') },
    error => { console.error(error) });
}

/**
 * Creates ESLint and Prettier config files.
 *
 * @return void
 */
function init() {
  createReadStream(ESLINT_TEMPLATE).pipe(createWriteStream(CURRENT_DIR + '/' + ESLINT_FILENAME));
  createReadStream(PRETTIER_TEMPLATE).pipe(createWriteStream(CURRENT_DIR + '/' + PRETTIER_FILENAME));
  console.log('Config files created...');
}

/**
 * Creates ESLint config file without Prettier configuration.
 *
 * @return void
 */
function initNoPrettier() {
  createReadStream(ESLINT_NO_PRETTIER_TEMPLATE).pipe(createWriteStream(CURRENT_DIR + '/' + ESLINT_FILENAME));
  console.log('Config file created...');
}

/**
 * Updates the NPM packages because we have some peer dependencies.
 *
 * @return void
 */
function addPackages(omitPrettier = false) {
  const command = omitPrettier
    ? 'npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-plugin-import'
    : 'npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier';

  exec(
    command,
    (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
    } else {
      console.log(stdout);
      console.log('Packages installed....');
    }
  });
}

/**
 * Starts the process...
 *
 * @return void
 */
function start() {
  program
    .option('-p', '--no-prettier', 'Do not add Prettier to the project')
    .action((argument, cmd) => {
      if (argument && (argument === 'remove' || argument === 'rm')) {
        remove();
      } else if (cmd.P) {
        initNoPrettier();
        addPackages(true)
      } else if (cmd.R) {
        addPackages(false, true);
      } else {
        init();
        addPackages();
      }
    });

  program.parse(process.argv);
}

start();
