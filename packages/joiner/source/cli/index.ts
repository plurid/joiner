import program, {
    CommanderStatic,
} from 'commander';

import {
    initializeCommand,
    listCommand,
    runCommand,
    updateCommand,
    patchCommand,
    commitCommand,
    publishCommand,
    upcomlishCommand,
} from '../commands';



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

    program
        .option(
            '-c, --configuration <file>',
            'path to the .yaml configuration file',
            'joiner.yaml',
        );

    program
        .command('run <packageName> <command...>')
        .description('run arbitrary command on package by name or on "all" packages')
        .action(async (packageName: string, command: string[]) => {
            await runCommand(
                packageName,
                command,
                program.configuration,
            );
        });

    program
        .command('initialize')
        .description('initialize joiner.yaml file')
        .action(async ()=> {
            await initializeCommand();
        });

    program
        .command('list')
        .description('list joiner commandable packages')
        .action(async ()=> {
            await listCommand(
                program.configuration,
            );
        });

    program
        .command('update <packageName>')
        .description('update package by name or "all" packages')
        .action(async (packageName: string)=> {
            await updateCommand(packageName, program.configuration);
        });

    program
        .command('patch <packageName>')
        .description('patch package version by name or "all" packages')
        .action(async (packageName: string) => {
            await patchCommand(packageName, program.configuration);
        });

    program
        .command('commit <packageName>')
        .description('commit package by name or "all" packages')
        .action(async (packageName: string) => {
            await commitCommand(packageName, program.configuration);
        });

    program
        .command('publish <packageName>')
        .description('publish package by name or "all" packages')
        .action(async (packageName: string) => {
            await publishCommand(packageName, program.configuration);
        });

    program
        .command('upcomlish <packageName>')
        .description('upcomlish - update, patch, commit, publish - package by name or "all" packages')
        .action(async (packageName: string) => {
            await upcomlishCommand(packageName, program.configuration);
        });


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}


export default cli;
