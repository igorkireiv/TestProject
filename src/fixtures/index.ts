import { test as base, expect } from '@playwright/test';
import  * as fixtures  from './fixturePages';

const test = base.extend(fixtures);

export { test, expect };