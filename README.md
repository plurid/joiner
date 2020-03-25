<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/joiner/master/about/identity/joiner-logo.png" height="250px">
    <br />
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

For `JavaScript`/`TypeScript`, `joiner` is intended to be conjoined with `Yarn Workspaces`.


### Contents

+ [Install](#install)
+ [Usage](#usage)
    + [Command-Line Interface](#command-line-interface)
    + [Configuration File](#configuration-file)



## Install

It is recommended that `joiner` is installed globally. To install, [NodeJS](https://nodejs.org/en/) is presumed to be already on the system, run the command

```
npm install -g @plurid/joiner
```

or

```
yarn global add @plurid/joiner
```



## Usage

`Joiner` requires a `joiner.yaml` file where the packages paths must be registered such as

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
    upcomlish <packageName>         upcomlish - update, patch, commit, publish - package by name or "all" packages

Instead of `packageName` the signifier `all` can be used to run the command on all the registered packages.


### Configuration File

The `joiner.yaml` configuration file can be at the root of the packages/workspaces and the `CLI` will parse it by default, or it can be specified at runtime with the `-c, --configuration <file>` option.

The `joiner.yaml` configuration file has as required fields only the `packages` field (or, if using Yarn Workspaces, the `yarnWorkspace` field set to `true`).

The list of `joiner.yaml` fields

``` typescript
/** required */
yarnWorkspace: boolean;
packages: Package[];

/** optional */
// The commit message is formed from:
// commitRoot + packageFolder + commitDivider + commitMessage
commitCombine: boolean;

// The root of the packages/workspace.
commitRoot: string;

// Separator between the packageFolder and the commitMessage.
// Default: ' > '.
commitDivider: string;

// The actual commit messsage.
commitMessage: string;
```
