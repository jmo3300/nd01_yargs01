import fs from 'fs';
import path from 'path';

import yargs from 'yargs';
import inquirer from 'inquirer';
import * as fsu from './fsUtils';
import { rejects } from 'assert';

export interface Params {
  configFile?: string
  repoDir?: string // path to mono repo
  projectsFile?: string // path to the file which contains the JSON object 'projects' (default angular.json)
  templatesDir?: string // path to template file(s) (default template)
  templateFile?: string // template file name for creating outfile (default index.hbs)
  outputDir?: string // path to output directory for summarized documentation (default repodoc)
  outputFile?: string // path to landing page of summarized documentation to be created (default index.html)
}

export interface Args extends Params {
  [x: string]: unknown
  configFile: string
  askParams: boolean
}

export const paramsDefault: Params = <Params>{
  repoDir: path.join('.', 'example'),
  projectsFile: "angular.json",
  templatesDir: path.join('.', 'templates'),
  templateFile: "index.hbs",
  outputDir: path.join('.', 'repodoc'),
  outputFile: "index.html"
}

// TODO: internalize paramsDefault
export const initParams = function (configFile: string): Promise<Params> {
  return new Promise<Params>((resolve) => {
    fs.readFile(configFile, (error: any, data: any) => {
      if (error) {
        console.warn(`cannot read file ${configFile} due to ${error.message}`);
        console.warn(`gonna use default parameters`);
        resolve(paramsDefault)
        return
      }
      try {
        let params: Params = JSON.parse(data.toString());
        Object.keys(paramsDefault).map((key: string) => {
          if (params[key] === undefined) {
            params[key] = paramsDefault[key]
          }
        });
        resolve(params);
      } catch (error) {
        console.warn(`file ${configFile} not a valid configuration file`);
        console.warn(`gonna use default parameters`);
        resolve(paramsDefault)
      }
    })
  })
}

export const updateParamsWithArgs = function (params: Params): Promise<Params> {

  return new Promise<Params>((resolve) => {
    const args: Args = yargs.options({
      configFile: { type: 'string', default: "yapp.json", alias: "c" },
      askParams: { type: 'boolean', default: true, alias: "a" },
      repoDir: { type: 'string', default: params.repoDir },
      projectsFile: { type: 'string', default: params.projectsFile },
      templatesDir: { type: 'string', default: params.templatesDir },
      templateFile: { type: 'string', default: params.templateFile },
      outputDir: { type: 'string', default: params.outputDir },
      outputFile: { type: 'string', default: params.outputFile }
    }).strict()
      .argv

    Object.keys(paramsDefault).map((key: string) => params[key] = args[key]);

    resolve(params);

  })
}

export const writeParams = function (params: Params, configFile: string): Promise<Params> {

  return new Promise<Params>((resolve) => {
    fs.writeFile(configFile, JSON.stringify(params), (error: any) => {
      if (error) {
        console.warn(`cannot write config file ${configFile} due to ${error.message}`);
      }
      resolve(params);
    })
  })
}

export async function askParams(params: Params, askParams: boolean) {

  if (!askParams) return params;

  const repoDir = await inquirer.prompt({
    name: 'repository directory',
    type: 'input',
    default: params.repoDir,
    message: 'Enter your repository directory:',
    validate: function (value: string) {
      if (fsu.dirExists(value)) {
        return true;
      } else {
        return 'Please enter a valid repository directory:';
      }
    }
  })
  params.repoDir = repoDir['repository directory'];

  const projectsFile = await inquirer.prompt({
    name: 'projects file',
    type: 'input',
    default: params.projectsFile,
    message: 'Enter your projects file:',
    validate: function (value: string) {
      if (fsu.fileExists(path.join(String(params.repoDir), value))) {
        return true;
      } else {
        return 'Please enter an existing projects file:';
      }
    }
  })
  params.projectsFile = projectsFile['projects file'];

  const templatesDir = await inquirer.prompt({
    name: 'templates directory',
    type: 'input',
    default: params.templatesDir,
    message: 'Enter your templates directory:',
    validate: function (value: string) {
      if (fsu.dirExists(value)) {
        return true;
      } else {
        return 'Please enter a valid template directory:';
      }
    }
  })
  params.templatesDir = templatesDir['templates directory'];

  const templateFile = await inquirer.prompt({
    name: 'template file',
    type: 'input',
    default: params.templateFile,
    message: 'Enter your template file:',
    validate: function (value: string) {
      if (fsu.fileExists(path.join(String(params.templatesDir), value))) {
        return true;
      } else {
        return 'Please enter an existing template file:';
      }
    }
  })
  params.templateFile = templateFile['template file'];

  const outputDir = await inquirer.prompt({
    name: 'output directory',
    type: 'input',
    default: params.outputDir,
    message: 'Enter your output directory:',
    validate: function (value: string) {
      if (fsu.dirCreate(value)) {
        return true;
      } else {
        return 'Please enter a valid output directory:';
      }
    }
  })
  params.outputDir = outputDir['output directory'];

  const outputFile = await inquirer.prompt({
    name: 'output file',
    type: 'input',
    default: params.outputFile,
    message: 'Enter your output file:',
    validate: function (value: string) {
      if (fsu.isValidFilename(value)) {
        return true;
      } else {
        return 'Please enter a valid file name file:';
      }
    }
  })
  params.outputFile = outputFile['output file'];

  return params;
}

export const validateParams = function (params: Params): Promise<Params> {

  return new Promise<Params>((resolve, reject) => {

    let errors:string[] = [];

    if (!fsu.dirExists(String(params.repoDir))) {
      errors.push(`repository directory '${String(params.repoDir)}' is not valid`);
    } else {
      if (!fsu.fileExists(path.join(String(params.repoDir), String(params.projectsFile)))) {
        errors.push(`projects file '${path.join(String(params.repoDir), String(params.projectsFile))}'does not exists`);
      }
    }

    if (!fsu.dirExists(String(params.templatesDir))) {
      errors.push(`templates directory '${String(params.templatesDir)}' is not valid`);
    } else {
      if (!fsu.fileExists(path.join(String(params.templatesDir), String(params.templateFile)))) {
        errors.push(`template file '${path.join(String(params.templatesDir), String(params.templateFile))}'does not exists`);
      }
    }

    if (!fsu.dirCreate(String(params.outputDir))) {
      errors.push(`output directory '${String(params.outputDir)}' is not valid`);
    }

    if (!fsu.isValidFilename(String(params.outputFile))) {
      errors.push(`outputfile name '${String(params.outputFile)}' is not valid`);
    }

    if (errors.length>0){
      reject(new Error(errors.toString()));
    }else{
      resolve(params);
    }
  })
}
