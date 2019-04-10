/*
 * The real benefit of currying is partial application, and a benefit of
 * partial application is the ability to control the order of what happens.
 *
 * One use-case of currying is to make synchronous code more readable, with
 * the `thenable` feel of promises.
 *
 * */

const originalObj = {a: 1, b: 2, c: 3};
// pipes along until no fn, then returns obj
const pipe = (obj => (fn) => fn ? pipe(fn(obj)) : obj);




// assignment assigns fn, not finished value
const { obj, memory } = pipe(originalObj)(clone)(initializeMemory)(addKeys)(memorize)(flipKeysValues)(memorize)(flipKeysValues)(finish)();




console.log('obj', obj);
console.log('memory', memory);
console.log('original obj', originalObj);

// todo: second flipKeysValues not working properly



function addKeys ({ obj, memory }) {
  return { obj: Object.assign({}, obj, { d: 4, e: 5, f: 6 }), memory };
}

function flipKeysValues ({ obj, memory }) {
  obj = Object.entries(obj).reduce((flippedObj, entries) => {
    return Object.assign(flippedObj, flippedObj[entries[1]] = entries[0]);
  }, {});

  return { obj, memory };
}

function initializeMemory (obj) {
  return memorize({ obj, memory: []});
}

function memorize ({ obj, memory }) {
  memory.push(obj);
  return { obj, memory };
}

function clone (obj) {
  return Object.assign({}, obj);
}

function logIt (toLog) {
  console.log('toLog', toLog); // intentional log
  return toLog;
}

function finish (finished) {
  return finished;
}
