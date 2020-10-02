export const promisify = fn => {
  return async (...args) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function customCallback (err, ...results) {
        if (err) {
          return reject(err)
        }
        return resolve(results.length === 1 ? results[0] : results)
      }

      args.push(customCallback)
      fn.call(this, ...args)
    })
  }
}
