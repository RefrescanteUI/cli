# @refrescante

Command line interface for managing RefrescanteUI projects. This tool helps you initialize, manage components, and handle updates for your RefrescanteUI-based applications.

## Installation

```bash
# Using bun
bun install -g @refrescante
```

## Usage

After installation, you can use the `refrescante` command in your terminal:

```bash
refrescante [command] [options]
```

### Available Commands

#### Initialize a New Project

```bash
refrescante init
```

Creates a new RefrescanteUI project in the current directory, setting up all necessary files and configurations.

#### Add Components

```bash
refrescante add <component-name>
```

Adds a new component to your project. The component will be created with the RefrescanteUI recommended structure and styling.

#### Remove Components

```bash
refrescante remove <component-name>
```

Safely removes a component from your project, cleaning up any associated files and references.

#### Upgrade Components

```bash
# Upgrade all components
refrescante upgrade

# Upgrade specific components
refrescante upgrade button input card
```

Updates RefrescanteUI components to their latest versions, ensuring compatibility and adding new features.

#### Remove RefrescanteUI

```bash
refrescante wipe
```

Completely removes RefrescanteUI from your project, cleaning up all associated files and configurations.

### Global Options

- `-h, --help`: Display help information
- `-v, --version`: Display CLI version

## Development

To contribute to the CLI tool:

```bash
# Clone the repository
git clone https://github.com/refrescante/cli.git

# Install dependencies
cd cli
bun install

# Run tests
bun test
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](link-to-contributing-guide) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [RefrescanteUI](link-to-main-project) - The main UI component library
- [Documentation](https://refrescante.dev) - Official documentation

## Support

- [Issue Tracker](https://github.com/refrescante/cli/issues)
- [Discord Community](link-to-discord)

## Credits

Built with [Bun](https://bun.sh) and [yargs](https://yargs.js.org/).
