(function() {

    "use strict";

    /**
     * Check if `obj` is a generator.
     *
     * @param {Mixed} obj
     * @return {Boolean}
     * @api private
     */

    function isGenerator(obj) {
      return obj && 'function' == typeof obj.next && 'function' == typeof obj.throw;
    }

    /**
     * Check if `obj` is a generator function.
     *
     * @param {Mixed} obj
     * @return {Boolean}
     * @api private
     */

    function isGeneratorFunction(obj) {
      return obj && obj.constructor && 'GeneratorFunction' == obj.constructor.name;
    }


    //Runs an array of generator functions in parallel
    var parallel = function*(array) {
        if (typeof CO_PARALLEL_TOOLS_DEBUG !== "undefined" && CO_PARALLEL_TOOLS_DEBUG) {
            var results = [];
            for(var i = 0; i < array.length; i++) {
                results[i] = yield* doYield(array[i]);
            }
            return results;
        } else {
            return yield array;
        }
    };


    //If fn is a generator function, do yield*. Else yield.
    var doYield = function*(fn, thisPtr, args) {
        if (isGeneratorFunction(fn)) {
            return yield* fn.apply(thisPtr, args);
        } else {
            return yield fn.apply(thisPtr, args);
        }
    };


    module.exports = {
        parallel: parallel,
        doYield: doYield
    };

})();
