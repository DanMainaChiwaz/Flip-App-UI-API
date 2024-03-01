import { createSlice } from "@reduxjs/toolkit";
import { IConnection } from "./connection";
import { IActivity } from "./user";

export interface IEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status?: string;
  location?: string;
  description?: string;
  eventLeader: IProfile;
  connections?: IConnection[];
  hosted?: boolean;
}

export interface IProfile {
  userId: string;
  photoUrl?: string;
  firstName: string;
  lastName: string;
  mutualCount?: number;
  location?: string;
  activities?: IActivity[];
  bio?: string;
  friend?: boolean;
}

interface IHomeState {
  upcomingEvents: IEvent[];
  suggestedConnections: IConnection[];
}

const initialState: IHomeState = {
  upcomingEvents: [
    {
      id: "1",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      eventLeader: {
        userId: "3",
        firstName: "John",
        lastName: "Smith",
      },
      connections: [
        {
          firstName: "John",
          lastName: "Smith",
          userId: "1",
          friend: true,
          mutualCount: 0,
          photoUrl: "",
          lastActivity: "3 minutes ago",
        },
      ],
    },
    {
      id: "2",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      eventLeader: {
        userId: "3",
        firstName: "John",
        lastName: "Smith",
      },
      connections: [
        {
          firstName: "John",
          lastName: "Smith",
          userId: "2",
          friend: true,
          mutualCount: 0,
          photoUrl: "",
          lastActivity: "3 minutes ago",
        },
      ],
    },
  ],
  suggestedConnections: [
    {
      userId: "1",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
    {
      userId: "2",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
    {
      userId: "3",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
    {
      userId: "4",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
    {
      userId: "5",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
    {
      userId: "6",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      mutualCount: 12,
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: false,
      activities: [
        {
          name: "BasketBall",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Soccer",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Volleyball",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Fishing",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Running",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
        {
          name: "Bouldering",
          skillLevel: "Beginner",
          playStyle: "Casual",
        },
      ],
    },
  ],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default homeSlice;
