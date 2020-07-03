import * as pu from './paramsUtils';
import yargs from 'yargs';

const main = function():void {

    const args: pu.Args = yargs.options({
      configFile: { type: 'string', default: "yapp.json", alias: "c" },
      askParams: { type: 'boolean', default: true, alias: "a" },
    })
    .argv

    pu.initParams(args.configFile)
        .then(pu.updateParamsWithArgs)
        .then(params => pu.askParams(params, args.askParams))
        .then(pu.validateParams)
        .then(params => pu.writeParams(params, args.configFile))
        .then(console.log)
        .catch(console.error)
}

main();
