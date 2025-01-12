#!/usr/bin/env bun

/**
 * @fileoverview RefrescanteUI CLI - Command line interface for managing RefrescanteUI projects
 * 
 * TODO: Implement i18n starting with English and Spanish
 * TODO: Add a global config command to configure common project settings
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
        () => { },
        () => {
            console.log(`Refrescante version: ${version}`);
        }
    )
    /**
     * Initialize a new RefrescanteUI project
     * Sets up the necessary files and structure in the current directory
     * @command init
     * 
     * TODO: Implement logic to create necessary files and directories
     *       e.g. src/web-components, refrescante.config.ts
     * SUGGESTION: Use fs-extra for file and directory operations.
     * EXAMPLE ADDITIONS:
     *       - Check if the directory or file is already present
     *         e.g. by checking for refrescante.config.ts and
     *         src/web-components.
     *       - Create a basic boilerplate file structure to be 
     *         fetched from the github repo.
     */
    .command(
        "init",
        "Initialize the RefrescanteUI project in the current directory",
        () => { },
        () => {
            console.log("Initializing RefrescanteUI project...");
        }
    )
    /**
     * Add a new component to the project
     * @command add <component-name>
     * @param {string} component-name - Name of the component to create
     * 
     * TODO: Generate a new component file with boilerplate from our 
     *       github repo and place it in src/web-components/<component-name>.tsx
     * SUGGESTION: Validate component-name to ensure it follows naming conventions
     * EXAMPLE ADDITIONS:
     *       - Check if the component already exists
     *         e.g. by checking for src/web-components/<component-name>.tsx
     *       - Generate a new component file with boilerplate from our 
     *         github repo and place it in src/web-components/<component-name>.tsx
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
     * 
     * TODO: Remove the component file from src/web-components/<component-name>.tsx
     * SUGGESTION: Scan pages directory for references to the component as well as 
     *             web-components directory for references to the component
     * EXAMPLE ADDITIONS:
     *       - Check if the component exists
     *         e.g. by checking for src/web-components/<component-name>.tsx
     *       - Remove the component file from src/web-components/<component-name>.tsx
     *       - Scan pages directory for references to the component
     *       - Scan web-components directory for references to the component
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
     * 
     * TODO: Implement logic to upgrade RefrescanteUI package and specific components
     *       e.g. by checking for src/web-components and src/web-components/<component-name>.tsx
     * SUGGESTION: Each component is going to have to be versioned to implement this feature.
     *             bun only recently updated the update command to allow for updating a specific
     *             package without nuking the entire bun.lockb file.
     *             SEE: https://github.com/oven-sh/bun/issues/6419
     * EXAMPLE ADDITIONS:
     *       - Check if the component exists
     *         e.g. by checking for src/web-components/<component-name>.tsx
     *       - Upgrade using bun update component-name
     * ISSUES: It might be a good idea to update every package when upgrading all. This is
     *         something we need to consider when implementing this feature.
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
     * 
     * TODO: Implement logic to remove RefrescanteUI from the project
     *       e.g. by checking for src/web-components and src/web-components/<component-name>.tsx
     *       and checking for references.
     * ISSUES: This will probably be a difficult thing to safely accomplish.
     *         We might consider creating a git backup in a special branch upon every
     *         addition to the project. Then again this might just not be worth implementing.
     */
    .command(
        "wipe",
        "Remove the Refrescante package from the project",
        () => { },
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