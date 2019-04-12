

# Functional Light JavaScript
## Kyle Simpson
### Table of Contents

#### Ch. 1: Why Functional Programming
<b>Summary:</b> functional programming tends to be easier to maintain by reducing the number of bugs through well-established practices that allow for easy debugging.

#### Ch. 2: The Natuer of Functions
<b>Summary:</b> closure over outer variables is a foundational aspect of functional programing, anonymous functions shift the burden from author to reader, and using `this` to modify values shouldn’t be done because of the difficulty in plainly seeing the context.

Functional closure is a function’s ability to access the value of a variable in its body, even when called in a context where the variable doesn’t have scope.

A function takes inputs and outputs (even implicit returns or `return;` returns `undefined`), and a functional programming function is one that has inputs and an explicit output (i.e., not `undefined` but some value).

Functional programming cares about readability of code. Explicitness is king to readability, but so is proper flow control. Multiple early returns as a way of flow control makes for unreadable code (the claim goes), and they can be easily fixed by using other flow control (perhaps at the cost/benefit of verbosity) such as conditionals.

#### Ch. 3: Managing Function Inputs
<b>Summary:</b> there are useful techniques for ‘reshaping’ functions (including their parameters) to play nicely with other functions.

Arguments can be partially applied to control when and where arguments are applied. Commonly, functions take in a set of arguments and returns some value. Partial application is to take in a subset of those arguments, returning a function that can take more arguments in, which eventually returns a final value. Currying is an example of this, with the addition of reducing the arity to 1 (see the notes on currying in the `functional_programming_notes`). General partial application doesn’t require fully unravelling the function to multiple arity-1 functions.

Functional programmers often use a style of code that attempts to reduce the visual clutter by removing unnecessary argument/parameter assignment. E.g.,  with `const double = (x) => x * 2;`,  `[1,2,3,4].map(num => double(num));` could simply be `[1,2,3,4].map(double);`

#### Ch. 4: Composing Functions
<b>Summary:</b> functional composition is to use functions together by passing the output of one into the input of another, without the data being passed from one to the other affecting anything else. This prevents side effects while having declarative code (i.e., code that explicitly shows the flow of data).

#### Ch. 5: Reducing Side Effects
<b>Summary:</b> side effects make code harder to understand and tend to introduce bugs.

There are strategies to avoid side effects. We could create functions whose inputs always map to the same outputs (called ‘purity’), whose result after the first call wouldn’t change from subsequent calls with the same inputs (called ‘idempotence’), and which could be replaced with the value it outputs without changing the program (called ‘referential transparency’).[^1]

[^1]:A more abstract example of idempotence: the identity relation is idempotent: when applied to x, it’s result is always x. A more precise, mathematical definition: f(x) is idempotent iff f(f(x)) === f(x).


#### Ch. 6: Value Immutability
<b>Summary:</b> value immutability isn’t about creating unchanging values, but about creating new values when mutating existing values rather than merely updating how those old values are referenced.

JS developers tend to think that `const` means that the value assigned with it will be immutable, but `const` only means that a new declaration can’t be set. E.g., `const a = [1,2,3]; a = [1,2,3,4]`; will throw an error. That doesn’t mean that its value can’t be mutated: `const a = [1,2,3]; a[3] = 4;`. It’s important to distinguish between the inability to be reassigned and true value immutability.

True value immutability for objects and arrays can be had with `Object.freeze(..)`. For a level of the object/array, Object.freeze(..) marks that level’s properties/indices as read-only and non-extensible. Object.freeze(..) has to be applied to each level of the object/array to create a deeply immutable structure. When performance becomes a concern, new data structures should be used by using a library such as Immutable.js. One such data structure is `[original]` after some change, `[change]` being tracked like this: `[original, change, …, change]`, where each change contains the previous changes, but pushes a new value for those changes rather than mutating the previous array.

Arguments to functions are passed by reference, so mutating an argument might have unintended side effects elsewhere. Destructuring is one way to create a new value for the argument. `let obj = {a:1, b:2}; let fn = ({a}) => a = 3; fn(obj); obj // {a:1, b:2}`. Destructing `a` creates a new value that isn’t mutated when setting a to 3. Yet, if `fn` were `let fn(obj) => obj.a = 3`, then `obj // {a: 3, b:2}`. The same goes for destructuring arrays, `[...args]` will create a new value and reference.

