```
setup jest -

$ npm install -D jest jest-preset-angular @types/jest

>npm remove @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter

Create 2 jest setup files

4.1 /jest.config.js

In your project root, create /jest.config.js (.js javascript file) with the following contents.
(NOTE: The file name is reserved by jest, and jest looks up this file for configuration.)

// jest.config.js (javascript file)
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

4.2 /setup-jest.ts

In your project root, create /setup-jest.ts with the following contents.
(INFO: You may change the filename with your preference as long as the file name is matched in the jest.config.js)

// setup-jest.ts
import 'jest-preset-angular/setup-jest';

5. Update files

5.1 /tsconfig.spec.json

(1) Change types from “jasmine” to “jest”.
(2) Remove files.

// Original file created by 'ng new' command.
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "files": ["src/test.ts", "src/polyfills.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}

The following is after the changes.

// After the changes
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}

5.2 /tsconfig.json

Add “esModuleInterop”: true in the CompilorOptions to remove a warning message. (See the warning message in Appendix)

{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2017",
    "module": "es2020",
    "lib": ["es2018", "dom"],
    "esModuleInterop": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "types": ["jest"]
}

5.3 /package.json

Change the test script from ng test to jest

"scripts": {
  "test": "ng test"
},==>"scripts": {
  "test": "jest --coverage"
},

6. Remove 2 files

Remove “/src/test.ts” and “/karma.config.js”.

7. Run jest with coverage option

Run npm run test, which invokes the script “jest --coverage”

 Remove test object from angular.json file

Another option to create jest config files

npx jest — init

"test": "jest --verbose",
"test:coverage": "jest --coverage",
"test:watch": "jest --watch"
```