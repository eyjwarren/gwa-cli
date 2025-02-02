#!/usr/bin/env node
import dotenv from 'dotenv';
import chalk from 'chalk';
import { Command } from 'commander';
import isString from 'lodash/isString';
import last from 'lodash/last';
dotenv.config();

import run from './run';
import acl from './commands/acl';
import plugins from './commands/plugins';
import create from './commands/create';
import info from './commands/info';
import init from './commands/init';
import publishGateway from './commands/publish-gateway';
import publish from './commands/publish';
import status from './commands/status';
import update from './commands/update';
import { checkVersion, checkForApiVersion } from './services/app';

const pkg = require('../package.json');

const program = new Command();
program.version(pkg.version);
// Refactored commands
program
  .addCommand(init)
  .addCommand(info)
  .addCommand(acl)
  .addCommand(publish)
  .addCommand(create)
  .addCommand(publishGateway)
  .addCommand(status);

// Commands to refactor

program
  .command('update <input>')
  .description('Update a config with new OpenAPI specs')
  .option('-u, --url [url]', 'The URL of a OpenAPI spec JSON file')
  .option(
    '-f, --file [file]',
    'An OpenAPI spec JSON file on your local machine'
  )
  .option('--debug')
  .action((input, options) => run(update, input, options));

program.addHelpCommand(
  'validate <input>',
  '[DEPRECIATED] - publish-gateway will validate'
);

program
  .command('plugins [input]')
  .description('List all available plugins')
  .action((input) => run(plugins, input));

const main = async () => {
  try {
    // Don't run verification on certain commands that have simple outputs
    if (!process.argv.some((arg) => /(--version|info)/.test(arg))) {
      const isValid = await checkVersion(pkg.version);
      if (isString(isValid)) {
        console.log(
          chalk.cyanBright`${chalk.bold
            .yellow`[ Warning ]`} Your installed version of APS CLI is out of date.`
        );
        console.log(`Please upgrade to ${chalk.bold`v${isValid}`}`);
        console.log('https://github.com/bcgov/gwa-cli/releases');
      }
      checkForApiVersion();
    }
    program.parse(process.argv);
  } catch (err) {
    throw err;
  }
};

try {
  main().catch((err) => {
    process.exitCode = 1;
    console.log(chalk.bold.red`x Error`, err);
  });
} catch (err) {
  process.exitCode = 1;
  console.log(chalk.bold.red`x Error`, err);
}
