# SpaWebWorker

This project demonstrated the web worker functionality in a simple UI. There is a pseudo socket created using javascript timers. It emits large amount of data after certain intervals. Web worker keeps updating the UI with the latest 10 elements through main thread. User can edit few parameters from UI e.g. timer time, array size, array IDs to be specifically selected.

This app also uses class transformer from https://www.npmjs.com/package/class-transformer. With the help of this main thread eits plain object in form of a class.

App also incorporates use of ngRx for store management, Angular Material and Bootstrap for good UI. ESLint and Prettier for app linting.

![Screenshot 2022-12-23 190608](https://user-images.githubusercontent.com/119619653/209357160-8bd5a4db-1d95-45f9-a236-2233f25f5c77.png)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
