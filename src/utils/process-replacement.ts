import { spawnSync } from "child_process";

/**
 * Launches a command with full terminal control using spawnSync.
 * Blocks until the command completes.
 *
 * @param command - The command to execute
 * @param args - Arguments for the command
 * @param options - Execution options
 *
 * @example
 * ```ts
 * launchWithTerminalControl('cursor-agent', ['prompt text'], { cwd: '/path' });
 * // Blocks until cursor-agent exits
 * ```
 */
export const launchWithTerminalControl = (
  command: string,
  args: string[],
  options: { cwd: string }
): void => {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    stdio: "inherit",
  });

  if (result.error) {
    throw new Error(`Failed to execute ${command}: ${result.error.message}`);
  }

  // Exit with the same code as the child process
  if (result.status !== null) {
    process.exit(result.status);
  }
};

