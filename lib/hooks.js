// A Node.js file for implementing custom hooks that allow various components
// to tweak the behavior of the code.

let _all_hooks = {};

function registerHook(name, fn, seq = 10) {
  const paramCount = fn.length;
  const hookKey = `${name}_${paramCount}`;

  if (!_all_hooks[hookKey]) {
    _all_hooks[hookKey] = [];
  }

  _all_hooks[hookKey].push({ seq, fn });

  _all_hooks[hookKey].sort((a, b) => a.seq - b.seq);
}

function applyHook(name, value, ...args) {
  const paramCount = 1 + args.length;
  const hookKey = `${name}_${paramCount}`;

  if (_all_hooks[hookKey] && Array.isArray(_all_hooks[hookKey])) {
    _all_hooks[hookKey].forEach(hook => {
      value = hook.fn(value, ...args);
    });
  }

  return value;
}

module.exports = { registerHook, applyHook };
