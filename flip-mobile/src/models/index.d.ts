import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export declare class Message {
  readonly content?: string | null;
  readonly dateTimeSent?: string | null;
  readonly sentByUserId?: string | null;
  constructor(init: ModelInit<Message>);
}

type ChatMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Chat {
  readonly id: string;
  readonly ownerUserID: string;
  readonly messages?: (Message | null)[] | null;
  readonly dateTimeCreated?: string | null;
  readonly users?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Chat, ChatMetaData>);
  static copyOf(source: Chat, mutator: (draft: MutableModel<Chat, ChatMetaData>) => MutableModel<Chat, ChatMetaData> | void): Chat;
}