const { BadRequestError, CustomError } = require('./errorInstances')
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('./statusCodes')

const manageAsyncOps = async (fn) => {
  try {
    const response = await fn
    return [null, response]
  } catch (error) {
    return [error, null]
  }
}

const manageApplicationErrors = ({ message, statusCode, errors }) => {
  if (statusCode === INTERNAL_SERVER_ERROR)
    return new CustomError(message, statusCode, errors)
  else if (statusCode === BAD_REQUEST)
    return new BadRequestError(message, statusCode, errors)
}

const setupRequestContext = (req, _, next) => {
  req.context = { manageAsyncOps, manageApplicationErrors }

  return next()
}

module.exports = setupRequestContext
