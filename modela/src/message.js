class Message {
  messages = {
    0:  'JQuery has been initialized',
    1:  'JQuery has not been initialized on this page',
    2:  'Skipping node[{index}] as the name "{name}" provided is invalid',
    3:  'Subscribe callback provided is not a valid function',
    4:  'Skipping node[{index}] with name "{name}" as no handler has been installed for this node type',
    5:  'Invalid state object provided for store update : {object}',
    6:  'Encountered a non existing state field {{key}} during store update',
    7:  'Encountered state field {{key}} with invalid value type "{value}"',
    8:  'Skipping node[{index}] with group id {{group}} due to unexpected group id format',
    9:  'Invalid fields array provided on while fetching state',
    10: 'Invalid field "{field}" provided in fields array while fetching state',
    11: 'The string "{group}" provided as group name for getting state does not exist',
    12: 'The field "{field}" specified while setting default transform does not exist',
    13: 'Transform "{transform}" specified has not been registered yet',
    14: 'The string "{name}" provided as transform name appears to be in an invalid format',
    15: 'The function provided for transform "{name}" should be a pure function that takes just one argument',
    16: 'An invalid argument {value} has been passed to {patch}'
  };

  get = (index, params=null) => {
    let message = this.messages[index];    
    if(params === null) return message;

    Object.keys(params).map((param) => {
      message = message.replace(`{${param}}`, params[param]);
    });

    return message;
  }
}

const message = new Message();
export default message;
