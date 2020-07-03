import fs from 'fs';
import path from 'path';

import validFilename from 'valid-filename';

export function getCWD():string {
  return process.cwd();
}

export function dirExists(filePath:string):boolean {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()
}
export function fileExists(filePath:string):boolean {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()
}

export function isValidFilename(fileName:string):boolean {
  return validFilename(fileName);
}

export function dirCreate(filePath:string):boolean {
  if (fs.existsSync(filePath)){
    return true;
  }else
    try {
      fs.mkdirSync(filePath)
      return true;
    }catch(e) {
      return false;
    }
}
