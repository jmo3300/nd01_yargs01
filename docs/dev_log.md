# node - yargs 01 - Development Log

## Prerequisites

nodejs, typescript are installed globally.

## Create Project/Application

Create project

        md nd01_yarn01
        cd nd01_yarn01

        npm init -y


## Preparation

### Setup git

Create github repository on git hub's web site. Result is: https://github.com/jmo3300/nd01_yargs01.git

Init git for the project:

        git init

Do first commit

        git commit

Add above created github repository as remote repository with commmand 'Git:add remote' from command palette (Ctrl-Shift-P)

Do first push.

###  Adopt package.json 

### Setup typescript

create typescript config (tsconfig.json)

        tsc --init

adopt typescript.json

- change

    "outDir": "./lib",
    "rootDir": "./src",
    "noImplicitAny": false, // (see Issues)

- add

  "include": ["./src/**/*.ts"]


Create the src directory approtriately. build directory will be created during compilation. 

        md src

Install dependencies according tutorial

        npm install yargs
        npm install clear       // clears the console

Install types for the dependencies

        npm install @types/yargs
        npm install @types/node

Create application file yapp.ts and implement some boilerplate

        import yargs from 'yargs';

        console.log("Hello")

        export {} // makes the file a module

Compile and run boilerplate app

        tsc
        node ./lib/yapp.js

### Adopt package.json

        "version": "0.0.1",
        "description": "explore yargs",
        "main": "yapp.js",
        "bin": {
                "yapp": "./lib/yapp.js"
        },
        "author": "jmo3300@gmx.net",
        "license": "MIT",
        "repository": {"url": "git@github.com:jmo3300/typescriptnd01_yargs01.git},

## Implementation

