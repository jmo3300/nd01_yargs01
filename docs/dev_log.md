# node - yargs 01 - Development Log

## Prerequisites

nodejs, typescript are installed globally.

## Create Project/Application

Create project

        md nd01_yarn01
        cd nd01_yarn01

        npm init -y

Adopt package.json accordingly (description and version)

## Setup git

Create github repository on git hub's web site. Result is: https://github.com/jmo3300/nd01_yargs01.git

Init git for the project:

        git init

Add above created github repository as remote repository with commmand 'Git:add remote' from command palette (Ctrl-Shift-P)







## Preparation

Initialize typescript (create tsconfig.ts)

        tsc --init

Change tsconfig.ts

    "outDir": "./build",                        /* Redirect output structure to the directory. */
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with

Create the src directory approtriately. build directory will be created during comilation. 

        md src

Install dependencies according article

        npm install chalk clear clui figlet inquirer minimist configstore @octokit/rest @octokit/auth-basic lodash simple-git touch

Install type for the dependencies

        npm install @types/clear
        npm install @types/figlet
        npm install @types/inquirer

Further dependencies

        npm install valid-filename

## Implementation

Create application file rpd.ts

