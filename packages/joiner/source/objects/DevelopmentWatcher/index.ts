import fs from 'fs';
import path from 'path';

import {
    ConfigurationFile,
} from '../../data/interfaces';



class DevelopmentWatcher {
    private configuration: ConfigurationFile;
    private watchers: fs.FSWatcher[] = [];

    constructor(
        configuration: ConfigurationFile,
    ) {
        this.configuration = configuration;
    }

    start() {
        try {
            const developmentPackages = this.configuration.development.watchPackages;
            console.log(this.configuration);
            console.log(developmentPackages);

            for (const developmentPackage of developmentPackages) {
                const watcher = fs.watch(developmentPackage, (event, filename) => {
                    // debounced function
                    // which copies the build folders to all the development packages

                    console.log('event', event);
                    console.log('filename', filename);
                });

                this.watchers.push(watcher);
            }
        } catch (error) {
            return;
        }
    }

    stop() {
        for (const watcher of this.watchers) {
            watcher.close();
        }
    }
}


export default DevelopmentWatcher;
