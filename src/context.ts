import * as core from '@actions/core';
import {loadConfig} from './config';

export interface Inputs {
  configPath: string;
  configKey: string;
  registry: string;
  username: string;
  password: string;
  ecr: string;
  logout: boolean;
}

export function getInputs(): Inputs {
  const input = {
    configPath: core.getInput('configPath'),
    configKey: core.getInput('configKey'),
    registry: core.getInput('registry'),
    username: core.getInput('username'),
    password: core.getInput('password'),
    ecr: core.getInput('ecr'),
    logout: core.getBooleanInput('logout')
  };
  loadConfig(input)
  return input;
}
