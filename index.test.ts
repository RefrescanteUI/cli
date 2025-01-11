import { expect, describe, test, beforeAll } from "bun:test";
import { spawnSync } from "child_process";
import { readFileSync } from "fs";

const CLI_PATH = "./index.ts";
const PKG_VERSION = JSON.parse(readFileSync('./package.json', 'utf8')).version;

function runCommand(args: string[] = []): { stdout: string; stderr: string; exitCode: number } {
  const result = spawnSync(process.execPath, [CLI_PATH, ...args], {
    encoding: 'utf8'
  });

  return {
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: result.status ?? -1
  };
}

describe('Refrescante CLI', () => {
  describe('version command', () => {
    test('--version shows correct version', () => {
      const { stdout, exitCode } = runCommand(['--version']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe(PKG_VERSION);
    });

    test('-v shows correct version', () => {
      const { stdout, exitCode } = runCommand(['-v']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe(PKG_VERSION);
    });
  });

  describe('help command', () => {
    test('--help shows help message', () => {
      const { stdout, exitCode } = runCommand(['--help']);
      expect(exitCode).toBe(0);
      expect(stdout).toContain('Usage: refrescante <command> [options]');
      expect(stdout).toContain('Commands:');
      expect(stdout).toContain('init');
      expect(stdout).toContain('add');
      expect(stdout).toContain('remove');
      expect(stdout).toContain('upgrade');
      expect(stdout).toContain('wipe');
    });

    test('-h shows help message', () => {
      const { stdout, exitCode } = runCommand(['-h']);
      expect(exitCode).toBe(0);
      expect(stdout).toContain('Usage: refrescante <command> [options]');
    });
  });

  describe('init command', () => {
    test('init command executes successfully', () => {
      const { stdout, exitCode } = runCommand(['init']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Initializing RefrescanteUI project...');
    });
  });

  describe('add command', () => {
    test('add command requires component name', () => {
      const { stderr, exitCode } = runCommand(['add']);
      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not enough non-option arguments');
    });

    test('add command with component name executes successfully', () => {
      const { stdout, exitCode } = runCommand(['add', 'button']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Adding component: button');
    });
  });

  describe('remove command', () => {
    test('remove command requires component name', () => {
      const { stderr, exitCode } = runCommand(['remove']);
      expect(exitCode).toBe(1);
      expect(stderr).toContain('Not enough non-option arguments');
    });

    test('remove command with component name executes successfully', () => {
      const { stdout, exitCode } = runCommand(['remove', 'button']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Removing component: button');
    });
  });

  describe('upgrade command', () => {
    test('upgrade command without components upgrades everything', () => {
      const { stdout, exitCode } = runCommand(['upgrade']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Upgrading Refrescante package and all components...');
    });

    test('upgrade command with specific components', () => {
      const { stdout, exitCode } = runCommand(['upgrade', 'button', 'input']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Upgrading components: button, input');
    });
  });

  describe('wipe command', () => {
    test('wipe command executes successfully', () => {
      const { stdout, exitCode } = runCommand(['wipe']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('Wiping Refrescante package from the project...');
    });
  });

  describe('invalid commands', () => {
    test('invalid command shows error', () => {
      const { stderr, exitCode } = runCommand(['invalid-command']);
      expect(exitCode).toBe(1);
      expect(stderr).toContain('Unknown argument: invalid-command');
    });

    test('no command shows only version', () => {
      const { stdout, exitCode } = runCommand([]);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe(`Refrescante version: ${PKG_VERSION}`);
    });
  });
});