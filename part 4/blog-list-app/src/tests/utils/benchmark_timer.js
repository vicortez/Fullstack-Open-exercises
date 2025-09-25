// benchmarkTimer.js

// This variable will hold the start time. It's private to this module.
let startTime = null
let startLabel = ''

/**
 * Starts the timer and stores the current high-resolution time.
 * @param {string} label - A label for the entire session being timed (e.g., "Test Case: Get User Data").
 */
function start(label = 'Benchmark Session') {
  // process.hrtime.bigint() gives nanosecond precision and is not affected by system time changes.
  startTime = process.hrtime.bigint()
  startLabel = label
  console.log(`\n--- Timer Started: [${startLabel}] ---`)
}

/**
 * Prints the elapsed time in milliseconds since the timer was started.
 * @param {string} label - A descriptive label for this specific point in the code.
 */
function print(label) {
  if (startTime === null) {
    console.warn(`[${label}] - Timer has not been started. Call start() first.`)
    return
  }

  const currentTime = process.hrtime.bigint()
  const elapsedTimeInNanoseconds = currentTime - startTime

  // Convert nanoseconds (BigInt) to milliseconds (Number)
  // 1 millisecond = 1,000,000 nanoseconds
  const elapsedTimeInMs = Number(elapsedTimeInNanoseconds / 1000000n)

  console.log(`[${startLabel}] > ${label}: ${elapsedTimeInMs}ms`)
}

/**
 * Resets the timer. Good practice to call this after a benchmark session is complete.
 */
function reset() {
  startTime = null
  startLabel = ''
  console.log(`--- Timer Reset ---`)
}

// Export the functions as a singleton object.
module.exports = {
  start,
  print,
  reset,
}
