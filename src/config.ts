import * as context from './context';
import * as core from '@actions/core';
import {existsSync, readFileSync} from 'fs';

interface Config {
  registry: string;
  username: string;
  password: string;
}

function readConfig(configPath: string): Record<string, Config> {
  if (!existsSync(configPath)) {
    const message = `⚠️ [FILE] ${configPath} Required file exist.`;
    throw new Error(message);
  }
  try {
    core.info(`[FILE] reading ${configPath} file ...`);
    const fileContents = readFileSync(configPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    const message = `⚠️[FILE] reading file error. configPath: ${configPath}, message:  ${error.message}`;
    throw new Error(message);
  }
}

export function loadConfig(input: context.Inputs) {
  if (input.configPath) {
    core.info('[loadConfig] start.');
    const config = readConfig(input.configPath);
    if (!config || !config[input.configKey]) {
      const message = `⚠️ [loadConfig] config not fount. configPath: ${input.configPath}, configKey: ${input.configKey}`;
      throw new Error(message);
    }
    input.registry = config[input.configKey].registry;
    input.username = config[input.configKey].username;
    input.password = config[input.configKey].password;
    core.exportVariable('REGISTRY', input.registry);
    core.info('✅ [loadConfig] success.');
    return;
  }
  core.warning(`⚠️ [loadConfig] config is not fill. configPath: ${input.configPath}`);
}
