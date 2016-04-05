'use strict';

import SimpleSorting from './simple-sorting';
import { NeverDullServer } from './server';

export function getDefaultModules() {
  return [
    new SimpleSorting()
  ];
}

export { NeverDullServer as Server };
