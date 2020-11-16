// #region imports
    // #region libraries
    import program, {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        JOINER_CLI_VERSION,

        MANUAL_JOINER,
    } from '#data/constants';

    import {
        dashboardCommand,
        initializeCommand,
        listCommand,
        runCommand,
        commandCommand,
        updateCommand,
        patchCommand,
        commitCommand,
        publishCommand,
        ucomCommand,
        upcomCommand,
        upcomlishCommand,
        developCommand,
    } from '#commands/index';

    import {
        getDefaultConfigurationFilepath,
    } from '#services/logic/configuration';
    // #endregion external
// #endregion imports



// #region module
const main = async (
    program: CommanderStatic,
) => {
    program
        .name('joiner')
        .usage('<command>')
        .version(JOINER_CLI_VERSION, '-v, --version')
        .action(() => {
            program.outputHelp();
        });

    program
        .option(
            '-c, --configuration <file>',
            `path to the .deon or .yaml configuration file (defaults: 'joiner', 'scripts/joiner', 'scripts/joiner.packages')`,
        );

    program
        .command('manual')
        .description('the "joiner" manual')
        .action(async ()=> {
            console.log(`\n\tThe "joiner" manual is available on: ${MANUAL_JOINER}\n`);
        });


    const dashboard = new program.Command('dashboard');

    dashboard
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('configure a local web server with a global view over the "joiner" packages registered on the machine');

    dashboard
        .command('status')
        .description('status of the dashboard server')
        .action(async () => {
            await dashboardCommand(
                'status',
            );
        });

    dashboard
        .command('start')
        .description('start the dashboard server')
        .action(async () => {
            await dashboardCommand(
                'start',
            );
        });

    dashboard
        .command('stop')
        .description('stop the dashboard server')
        .action(async () => {
            await dashboardCommand(
                'stop',
            );
        });

    dashboard
        .command('register [path]')
        .description('register a ".joiner" configuration file on the dashboard server')
        .action(async (
            path,
        ) => {
            await dashboardCommand(
                'register',
                {
                    path,
                },
            );
        });

    dashboard
        .command('deregister [path]')
        .description('deregister a ".joiner" configuration file on the dashboard server')
        .action(async (
            path,
        ) => {
            await dashboardCommand(
                'deregister',
                {
                    path,
                },
            );
        });

    program.addCommand(
        dashboard,
    );


    program
        .command('initialize')
        .description('initialize the "joiner" configuration file')
        .option(
            '-t, --type <file>',
            'configuration type: deon, yaml',
            'deon',
        ).action(async (options: any)=> {
            await initializeCommand(
                options.type,
            );
        });

    program
        .command('list')
        .description('list joiner commandable packages')
        .action(async ()=> {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await listCommand(
                configuration,
            );
        });

    program
        .command('run <package> <command...>')
        .description('run an arbitrary command on package by name or on "all" packages')
        .action(async (packageName: string, command: string[]) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await runCommand(
                packageName,
                command,
                configuration,
            );
        });

    program
        .command('command <package> <command...>')
        .description('run the named commands specified in the "joiner" file on package by name or on "all" packages')
        .action(async (packageName: string, commands: string[]) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await commandCommand(
                packageName,
                commands,
                configuration,
            );
        });

    program
        .command('update <package>')
        .description('update package by name or "all" packages')
        .action(async (packageName: string) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await updateCommand(
                packageName,
                configuration,
            );
        });

    program
        .command('patch <package>')
        .description('patch package version by name or "all" packages')
        .option(
            '-t, --type <versionType>',
            'version type: major, minor, patch',
            'patch',
        ).action(async (packageName: string, options: any) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await patchCommand(
                packageName,
                configuration,
                options.type,
            );
        });

    program
        .command('commit <package>')
        .description('commit package by name or "all" packages')
        .option(
            '-m, --message <text>',
            'commit message',
            '',
        ).action(async (packageName: string, options: any) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await commitCommand(
                packageName,
                configuration,
                options.message,
            );
        });

    program
        .command('publish <package>')
        .description('publish package by name or "all" packages')
        .action(async (packageName: string) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await publishCommand(packageName, configuration);
        });

    program
        .command('ucom <package>')
        .description('ucom - update, commit - package by name or "all" packages')
        .action(async (packageName: string) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await ucomCommand(
                packageName,
                configuration,
            );
        });

    program
        .command('upcom <package>')
        .description('upcom - update, patch, commit - package by name or "all" packages')
        .action(async (packageName: string) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await upcomCommand(
                packageName,
                configuration,
            );
        });

    program
        .command('upcomlish <package>')
        .description('upcomlish - update, patch, commit, publish - package by name or "all" packages')
        .action(async (packageName: string) => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await upcomlishCommand(
                packageName,
                configuration,
            );
        });

    program
        .command('develop')
        .description('start a server to listen for changes in the development watched packages and update the cross-dependencies')
        .action(async () => {
            const configuration = program.configuration
                || await getDefaultConfigurationFilepath();

            await developCommand(configuration);
        });


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}
// #endregion module



// #region exports
export default cli;
// #endregion exports
