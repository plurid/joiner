import fs from 'fs';
import path from 'path';

import {
    ConfigurationFile,
    Package,
} from '../../data/interfaces';



export const developmentPackagesUpdate = (
    configuration: ConfigurationFile,
    packageRegistry: string[],
) => {
    for (const registeredPackage of packageRegistry) {
        for (const packageA of configuration.packages) {
            // update note_modules it they exist

            // better way
            // have a given dependency graph
        }
    }
}

export const debouncedDevelopmentPackagesUpdate = (
    configuration: ConfigurationFile,
    packageRegistry: string[],
) => {
    developmentPackagesUpdate(configuration, packageRegistry);
}


class DevelopmentWatcher {
    private configuration: ConfigurationFile;
    private watchers: fs.FSWatcher[] = [];
    private packageRegistry: string[] = [];

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

        const watchFunction = (
            event: string,
            filename: string,
            packageData: Package,
        ) => {
            if (filename.includes('node_modules')) {
                return;
            }

            for (const watchDirectory of watchDirectories) {
                if (filename.includes(watchDirectory)) {
                    const updateData = {
                        event,
                        filename,
                        packageData,
                    };

                    // for each file hit, the package registry checks
                    // if it's in a new package
                    this.updatePackageRegistry(updateData);

                    debouncedDevelopmentPackagesUpdate(
                        this.configuration,
                        this.packageRegistry,
                    );
                }
            }
        }

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
                    (event, filename) => watchFunction(event, filename, packageData),
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


    private updatePackageRegistry (
        eventData: any,
    ) {

    }
}


export default DevelopmentWatcher;
