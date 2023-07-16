export const MSGS_RESPONSES = {
  DB_CONNECTED: 'Database connected 🔥🔥🔥',
  DB_CONNECTION_PROBLEM: '😥😥😥 connection refused!!!',
  INVALID_EMAIL: 'This is not a valid email',
  EXISTING_USER: 'User already exist in the DB...',
  REQUIRED_FIELDS: 'All fields are required',
  SHORT_NAME: 'Name must have at least 3 characters',
  WEAK_PASSWORD:
    'Password must has a minimun lenght of 8 characters, at least one lowercase, one uppercase, one symbol and one number',
  REGISTER_USER: 'The user was registed successfully',
  USER_ERROR: 'User can not be created',
  LOGIN_ERROR: 'Login could not be completed',
  INVALID_EMAIL_OR_PASS: 'Invalid e-mail or password',
  LOGIN_OK: 'Login successfull',
  FIND_SINGLE_USER: 'User found',
  FIND_ALL_USERS: 'All users were found',
  CREATE_CHAT_ERROR: 'We tried to create the chat but something went wrong!',
  CHAT_FOUND: 'Chat found!',
  CREATE_NEW_CHAT: 'New chat successfully created',
  FIND_USER_CHATS_ERROR: 'Error when trying to get the chats of a single user',
  FIND_USER_CHATS_OK: 'Users chats were found',
  FIND_USER_CHATS_WRONG_ID:
    'You can not find the chats of a user that is not in the DB',
  FIND_USER_CHAT_ERROR: 'Error when trying to get a chat between 2 members',
  FIND_USER_CHAT_OK: 'Chat between 2 members was found',
  INVALID_OBJECTID: 'That is not a valid mongoDB ObjectId',
  UNKNOWN_USER: 'You have an invalid user in your request'
}
