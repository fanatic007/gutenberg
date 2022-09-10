# Gutenberg
This is web client application for books searching using Gutendex API. Built using Angular 10 this project demonstrates usage of:
- [`Intersection Observer`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for implementing infinite scrolling
- [input type="search"](https://www.w3schools.com/tags/att_input_type_search.asp) with custom search-cancel button

The [Gutendex API](https://gutendex.com) is a hosted instance of the open source project, which in itself is an extension of data available from http://gutenberg.org, a repository of freely available books. It contains a single endpoint, with a set of query parameters that allow for filtering the books in several manners. The hosted instance is available on http://skunkworks.ignitesol.com:8000/. The API specification is provided on the last page of this document. This frontend app is an implementation of the same
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
