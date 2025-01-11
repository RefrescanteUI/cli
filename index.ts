#!/usr/bin/env bun
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { readFileSync } from "fs";

/**
 * Read the version number from package.json.
 * This will be used for displaying version information in the CLI.
 */
const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

/**
 * If the `--version` flag is provided, print the version number and exit.
 * This ensures that the version can be checked without invoking any commands.
 */
if (process.argv.includes("--version")) {
    console.log(version);
    process.exit(0);
}

// Initialize yargs CLI instance and store it in a variable
const cli = yargs(hideBin(process.argv))
    .scriptName("refrescante") // Name of the CLI tool
    .usage("Usage: $0 <command> [options]") // Usage instructions
    .help() // Provide help on usage when --help is called
    .alias("h", "help") // Short alias for --help
    .version(version) // Automatically handles --version
    .alias("v", "version") // Short alias for --version
    /**
     * Default command when no other commands are provided.
     * Displays the version number and the general help message.
     */
    .command(
        "$0",
        "Displays version and help message",
        () => {},
        () => {
            console.log(`Refrescante version: ${version}`);
            cli.showHelp(); // Show help message using the stored CLI instance
        }
    )
    /**
     * Initializes a new RefrescanteUI project.
     * Placeholder logic can be added here for initializing the project.
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
     * Adds a component to the project.
     * The component name is required and passed as a positional argument.
     */
    .command(
        "add <component-name>",
        "Add a component to the project",
        (yargs) => {
            return yargs.positional("component-name", {
                describe: "The name of the component to add",
                type: "string",
                demandOption: true, // Component name is mandatory
            });
        },
        (argv) => {
            console.log(`Adding component: ${argv["component-name"]}`);
        }
    )
    /**
     * Removes a component from the project.
     * The component name is required and passed as a positional argument.
     */
    .command(
        "remove <component-name>",
        "Remove a component from the project",
        (yargs) => {
            return yargs.positional("component-name", {
                describe: "The name of the component to remove",
                type: "string",
                demandOption: true, // Component name is mandatory
            });
        },
        (argv) => {
            console.log(`Removing component: ${argv["component-name"]}`);
        }
    )
    /**
     * Upgrades the Refrescante package or specific components.
     * If components are provided, those are upgraded, otherwise, all components are upgraded.
     */
    .command(
        "upgrade [components...]",
        "Upgrade Refrescante package version and optionally specific components or all",
        (yargs) => {
            return yargs.option("components", {
                describe: "List of components to upgrade (leave blank to upgrade all)",
                type: "array",
            });
        },
        (argv) => {
            if (argv.components?.length) {
                console.log(`Upgrading components: ${argv.components.join(", ")}`);
            } else {
                console.log("Upgrading Refrescante package and all components...");
            }
        }
    )
    /**
     * Wipes the Refrescante package from the project.
     * Placeholder logic can be added for cleanup.
     */
    .command(
        "wipe",
        "Remove the Refrescante package from the project",
        () => {},
        (argv) => {
            console.log("Wiping Refrescante package from the project...");
        }
    )
    .strict() // Enforce strict mode to ensure a valid command is provided
    .demandCommand(1, "You need to specify a command"); // Ensure that at least one command is specified

// Parse the arguments
cli.parse();