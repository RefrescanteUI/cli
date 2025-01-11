#!/usr/bin/env bun

/**
 * @fileoverview RefrescanteUI CLI - Command line interface for managing RefrescanteUI projects
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { readFileSync } from "fs";
import type { ArgumentsCamelCase, Argv } from 'yargs';

/**
 * Interface for CLI arguments passed to command handlers
 * @interface CLIArguments
 */
interface CLIArguments {
    componentName?: string;
    components?: string[];
    [key: string]: unknown;
}

/**
 * Read package version from package.json
 * Used for displaying version information in CLI commands
 */
const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

// Handle standalone version flag before yargs initialization
if (process.argv.includes("--version")) {
    console.log(version);
    process.exit(0);
}

/**
 * Initialize the CLI with yargs
 * Configure global options and command structure
 */
const cli = yargs(hideBin(process.argv))
    // Set CLI name and usage information
    .scriptName("refrescante")
    .usage("Usage: $0 <command> [options]")
    // Configure global help and version flags
    .help()
    .alias("h", "help")
    .version(version)
    .alias("v", "version")
    /**
     * Default command - displays version when no command is specified
     * @command $0
     */
    .command(
        "$0",
        "Displays version number",
        () => {},
        () => {
            console.log(`Refrescante version: ${version}`);
        }
    )
    /**
     * Initialize a new RefrescanteUI project
     * Sets up the necessary files and structure in the current directory
     * @command init
     */
    .command(
        "init",
        "Initialize the RefrescanteUI project in the current directory",
        () => {},
        () => {
            console.log("Initializing RefrescanteUI project...");
        }
    )
    /**
     * Add a new component to the project
     * @command add <component-name>
     * @param {string} component-name - Name of the component to create
     */
    .command(
        "add <component-name>",
        "Add a component to the project",
        (yargs) => {
            return yargs.positional("component-name", {
                describe: "The name of the component to add",
                type: "string",
                demandOption: true,
            });
        },
        (argv: CLIArguments) => {
            console.log(`Adding component: ${argv["component-name"]}`);
        }
    )
    /**
     * Remove an existing component from the project
     * @command remove <component-name>
     * @param {string} component-name - Name of the component to remove
     */
    .command(
        "remove <component-name>",
        "Remove a component from the project",
        (yargs) => {
            return yargs.positional("component-name", {
                describe: "The name of the component to remove",
                type: "string",
                demandOption: true,
            });
        },
        (argv: CLIArguments) => {
            console.log(`Removing component: ${argv["component-name"]}`);
        }
    )
    /**
     * Upgrade RefrescanteUI package or specific components
     * @command upgrade [components...]
     * @param {string[]} [components] - Optional list of components to upgrade
     */
    .command({
        command: 'upgrade [components...]',
        describe: 'Upgrade Refrescante package version and optionally specific components or all',
        builder: {
            components: {
                describe: 'List of components to upgrade (leave blank to upgrade all)',
                type: 'array',
            },
        },
        handler: (argv: ArgumentsCamelCase) => {
            const components = argv.components as string[] | undefined;
            if (components?.length) {
                console.log(`Upgrading components: ${components.join(", ")}`);
            } else {
                console.log("Upgrading Refrescante package and all components...");
            }
        },
    })
    /**
     * Remove RefrescanteUI completely from the project
     * @command wipe
     */
    .command(
        "wipe",
        "Remove the Refrescante package from the project",
        () => {},
        (argv: CLIArguments) => {
            console.log("Wiping Refrescante package from the project...");
        }
    )
    // Enable strict mode to catch invalid commands
    .strict()
    // Require at least one command to be specified
    .demandCommand(1, "You need to specify a command");

// Parse and execute the command
cli.parse();