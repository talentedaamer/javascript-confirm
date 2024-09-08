# javascript-confirm!
JavaScript Confirm is a lightweight, customizable library that replaces the default browser confirmation dialog with a sleek, modern UI. It’s easy to integrate into any project and doesn’t require jQuery, making it ideal for minimalistic setups. Compatible with AMD, CommonJS, and browser globals.

### ![javascript-confirm](https://raw.githubusercontent.com/talentedaamer/javascript-confirm/main/docs/assets/images/logo-javascript-confirm.svg "javascript-confirm")
*A ***lightweight***, ***customizable*** JavaScript library for modern ***confirmation dialogs*** without ***jQuery***.*

* Easy integration.
* Sleek and minimal design.
* Simple and lightweight without need of jQuery.
* Customizable options for your design needs.

### ***View Demo [Examples & Documentation](https://talentedaamer.github.io/javascript-confirm/)***


## Installation

Once you've downloaded the plugin, place the javascript-confirm.min.js file in your project's JavaScript directory (e.g., /js/).

`<script src="assets/js/javascript-confirm.min.js"></script>`

**Or using cdn link**

`<script src="https://cdn.jsdelivr.net/gh/talentedaamer/javascript-confirm/dist/javascript-confirm.min.js"></script>`

## Usage
Usage with minimum options

````
javascriptConfirm(document.getElementById("example_1"), {
    onConfirm: function() {
        // do something
    },
});
````
**or simple use**

````
var element = document.getElementById("dom_element_id");
javascriptConfirm(element, {
    title: "Delete User",
    message: "Do you want to delete this user?",
    confirmText: "Delete",
    confirmClass: "btn btn-sm btn-primary",
    cancelText: "Cancel",
    cancelClass: "btn btn-sm btn-danger",
    cancelOnBackdropClick: true,
    width: '400px',
    onConfirm: function() {
        // delete user
    },
    onCancel: function() {
        // do nothing
    },
});
````

## Options
### `javascriptConfirm(element, options)`

This function initializes and displays a confirmation dialog, allowing you to customize the behavior, appearance, and interactions. It is designed to work in browsers and various module environments (e.g., AMD, CommonJS).

#### Parameters

- **element**: (HTMLElement, required):  
  The DOM element to which the confirmation dialog is applied. This must be a valid HTML element. If the element is invalid or not provided, an error will be logged, and the function will exit early.

- **options**: (Object, required):  
  Configuration options for customizing the confirmation dialog. If an invalid or missing options object is passed, an error will be logged.


| Option                   | Description                                                                                              |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| `title: string`           | The title displayed at the top of the confirmation dialog. Default value: `""`.                          |
| `message: string`         | The message text shown in the confirmation dialog. Default value: `"Are you sure?"`.                     |
| `confirmText: string`     | The label of the "confirm" button. Default value: `"Confirm"`.                                           |
| `confirmClass: string`    | Custom CSS classes applied to the "confirm" button to control its appearance. Default value: `jc-btn jc-success`. |
| `cancelText: string`      | The label of the "cancel" button. Default value: `"Cancel"`.                                             |
| `cancelClass: string`     | Custom CSS classes applied to the "cancel" button to control its appearance. Default value: `jc-btn jc-danger`. |
| `cancelOnBackdropClick: boolean` | Determines whether clicking on the backdrop (outside the dialog) will cancel the action and close the dialog. Default value: `false`. |
| `width: string`           | Sets the width of the confirm dialog. Accepts any valid CSS unit (e.g., px, em, rem, vw, %). Default value: `'300px'`. |
| `onConfirm: function`     | Callback function executed when the user confirms the action. Default: an empty function `function() {}`. |
| `onCancel: function`      | Callback function executed when the user cancels the action. Default: an empty function `function() {}`.  |


## Changelog

***(1.0.1)***
* Initial Release

## Author

***[Aamer Shahzad](https://talentedaamer.github.io/) <talentedaamer@gmail.com>***

## Copyright and license

Copyright (C) 2024 javascript-confirm

Licensed under [MIT license](LICENSE).