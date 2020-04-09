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
    ucomCommand,
    upcomCommand,
    upcomlishCommand,
    developCommand,
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
        .description('run an arbitrary command on package by name or on "all" packages')
        .action(async (packageName: string, command: string[]) => {
            await runCommand(
                packageName,
                command,
                program.configuration,
            );
        });

    program
        .command('initialize')
        .description('initialize the "joiner.yaml" file')
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
        .option(
            '-t, --type <versionType>',
            'version type: major, minor, patch',
            'patch',
        ).action(async (packageName: string, options: any) => {
            await patchCommand(
                packageName,
                program.configuration,
                options.type,
            );
        });

    program
        .command('commit <packageName>')
        .description('commit package by name or "all" packages')
        .option(
            '-m, --message <text>',
            'commit message',
            '',
        ).action(async (packageName: string, options: any) => {
            await commitCommand(
                packageName,
                program.configuration,
                options.message,
            );
        });

    program
        .command('publish <packageName>')
        .description('publish package by name or "all" packages')
        .action(async (packageName: string) => {
            await publishCommand(packageName, program.configuration);
        });

    program
        .command('ucom <packageName>')
        .description('ucom - update, commit - package by name or "all" packages')
        .action(async (packageName: string) => {
            await ucomCommand(packageName, program.configuration);
        });

    program
        .command('upcom <packageName>')
        .description('upcom - update, patch, commit - package by name or "all" packages')
        .action(async (packageName: string) => {
            await upcomCommand(packageName, program.configuration);
        });

    program
        .command('upcomlish <packageName>')
        .description('upcomlish - update, patch, commit, publish - package by name or "all" packages')
        .action(async (packageName: string) => {
            await upcomlishCommand(packageName, program.configuration);
        });

    program
        .command('develop')
        .description('start a server to listen for changes in the development watched packages and update the cross-dependencies')
        .action(async () => {
            await developCommand(program.configuration);
        });


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}


export default cli;
