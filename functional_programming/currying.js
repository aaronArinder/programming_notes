/*
 * currying: taking a function whose arity is greater than 1 and unravelling it
 * to multiple, chained functions of arity 1. It's a form of partially applying
 * arguments passed to a function.
 *
 * practical use: partially applying arguments lets you take in some arguments,
 * do some logic, take in more arguments, and do more logic. If that first-round
 * of logic includes building an object with different helper methods that close
 * over the passed-in fn, you could create a sweet way of custom chains.
 *
 * notes: `curry` comes from functional light, p. 71
 * */

// fn.length only works with non-variadic, non-destructured params
function curry (fn, arity = fn.length) {
  // kick off the currying with an empty array
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      // collect
      const args = [ ...prevArgs, nextArg ];
      // once we've unravelled
      if (args.length >= arity) {
        // call the closed-over fn with those args
        return fn( ...args );
      // otherwise
      } else {
        // keeping unravelling
        return nextCurried( args );
      }
    };
  })( [] );
}

// toy fn for currying
function sum (a,b,c,d){
  return a + b + c + d;
}

// curried fn
const curried = curry(sum);

// returns 10
console.log(curried(1)(2)(3)(4))

