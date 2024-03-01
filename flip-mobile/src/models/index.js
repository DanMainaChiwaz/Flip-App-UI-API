// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Chat, Message } = initSchema(schema);

export {
  Chat,
  Message
};