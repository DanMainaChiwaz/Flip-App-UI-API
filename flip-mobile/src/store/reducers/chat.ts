import { createSlice } from "@reduxjs/toolkit";

interface IChat {
  id: number;
  members: IChatMember[];
  messages: IMessage[];
  isRead: boolean;
}

interface IChatMember {
  id: string;
  firstName: string;
  secondName: string;
  photoUrl: string;
}

export interface IMessage {
  id: number;
  content?: string;
  senderId: string;
  dateSent: Date | string;
  type?: string;
}

interface IChatState {
  chats: IChat[];
}

const initialState: IChatState = require("assets/data/chats.json");

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export const {} = chatSlice.actions;

export default chatSlice;
