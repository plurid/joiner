<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/joiner/master/about/identity/joiner-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/joiner">
        <img src="https://img.shields.io/npm/v/@plurid/joiner.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://github.com/plurid/joiner/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    joiner
</h1>


Multi/Mono-Repository Task Runner.

Intended to be conjoined with Yark Workspaces.


## Usage

Joiner requires a `joiner.yaml` file at the root of the packages/workspaces.

In the `joiner.yaml` file the packages must be registered such as

``` yaml
packages:
  - /path/to/package-1
  - /path/to/package-2
```

### Commands

    joiner run <packageName> <command...>
    joiner update <packageName>
    joiner patch <packageName>
    joiner commit <packageName>
    joiner publish <packageName>
    joiner upcomlish <packageName>      all-in-one command to update, patch version,
                                        commit, and publish the package

Instead of `packageName` the signifier `all` can be used to run the command on all the registered packages.
