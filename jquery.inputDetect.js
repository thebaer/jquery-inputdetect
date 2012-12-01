/**
 *   Copyright 2012 Matt Baer
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
(function($) {

    /**
     * This detects the method used for changing an input value (keyboard or
     * mouse), and performs the corresponding action given in options.
     */
    $.fn.inputDetect = function(options) {
        return this.filter('input').each(function() {

            // keyChange: function to be run when change is made with the keyboard
            // clickChange: function to be run when change is made with the mouse (like step buttons on number input)
            // change: function to be run whenever a change is made (executed last)
            var defaults = {
                keyChange: function() { return; },
                clickChange: function() { return; },
                change: null
            };

            options = $.extend(defaults, options);

            // Event type flags
            var key = false;
            var inp = false;
            var click = false;

            // Get the input method
            $(this).unbind().bind('input keypress mousedown paste', function(e) {
                if (e.type == 'input') {
                    inp = true;
                } else if (e.type == 'keypress' || e.type == 'paste') {
                    key = true;
                    click = false;
                } else if (e.type == 'mousedown') {
                    key = false;
                    click = true;
                }
            });

            // Determine which was used
            $(this).change(function(e) {
                if (key && inp) {
                    // The input was changed by keyboard
                    options.keyChange.call(this);
                } else if (click && inp) {
                    // The  input was changed by mouse
                    options.clickChange.call(this);
                }
                // If a function should run every time the value changes, call it
                if (options.change) {
                    options.change.call(this);
                }
                inp = false;
                key = false;
            });
        });
    };

})(jQuery);
