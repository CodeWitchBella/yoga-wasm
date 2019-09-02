console.assert = (statement, message) => {
  if (!statement) throw new Error(message)
}

require('./tools')
