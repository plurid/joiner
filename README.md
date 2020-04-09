<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/joiner/master/about/identity/joiner-logo.png" height="250px">
    <br />
    <!-- <img src="https://img.shields.io/badge/cli-v0.1.0-blue.svg?colorB=1380C3&style=for-the-badge" alt="CLI"> -->
    <a target="_blank" href="https://github.com/plurid/joiner/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    joiner
</h1>


<h3 align="center">
    Multi/Mono-Repository Task Runner
</h1>


Supported languages:

+ `JavaScript`
+ `TypeScript`

For `JavaScript`/`TypeScript`, `joiner` can be used on its own or conjoined with `Yarn Workspaces`.


### Contents

+ [Install](#install)
+ [Usage](#usage)
    + [Setup](#setup)
    + [Command-Line Interface](#command-line-interface)
    + [Configuration File](#configuration-file)
+ [Advanced Usage](#advanced-usage)
    + [Aliases](#aliases)
    + [Development](#development)
    + [High-Scale](#high-scale)
    + [Joiner Package](#joiner-package)
    + [Path Resolution](#path-resolution)
+ [Packages](#packages)



## Install

It is recommended that `joiner` is installed globally. To install, [NodeJS](https://nodejs.org/en/) is presumed to be already on the system, run the command

``` bash
npm install --global @plurid/joiner
```

or

``` bash
yarn global add @plurid/joiner
```

If global installation is not an option or not preferred, run the command using `npx`

``` bash
npx @plurid/joiner <joiner commands and options>
```



## Usage

### Setup

Initialize by running, in the root folder of the project(s), the command

``` bash
joiner initialize
```

`Joiner` requires† a `joiner.yaml`‡ file where the packages paths must be registered such as

``` yaml
packages:
  - /path/to/package-1
  - /path/to/package-2
```

Catch-all paths can be used with `/*` such as

``` yaml
packages:
  - /path/to/multi-package-folder/*
  - /path/to/package-2
```

where the `multi-package-folder` is a directory containing multiple folders with their own `package.json`, or [`joiner.package.yaml`](#joiner-package).

The packages paths are resolved relative to the folder from where the command is called. See [path resolution](#path-resolution).

† when using `yarnWorkspace: true` the `packages` field can be removed/commented, `joiner` will look for the packages in the `workspaces` field of the root `package.json`.

‡ `joiner` will by default look for a `joiner.yaml` file in the working directory, but the file can be arbitrarily named/placed, provided it is passed to the `-c, --configuration` option.


### Command-Line Interface

Options:

    -v, --version                   output the version number

    -c, --configuration <file>      path to the .yaml configuration file (default: "joiner.yaml")

    -h, --help                      display help for command

Commands:

    run <packageName> <command...>  run an arbitrary command on package by name or on "all" packages

    initialize                      initialize the "joiner.yaml" file

    list                            list joiner commandable packages

    update <packageName>            update package by name or "all" packages

    patch [options] <packageName>   patch package version by name or "all" packages

    commit [options] <packageName>  commit package by name or "all" packages

    publish <packageName>           publish package by name or "all" packages

    ucom <packageName>              ucom - update, commit - package by name or "all" packages

    upcom <packageName>             upcom - update, patch, commit - package by name or "all" packages

    upcomlish <packageName>         upcomlish - update, patch, commit, publish - package by name or "all" packages

    develop                         start a server to listen for changes in the development watched packages
                                    and update the cross-dependencies

Instead of `packageName` the signifier `all` can be used to run the command on all the registered packages.

To `run` a `command...` with flags, the divider `--` must be used, e.g. `joiner run all -- yarn add -D <some-development-dependency>`.


### Configuration File

The `joiner.yaml` configuration file can be at the root of the packages/workspaces and the `CLI` will parse it by default, or it can be specified at runtime with the `-c, --configuration <file>` option.

The `joiner.yaml` configuration file has as required fields only the `packages` field (or, if using Yarn Workspaces, the `yarnWorkspace` field set to `true`).

The `joiner.yaml` fields:

``` yaml
### required
packages:
  - /path/to/package
  - /path/to/multi-package/*

# default: false
yarnWorkspace: false # false | true


### optional
package:
  # default: yarn
  manager: yarn # yarn | npm

  # default: npm
  publisher: npm # yarn | npm

  # Names of the packages or paths of the folders to be ignored by the "all" signifier.
  # Helpful when the packages are registered in bulk with "/*"
  # and some of the folders are not actually packages (fixtures, specifications).
  # default: []
  ignore: []


commit:
  # At the moment, only git is supported.
  engine: git

  # The commit message is formed from:
  # commitRoot + packageFolderName + commitDivider + commitMessage
  # default: false
  combine: false # false | true

  # The root of the packages/workspace.
  root: '/path/to/root'

  # Use the full folder of the package in the commit message
  # or only the folder name of the package.
  fullFolder: false

  # Separator between the packageFolderName and the commitMessage.
  # default: ' > '
  divider: ' > '

  # The actual commit messsage.
  # default: 'setup: package'
  message: 'setup: package'

# see Advanced Usage -> Path Resolution
runFrom: ''

# see Advanced Usage -> Development
development:
  watchPackages: 'all' # ['packageName'] | 'packageName' | 'all'
  serverPort: 55000
  watchDirectories: ['build', 'distribution', 'dist']
  externalPackages: []
```



## Advanced Usage


### Aliases

Recommended `Joiner` Aliases for the terminal

``` bash
alias j='joiner'
alias ju='joiner update'
alias jua='joiner update all'
alias jp='joiner patch'
alias jpa='joiner patch all'
alias jc='joiner commit'
alias jca='joiner commit all'
alias jpub='joiner publish'
alias jpuba='joiner publish all'
```


### Development

Cross-linking packages depending on each other with symlinks becomes very fast a complete mess, especially when the dependency chain is beyond 2-3 links, and even more so when one of the packages does not play well with having a copy of itself in the dependency graph.

`Joiner` goes the "dumb" way: instead of symlinking the complete folder into `node_modules`, giving rise to the mess in the first place, `joiner` merely watches and copies the build process output (`/build`, `/distribution`, or any other folder) of a package into the adequate dependency folder for each 'linked', that is referenced, package.

To setup the packages linkage, the configuration file should have at least the `watchPackages` field, if not, all the registered packages will be watched.

``` yaml
development:
  # The packages which are targeted for development watch.
  # The server will listen for file changes in the `watch directory` of the `package`
  # and copy the files to the `node_modules` of all the packages which require them.
  # The catch-all 'all' can be used, or a single package can be passed.
  # default: all
  watchPackages: 'all' # ['packageName'] | 'all' | 'packageName'

  # Port for the server started with `joiner develop`.
  # default: 55000
  serverPort: 55000

  # default: ['build', 'distribution', 'dist']
  watchDirectories: ['build', 'distribution', 'dist']

  # Paths to other packages which need to be linked/watched/updated
  # but which do not belong to the same life-cycle management
  # as the top-defined `packages`.
  # default: []
  externalPackages: []
```

To start the development server and the watchers, run the command

`joiner develop`


### High-Scale

For multi-/mono-repositories containing 100+ packages, it is generally useful to have a `/scripts/joiner` directory as close as possible to the root directory with multiple, segmented `joiner.yaml` files, appropriately named, e.g. `joiner.backends.yaml`, `joiner.frontends.yaml`. The `joiner` commands will then be run from the root directory, and all the `joiner.yaml` files will resolve the paths in a similar fashion.


### Joiner Package

Instead of relying on the `package.json` file to specify the package-related data (name, dependencies), a `joiner.package.yaml` file can be created.

``` yaml
name: package-name
```

This feature is recommended for using `joiner` with other languages besides `JavaScript`-based project, and/or for using `joiner` as a meta-controller of multiple separated projects.


### Path Resolution

`Joiner` can be used to couple arbitrary packages, spread across the filesystem, and perform any kind of maintenance cycle (run commands, update, patch, commit, publish) on them specifically.

The `joiner.yaml` file can be anywhere on the filesystem. Consider the following file structure

``` fs
    | .
    | - packages
        | - package-a
        | - package-b
            | - package-b1
            | - package-b2
    | - scripts
        | - joiners
```

The folder `./scripts/joiners` contains multiple `joiner.yaml` files. For example

``` yaml
# joiner-b2-a.yaml
---
packages:
  - ./packages/package-b/package-b2
  - ./packages/package-a
```

``` yaml
# joiner-all.yaml
---
packages:
  - ../../packages/package-b/*
  - ../../packages/package-a
```

Running the command

``` bash
joiner update all -c ./scripts/joiners/joiner-b2-a.yaml
```

from the `root` directory will update all the packages mentioned in the `./scripts/joiners/joiner-b2-a.yaml` file (`package-b/package-b2` first, and then `package-a`).

While running the command

``` bash
joiner update all -c ./joiner-all.yaml
```

from the `./scripts/joiners` directory will update all the packages in `./packages/package-b` and the `packages/package-a` package.

In order to not run the command from a wrong directory, which will result in bad path resolution, the field `runFrom` can be specified

``` yaml
runFrom: ../../
```

which contains a path trunk, relative to the `joiner.yaml` file, from which the packages paths will be resolved, irrespective from where the `joiner` command is run.



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/joiner">
    <img src="https://img.shields.io/npm/v/@plurid/joiner.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/joiner][joiner] • the CLI application

[joiner]: https://github.com/plurid/datasign/tree/master/packages/joiner
