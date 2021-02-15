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
    } from '~data/constants';

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
    } from '~commands/index';

    import {
        getDefaultConfigurationFilepath,
    } from '~services/logic/configuration';

    import {
        resolveExecutionOptions,
    } from '~services/utilities/options';
    // #endregion external
// #endregion imports



// #region module
const main = async (
    program: CommanderStatic,
) => {
    const optionsParallelCommand = '-p, --parallel';
    const optionsParallelDescription = 'if multiple packages, process them in parallel';
    const optionsParallelDefault = false;

    const optionsBatchCommand = '-b, --batch <size>';
    const optionsBatchDescription = 'if multiple packages and processing in parallel, specify a batch size';
    const optionsBatchDefault = '10';


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
            `path to the ".deon" or ".yaml" configuration file (defaults: "joiner", "scripts/joiner", "scripts/joiner.packages")`,
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
        .description('register a "joiner" configuration file on the dashboard server')
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
        .description('deregister a "joiner" configuration file on the dashboard server')
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
            const configuration = program.opts().configuration
                || await getDefaultConfigurationFilepath();

            await listCommand(
                configuration,
            );
        });


    program
        .command('run <package> <command...>')
        .description('run an arbitrary command on package by name or on "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            command: string[],
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await runCommand(
                packageName,
                command,
                options,
            );
        });

    program
        .command('command <package> <command...>')
        .description('run the named commands specified in the "joiner" file on package by name or on "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commands: string[],
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await commandCommand(
                packageName,
                commands,
                options,
            );
        });


    program
        .command('update <package>')
        .description('update package by name or "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await updateCommand(
                packageName,
                options,
            );
        });

    program
        .command('patch <package>')
        .description('patch package version by name or "all" packages')
        .option(
            '-t, --type <versionType>',
            'version type: major, minor, patch',
            'patch',
        ).action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = program.opts();

            const {
                configuration,
            } = options;

            const {
                type,
            } = commandOptions;

            const resvoledConfiguration = configuration
                || await getDefaultConfigurationFilepath();

            await patchCommand(
                packageName,
                resvoledConfiguration,
                type,
            );
        });

    program
        .command('commit <package>')
        .description('commit package by name or "all" packages')
        .option(
            '-m, --message <text>',
            'commit message',
            '',
        ).action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = program.opts();

            const {
                configuration,
            } = options;

            const {
                message,
            } = commandOptions;

            const resvoledConfiguration = configuration
                || await getDefaultConfigurationFilepath();

            await commitCommand(
                packageName,
                resvoledConfiguration,
                message,
            );
        });

    program
        .command('publish <package>')
        .description('publish package by name or "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await publishCommand(
                packageName,
                options,
            );
        });


    program
        .command('ucom <package>')
        .description('ucom - update, commit - package by name or "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await ucomCommand(
                packageName,
                options,
            );
        });

    program
        .command('upcom <package>')
        .description('upcom - update, patch, commit - package by name or "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await upcomCommand(
                packageName,
                options,
            );
        });

    program
        .command('upcomlish <package>')
        .description('upcomlish - update, patch, commit, publish - package by name or "all" packages')
        .option(
            optionsParallelCommand,
            optionsParallelDescription,
            optionsParallelDefault,
        ).option(
            optionsBatchCommand,
            optionsBatchDescription,
            optionsBatchDefault,
        )
        .action(async (
            packageName: string,
            commandOptions: any,
        ) => {
            const options = await resolveExecutionOptions(
                program,
                commandOptions,
            );

            await upcomlishCommand(
                packageName,
                options,
            );
        });


    program
        .command('develop')
        .description('start a server to listen for changes in the development watched packages and update the cross-dependencies')
        .action(async () => {
            const configuration = program.opts().configuration
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
