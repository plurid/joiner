import program, {
    CommanderStatic,
} from 'commander';

import {
    commitCommand,
    patchCommand,
    publishCommand,
    runCommand,
    upcomlishCommand,
    updateCommand
} from '../commands';

// import {
// } from '../data/interfaces';

// import {
// } from '../services/utilities';



const main = async (
    program: CommanderStatic,
) => {
    program
        .name('joiner')
        .usage('<command>')
        .version('0.1.0', '-v, --version')
        .action(() => {
            program.outputHelp();
        });

    // program
    //     .option(
    //         '-t, --target <type>',
    //         'compilation targets: typescript, graphql, protobuf',
    //         'typescript,graphql,protobuf',
    //     ).option(
    //         '-o, --output <path>',
    //         'output path',
    //         '.',
    //     ).option(
    //         '-r, --resolve <type>',
    //         'resolve the output path relative to the "file" directory, "process" directory, or "flatten" into the output path',
    //         'file',
    //     ).option(
    //         '-c, --comments [value]',
    //         'compile the comments into the target files',
    //         false,
    //     ).option(
    //         '-s, --spacing <value>',
    //         'indentation spacing to be used in the compiled files',
    //         '4',
    //     ).option(
    //         '-p, --preserve [value]',
    //         'preserve new lines spacing of the datasign file',
    //         false,
    //     ).option(
    //         '-g, --generated [value]',
    //         'inject a header in each generated file mentioning the source',
    //         true,
    //     );

    program
        .command('run <packageName> <command...>')
        .description('run arbitrary command on package')
        .action((packageName: any, command: any) => {
            console.log('run command called', packageName, command);
            runCommand();
        });

    program
        .command('update <packageName>')
        .description('update package or "all" packages')
        .action((packageName: any) => {
            console.log('update command called', packageName);
            updateCommand();
        });

    program
        .command('patch <packageName>')
        .description('patch package version or "all" packages')
        .action((packageName: any) => {
            console.log('patch command called', packageName);
            patchCommand();
        });

    program
        .command('commit <packageName>')
        .description('commit package or "all" packages')
        .action((packageName: any) => {
            console.log('commit command called', packageName);
            commitCommand();
        });

    program
        .command('publish <packageName>')
        .description('publish package or "all" packages')
        .action((packageName: any) => {
            console.log('publish command called', packageName);
            publishCommand();
        });

    program
        .command('upcomlish <packageName>')
        .description('upcomlish arbitrary command on package')
        .action((packageName: any) => {
            console.log('upcomlish command called', packageName);
            upcomlishCommand();
        });


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}


export default cli;
