import fs from 'fs';
import path from 'path';

import {
    ncp,
} from 'ncp';

import {
    ConfigurationFile,
    Package,
    DevelopmentWatchEventData,
} from '../../data/interfaces';

import {
    debouncedCallback,
} from '../../services/utilities';



export const developmentPackageUpdateDirectoryLogic = async (
    workPackage: Package,
    updatePackage: Package,
    watchDirectory: string,
) => {
    const watchDirectoryPath = path.join(workPackage.path, watchDirectory);
    const updatePackageDependencyPath = path.join(
        updatePackage.path,
        'node_modules',
        workPackage.name,
    );
    // console.log('updatePackageDependencyPath', updatePackageDependencyPath);
    const updatePackageDependencyBuildPath = path.join(
        updatePackageDependencyPath,
        watchDirectory,
        );
    // console.log('updatePackageDependencyBuildPath', updatePackageDependencyBuildPath);

    if (fs.existsSync(watchDirectoryPath)) {
        // check that the updatePackage is actually dependent on the workPackage
        if (!fs.existsSync(updatePackageDependencyPath)) {
            return;
        }

        // check that if there is already a build folder
        if (fs.existsSync(updatePackageDependencyBuildPath)) {
            fs.rmdirSync(
                updatePackageDependencyBuildPath,
                { recursive: true },
            );
        }

        fs.mkdirSync(
            updatePackageDependencyBuildPath,
            { recursive: true },
        );

        /**
         * copy
         * workPackage.path/watchDirectory
         * to
         * updatePackage/node_modules/workPackage.name/watchDirectory
         */
        ncp(watchDirectoryPath, updatePackageDependencyBuildPath, (error) => {
            if (error) {
                return console.error(error);
            }

            const date = new Date();

            console.log(`\t[${date.toLocaleTimeString()} - ${date.toLocaleDateString()}]: Copied '${workPackage.name}' build output '${watchDirectory}' to '${updatePackage.name}' dependency folder.`);
        });
    }
}


export const developmentPackageUpdateLogic = (
    registeredPackage: string,
    updatePackage: Package,
    configuration: ConfigurationFile,
) => {
    const workPackage = configuration.packages.find(
        configPackage => configPackage.name === registeredPackage,
    );
    if (!workPackage) {
        return;
    }

    for (const watchDirectory of configuration.development.watchDirectories) {
        developmentPackageUpdateDirectoryLogic(
            workPackage,
            updatePackage,
            watchDirectory,
        );
    }
}


class DevelopmentWatcher {
    private configuration: ConfigurationFile;
    private watchers: fs.FSWatcher[] = [];
    private packageRegistry: Set<string> = new Set();

    constructor(
        configuration: ConfigurationFile,
    ) {
        this.configuration = configuration;
    }

    public start() {
        const {
            watchPackages,
            watchDirectories,
        } = this.configuration.development;

        try {
            for (const watchPackage of watchPackages) {
                const packageData = this.configuration.packages.find(
                    workPackage => watchPackage === workPackage.name
                );
                if (!packageData) {
                    continue;
                }

                const watcher = fs.watch(
                    packageData.path,
                    {
                        recursive: true,
                    },
                    (event, filename) => this.watchFunction(
                        event,
                        filename,
                        packageData,
                        watchDirectories,
                    ),
                );

                this.watchers.push(watcher);
            }
        } catch (error) {
            return;
        }
    }

    public stop() {
        for (const watcher of this.watchers) {
            watcher.close();
        }
    }


    private updatePackageRegistry(
        eventData: DevelopmentWatchEventData,
    ) {
        const {
            package: packageData,
        } = eventData;

        this.packageRegistry.add(packageData.name);
    }

    private watchFunction(
        event: string,
        filename: string,
        packageData: Package,
        watchDirectories: string[],
    ) {
        if (filename.includes('node_modules')) {
            return;
        }

        for (const watchDirectory of watchDirectories) {
            if (filename.includes(watchDirectory)) {
                const updateData: DevelopmentWatchEventData = {
                    event,
                    filename,
                    package: packageData,
                };

                this.updatePackageRegistry(updateData);

                this.debouncedDevelopmentPackagesUpdate(
                    this.configuration,
                    this.packageRegistry,
                );
            }
        }
    }

    private unregisterPackage(
        packageName: string,
    )  {
        const newSet = new Set<string>();

        for (const registeredPackage of this.packageRegistry) {
            if (packageName !== registeredPackage) {
                newSet.add(registeredPackage);
            }
        }

        this.packageRegistry = newSet;
    }

    private developmentPackagesUpdate = (
        configuration: ConfigurationFile,
        packageRegistry: Set<string>,
    ) => {
        for (const registeredPackage of packageRegistry) {
            // Loop over modules.
            // TODO Better way: have a given dependency graph
            for (const updatePackage of configuration.packages) {
                /** Skip if it's itself */
                if (updatePackage.name === registeredPackage) {
                    continue;
                }

                developmentPackageUpdateLogic(
                    registeredPackage,
                    updatePackage,
                    configuration,
                );
            }

            this.unregisterPackage(registeredPackage);
        }
    }

    private debouncedDevelopmentPackagesUpdate = debouncedCallback(
        this.developmentPackagesUpdate,
        3_300,
    );
}


export default DevelopmentWatcher;
