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


Multi/Mono-Repository Task Runner.

Supported languages:

+ `JavaScript`
+ `TypeScript`

For `JavaScript`/`TypeScript`, `joiner` can be used on its own or conjoined with `Yarn Workspaces`.


### Contents

+ [Install](#install)
+ [Usage](#usage)
    + [Command-Line Interface](#command-line-interface)
    + [Configuration File](#configuration-file)
+ [Advanced Usage](#advanced-usage)
    + [Path Resolution](#path-resolution)
+ [Packages](#packages)



## Install

It is recommended that `joiner` is installed globally. To install, [NodeJS](https://nodejs.org/en/) is presumed to be already on the system, run the command

``` bash
npm install -g @plurid/joiner
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

Initialize by running, in the root folder of the project(s), the command

``` bash
joiner initialize
```

`Joiner` requires† a `joiner.yaml` file where the packages paths must be registered such as

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

where the `multi-package-folder` is a directory containing multiple folders with their own `package.json`.

The packages paths are resolved relative to the folder from where the command is called. See [path resolution](#path-resolution).

† when using `yarnWorkspace: true` the `packages` field can be removed/commented, `joiner` will look for the packages in the `workspaces` field of the root `package.json`.


### Command-Line Interface

Options:

    -v, --version                   output the version number
    -c, --configuration <file>      path to the .yaml configuration file (default: "joiner.yaml")
    -h, --help                      display help for command

Commands:

    run <packageName> <command...>  run arbitrary command on package by name or on "all" packages
    initialize                      initialize joiner.yaml file
    list                            list joiner commandable packages
    update <packageName>            update package by name or "all" packages
    patch [options] <packageName>   patch package version by name or "all" packages
    commit <packageName>            commit package by name or "all" packages
    publish <packageName>           publish package by name or "all" packages
    ucom <packageName>              upcom - update, commit - package by name or "all" packages
    upcom <packageName>             upcom - update, patch, commit - package by name or "all" packages
    upcomlish <packageName>         upcomlish - update, patch, commit, publish - package by name or "all" packages

Instead of `packageName` the signifier `all` can be used to run the command on all the registered packages.

To `run` a `command...` with flags, the divider `--` must be used, e.g. `joiner run all -- yarn add -D <some-development-dependency>`.


### Configuration File

The `joiner.yaml` configuration file can be at the root of the packages/workspaces and the `CLI` will parse it by default, or it can be specified at runtime with the `-c, --configuration <file>` option.

The `joiner.yaml` configuration file has as required fields only the `packages` field (or, if using Yarn Workspaces, the `yarnWorkspace` field set to `true`).

The `joiner.yaml` fields:

``` yarn
### required
packages:
  - /path/to/package
  - /path/to/multi-package/*

# default: false
yarnWorkspace: false | true


### optional
package:
  # default: yarn
  manager: yarn | npm

  # default: npm
  publisher: yarn | npm


commit:
  # At the moment, only git is supported.
  engine: git

  # The commit message is formed from:
  # commitRoot + packageFolderName + commitDivider + commitMessage
  # default: false
  combine: false | true

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

runFrom: '' # see Path Resolution
```



## Advanced Usage

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
