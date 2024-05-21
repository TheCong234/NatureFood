// * #  private for the developer, public to the author *

// static variables (IDs) Never change by concumer
const generateErr = {
   id: Symbol(),
   process(error) {
      return error
   },
}
const throwErr = {
   id: Symbol(),
   process(error) {
      throw error
   },
}

// static variables (pre-defined messages) may change by concumer, these are the pre-defined templates
const errorMessages = {
   function: '{$} is not a function, typeof given: {!}',
   asyncfunction: '{$} is not an async function, typeof given: {!}',
   string: '{$} is not a string, typeof given: {!}',
   number: '{$} is not a number, typeof given: {!}',
   object: '{$} is not an object, typeof given: {!}',
   null: '{$} is not a null type, typeof given: {!}',
   undefined: '{$} is not an undefined, typeof given: {!}',
   symbol: '{$} is not a symbol, typeof given: {!}',
   map: '{$} is not a map type, typeof given: {!}',
   date: '{$} is not a date, typeof given: {!}',
   array: '{$} is not an array, typeof given: {!}',
   AsyncOrSyncFunction:
      '{$} is not an Async nor Sync Function , typeof given: {!}',
   defaultTemplate: '{$} is not a valid type , typeof given: {!}',
}

const errorMessagesResiption = (arg, requiredType, optionalMessage) => {
   // this function returns the error message based on particular calculations
   const typeStr = checkType(arg)
   const argStr = JSON.stringify(arg)
   let template
   if (optionalMessage)
      template = optionalMessage.replace(/{\#\}/g, errorMessages[requiredType])
   else template = errorMessages[requiredType]
   const mapObj = {
      '{$}': argStr,
      '{!}': typeStr,
   }
   if (!template) template = errorMessages['defaultTemplate']
   template = template.replace(/\{\$\}|\{\!\}/g, (match) => mapObj[match])
   return template
}

const checkType = (o) => {
   return Object.prototype.toString
      .call(o)
      .replace(/\[|object\s|\]/g, '')
      .toLowerCase()
}

const handleErrorById = (id, error) => {
   switch (id) {
      case generateErr.id:
         return generateErr.process(error)
      case throwErr.id:
         throwErr.process(error)
         break
      default:
         throw new Error(
            'Internal Error in checkTypes/_private.js, ID is not recognizable'
         )
   }
}

const checkOneByOne = (arr, typeStr, mixinAlias) => {
   // arr is the input by the user to check for, it could also hold generateErr || throwErr by the develoepr.
   // typeStr could be a string or an array of strings, if a string, this is going to be used as the key for the $errorMessages object, this argument is given by the author.
   // mixinAlias is a string, if provided, it will be used as the key for the $errorMessages object. this field is required only if typeStr is an array, since all $errorMessages keys are strings, this argument is given by the author.
   let mistake
   let handleErr = {
      status: false,
      id: 0,
      idObject: {},
   }

   // true: there was a mistake
   let status
   if (arr.length === 0 && typeStr !== 'undefined') {
      // when the array length is zero and the developer is not checking for undefined
      status = true
   } else
      status = arr.some((value) => {
         // arr.some by default is going to return false if the array is empty, this is only the case that will happen if the developer checking for undefined because of the if statement above me
         // because of arr.some, once an item within the argument list (arr) found incorrect based on the developer's choise, all of the validation will fail on the first incorrect input
         // TODO: maybe in future versions, add an option to the developer to choose if he wants the entire validation to fail on the first incorrect input or not
         if (
            checkType(value) == 'object' &&
            value._identifier &&
            arr.length === 1 &&
            typeStr !== 'undefined'
         ) {
            // the current item is a hashable object (has _identifier propery inside of it), and the argument list only holds one item, and the developer is not checking for undefined
            handleErr.status = true
            handleErr.id = value._identifier
            handleErr.idObject = value
            mistake = undefined
            return true
         }

         if (checkType(value) == 'object' && value._identifier) {
            // the current item is an object, and it's a hash injected object (has _identifier propery inside of it)
            handleErr.status = true
            handleErr.id = value._identifier
            handleErr.idObject = value
            return false
         }

         if (!typeStr.includes(checkType(value))) {
            // if the current item doesn't match the developer's choise (typeStr)
            mistake = value
            return true
         }
         // if non of the above checkings was the case for the current item, then it seems like there is no mistake, with it, continue looping if there are any items left to check
         return false
      })
   // status === true: there was a mistake
   if (status) {
      let error = new Error()
      error = Object.assign(error, handleErr.idObject)
      error.message = errorMessagesResiption(
         mistake,
         mixinAlias || typeStr, // if there is a mixinAlias, use mixinAlias instead of typeStr
         error.message
      )
      if (handleErr.status) return handleErrorById(handleErr.id, error)
      return false
   }
   // nothing is wrong, the user input matches the developer's choise
   return true
}

const injectHash = (idType, obj = {}) => {
   // injects the unique symbol into the developer's given obj
   // idType is given by the author, it could be the throwErr or the generateErr unique symbol, this symbol is taken by the author from the $generateErr or the $throwError objects since they're exported publicly from this file
   obj._identifier = idType
   return obj
}

module.exports = {
   injectHash,
   checkType,
   config: {
      errorMessages,
   },
   checkOneByOne,
   throwErr,
   generateErr,
}