#### Ch. 7: Closure vs. Object
<b>Summary:</b> objects and closures are isomorphic (i.e., they can be mapped to each other without loss of information) and can be used interchangeably.[^2] Closure allows for automatic privacy (i.e., no mutations come from outside of the encapsulating function), but objects allow for easier state cloning (with Object.assign(..), e.g.).

Objects and closures represent the same data:

```
  var point = { x: 10, y: 12, z: 14 };
    function outer () {
      var x = 10;
      var y = 12;
      var z = 14;
      return function inner () { return [x, y, z] }
    }
```

Including nested data:
```
  var nestedObj = { a: 1, b: { c: 2 } };
  function outer () {
    var a = 1;
    return function middle () {
      var c = 2;
      return function inner () {
        return [ a, c ];
      }
    }
  }
```

Some folks think that closures are immutable, but that objects are mutable. This is false: value immutability, as discussed in ch 6, is the same between both closures and objects. Structural immutability, however, differs: closures are automatically private, meaning that their values can’t be mutated from outside the function at runtime. Objects, however, are public in that their values can be mutated at runtime.

[^2]: More rigorously: x and y are isomorphic just in case there is a way to map x to y and y to x that doesn’t lose any information.



#### Ch. 8: Recursion
<b>Summary:</b> recursion done well can be quite readable, and there are ways to ‘optimize’ recursion to free up memory, though not necessary shorten the time it takes to run.

Functional programmers like recursion because it trades explicitly tracking the program’s state with implicitly tracking it in the call stack. So, rather than setting up variables in the program’s scope, those values are held within the recursive call stack, keeping their applicable scope limited to that stack. This keeps the program readable by reducing what needs to be tracked.

Recursion can be memory intensive, though, as the JS engine sets aside a small chunk of memory for each function called. It sets aside memory because it doesn’t know whether another function will be called, which would pause the execution of the first function, requiring its internal state to be kept track of in order to eventually return to it. With recursion, we could set aside more memory than is available, thereby overflowing the stack. [^3]

One way to keep from overflowing the stack is to use tail call recursion. Tail call recursion is a method of writing functions that frees up memory when the engine knows it won’t be used. Consider the diagram below [see the png in this directory]. The leftmost block represents a stack of memory used by function A calling B, which in turn calls C. The rightmost block represents the same call structure, but using tail recursion to free up memory.

In JavaScript, ES6 makes tail recursion available. When a function explicitly returns another function, the engine knows that the memory freed up for the originally function won’t be needed. That is, `function A () { return B(); }` will free up the memory set aside for A.

[^3] The JS engine will throw an error before we actually run out of memory, presumably to keep the rest of the system stable.

#### Ch. 9: List Operations

<b>Summary:</b> operations like some, every, and forEach allow for bad mutations of the data being iterated over, whereas operations that return new arrays, such as filter, map, and so on, don’t mutate the original array and should thereby be preferred. This was a somewhat disappointing chapter in that its length far outreached its content.

#### Ch 10: Functional Async

<b>Summary:</b> readable asynchronous code can be difficult to write. There are data structures (that aren’t native to ecmascript) that make it easier to write readable asynchronous code, such as Observables. This chapter was disappointing: ‘make your code readable with this sweet data structure, but you have to use a library for it’, and there wasn’t any discussion on how to best implement currently supported language features functionally, like Promises.

One data structure that allows for readable asynchronous code is an Observable. An Observable lets you assign a reactive function to other data structure, such that a change in those data structures runs the reactive function, handling that change in some fashion. Observables are currently (Feb 5th, 2019) Stage 1 of ecmascript implementation. When/if they make it into the language, they’ll certainly make asynchronous code more readable.

#### Ch 11: Putting It All Together
<b>Summary:</b> there’s an example project exemplifying the functional programming techniques described above. It’s useful for reviewing those techniques in actual code, so check it out periodically.

#### Misc claims and definitions
Claim: functional programming is more bug-resistant by making bugs easier to track and easier to spot.

Arity of a function: number of params a function takes in.

Fn.length: returns number of args a function expects; useful for currying. Pg. 71. Won’t work well with default parameters, destructuring, or variadic ...args.


