/*
 * Module Type:     JavaScript Module
 * Module Version:  v1.0.1
 * Module Name:     javascript-confirm
 * Author Name:     Aamer Shahzad
 * Author Email:    talentedaamer@gmail.com
 * Module URL:      https://talentedaamer.github.io/javascript-confirm/
 * Github URL:      https://github.com/talentedaamer/javascript-confirm/
 * License Type:    MIT License
 * License URL:     https://github.com/talentedaamer/javascript-confirm/blob/main/LICENSE
 *
 * Copyright        2024 javascript-confirm
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Expose the factory function for CommonJS-like environments.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.javascriptConfirm = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    function javascriptConfirm(element, options) {
        /**
         * Check if element is provided and is an instance of HTMLElement
         */
        if (!(element instanceof HTMLElement)) {
            console.error('Invalid element provided. Please pass a valid HTML element. e.g document.getElementById("dom_element")');
            return;
        }

        /**
         * If options is a string, or not valid object
         * log error to the console and return
         */
        if (typeof options === 'string') {
            console.error('Invalid options object. Please provide valid options object.');
            return;
        }

        /**
         * If options is undefined, initialize it as an empty object
         * this is to avoid errors from trying to access properties of undefined
         */
        if (typeof options === 'undefined') options = {};

        /**
         * handle width option if its number
         * or its string but does not have px
         * append px to the number for width
         */
        if (typeof options.width === 'number') {
            options.width += 'px';
        }

        /**
         * Default options
         * User-provided options will override default options
         */
        var settings = Object.assign({
            title: '',
            message: 'Are you sure?',
            confirmText: 'Yes',
            cancelText: 'No',
            confirmClass: options.confirmClass || 'jc-btn jc-success',
            cancelClass: options.cancelClass || 'jc-btn jc-danger',
            onConfirm: function() {},
            onCancel: function() {},
            cancelOnBackdropClick: false,
            cancelOnEscClick: false,
            width: '300px',
        }, options);

        /**
         * Event listener for the element
         * Handle click of the element. Prevents default
         * creates and opens the created dialog
         */
        element.addEventListener('click', function(e) {
            e.preventDefault();

            /**
             * Create and append backdrop to the body
             */
            var backdrop = document.createElement('div');
            backdrop.className = 'jc-backdrop';
            document.body.appendChild(backdrop);

            /**
             * fallback styles for backdrop
             * in case stylesheet not loaded
             */
            backdrop.style.position         = 'fixed';
            backdrop.style.top              = '0';
            backdrop.style.left             = '0';
            backdrop.style.width            = '100%';
            backdrop.style.height           = '100%';
            backdrop.style.backgroundColor  = 'rgba(0, 0, 0, 0.3)';
            backdrop.style.zIndex           = '999';

            /**
             * Create the confirmation dialog
             */
            var confirmBox = document.createElement('div');
            confirmBox.className = 'jc-confirm';

            /**
             * fallback styles for confirmation box
             * in case stylesheet not loaded
             */
            confirmBox.style.position       = 'fixed';
            confirmBox.style.width          = settings.width || '200px';
            confirmBox.style.top            = '50%';
            confirmBox.style.left           = '50%';
            confirmBox.style.transform      = 'translate(-50%, -50%)';
            confirmBox.style.background     = '#fff';
            confirmBox.style.padding        = '15px';
            // confirmBox.style.border      = '1px solid #ddd';
            confirmBox.style.zIndex         = 1000;
            confirmBox.style.borderRadius   = '5px';
            confirmBox.style.boxShadow      = '0 2px 6px rgba(0, 0, 0, 0.2)';

            /**
             * message and title wrapper
             * this will wrap message and title
             */
            var messageBox = document.createElement('div');
            messageBox.className = 'jc-message-wrap';

            /**
             * Action buttons wrap this will wrap
             * confirm and cancel buttons
             */
            var actionBox= document.createElement('div');
            actionBox.className         = 'jc-actions-wrap';
            actionBox.style.textAlign   = 'right';

            /**
             * title container strong tag
             */
            if (settings.title) {
                var title = document.createElement('strong');
                title.className     = 'jc-title';
                title.textContent   = settings.title;

                // title basic styles
                title.style.display     = 'block';
                title.style.fontFamily  = 'inherit';
                title.style.fontSize    = '1.2rem';
                title.style.margin      = '0 0 .625rem';
            }

            /**
             * message containing p tag
             */
            if (settings.message) {
                var message = document.createElement('p');
                message.className   = 'jc-message';
                message.textContent = settings.message;

                // message styles
                message.style.fontFamily    = 'inherit';
                message.style.fontSize      = '1rem';
                message.style.margin        = '0 0 1rem';
            }
            /**
             * confirm button with basic button styling
             * dynamic class and text is added here
             * applyButtonStyles apply basic button styles
             */
            var confirmAction = document.createElement('button');
            confirmAction.className         = settings.confirmClass;
            confirmAction.textContent       = settings.confirmText;
            confirmAction.style.marginRight = '6px';
            applyBtnStyles(confirmAction);

            /**
             * cancel button with basic button styling
             * dynamic class and text is added here
             * applyButtonStyles apply basic button styles
             */
            var cancelAction = document.createElement('button');
            cancelAction.className          = settings.cancelClass;
            cancelAction.textContent        = settings.cancelText;
            applyBtnStyles(cancelAction);

            /**
             * append title and messge to the message box wrap
             */
            if (title) {
                messageBox.appendChild(title);
            }
            messageBox.appendChild(message);

            /**
             * append confirm and cancel button to button wrap
             */
            actionBox.appendChild(confirmAction);
            actionBox.appendChild(cancelAction);

            /**
             * Final dialog component
             *
             * message wrap containing title & message appended
             * action wrap containing buttons appended
             */
            confirmBox.appendChild(messageBox);
            confirmBox.appendChild(actionBox);

            /**
             * Final dialog component is appended to the body
             */
            document.body.appendChild(confirmBox);

            /**
             * cancel dialog on backdrop click
             * if cancelOnBackdropClick: true then backdrop click
             * will cancel the dialog action
             */
            if (toBoolean(settings.cancelOnBackdropClick)) {
                backdrop.addEventListener('click', function() {
                    settings.onCancel.call(this);
                    document.body.removeChild(confirmBox);
                    document.body.removeChild(backdrop);
                }.bind(this));
            }

            /**
             * confirm button action
             * firest onConfirm function for the component
             */
            confirmAction.addEventListener('click', function() {
                settings.onConfirm.call(this);
                document.body.removeChild(confirmBox);
                document.body.removeChild(backdrop);
            }.bind(this));

            /**
             * cancel button action
             * firest onCancel function for the component
             */
            cancelAction.addEventListener('click', function() {
                settings.onCancel.call(this);
                document.body.removeChild(confirmBox);
                document.body.removeChild(backdrop);
            }.bind(this));
        }.bind(this));

        // this.setAttribute('jc-confirm-attached', 'true');
    };

    function toBoolean(strOrBool) {
        if (strOrBool === true || strOrBool === 'true') {
            return true;
        }
        return false;
    }

    function applyBtnStyles(button) {
        var bgColor             = '#e6e6e6'
        var bgHoverColor        = '#dcdcdc'
        button.style.backgroundColor   = bgColor;
        button.style.color             = '#000000';
        button.style.border            = 'none';
        button.style.borderRadius      = '4px';
        button.style.padding           = '6px 12px';
        button.style.fontSize          = '1rem';
        button.style.lineHeight        = '1.2';
        button.style.cursor            = 'pointer';
        button.style.transition        = 'background-color 0.3s ease';

        /**
         * Add a hover effect using mouseover
         */
        button.addEventListener('mouseover', function() {
            this.style.backgroundColor = bgHoverColor;
        });

        /**
         * Add focus out effect using mouseout
         */
        button.addEventListener('mouseout', function() {
            this.style.backgroundColor = bgColor;
        });
    }

    /**
     * Return the javascriptConfirm function to be used globally or in other environments
     */
    return javascriptConfirm;
}));

