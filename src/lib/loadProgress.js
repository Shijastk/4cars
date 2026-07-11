// Tiny external store for the page-boot progress bar.
//
// ScriptLoader publishes progress here as the vendor bundle lands; Loader
// subscribes via useSyncExternalStore. Keeping this outside React means the
// overlay's lifecycle is owned by React alone — a throw inside the legacy
// jQuery chain can no longer strand the user behind a white screen.

const SERVER_SNAPSHOT = { progress: 0, done: false };

let progress = 0;
let done = false;
let snapshot = SERVER_SNAPSHOT;

const listeners = new Set();

function emit() {
  // useSyncExternalStore compares snapshots by reference, so only rebuild the
  // object when something actually changed.
  snapshot = { progress, done };
  listeners.forEach((listener) => listener());
}

/** Monotonic — progress never goes backwards, even if a caller reports late. */
export function setProgress(next) {
  if (done) return;
  const clamped = Math.min(1, Math.max(progress, next));
  if (clamped === progress) return;
  progress = clamped;
  emit();
}

export function finishLoading() {
  if (done) return;
  progress = 1;
  done = true;
  emit();
}

export function isDone() {
  return done;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return snapshot;
}

export function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}
