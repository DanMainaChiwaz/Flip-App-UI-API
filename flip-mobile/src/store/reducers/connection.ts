import { createSlice } from "@reduxjs/toolkit";
import { IActivity } from "./user";

export interface IConnection {
  userId?: string;
  firstName: string;
  lastName: string;
  location?: string;
  mutualCount?: number;
  photoUrl?: string;
  lastActivity?: string;
  bio?: string;
  activities?: IActivity[];
  friend: boolean;
  blocked?: boolean;
}

interface IConnectionState {
  connections: IConnection[];
  blockedConnections: IConnection[];
  suggestedConnections: IConnection[];
}

const initialState: IConnectionState = {
  connections: [
    {
      userId: "1",
      firstName: "Angela",
      location: "Grand Rapids, MI",
      lastName: "Dallas",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
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
      firstName: "Torin",
      location: "New York, New York",
      lastName: "Robert",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
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
      firstName: "Gayla",
      location: "New York, New York",
      lastName: "Evans",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
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
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
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
      lastActivity: "3 minutes ago",
      friend: true,
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
      firstName: "Tony",
      location: "New York, New York",
      lastName: "McKay",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "7",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "8",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "9",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "10",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "11",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "12",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "13",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "14",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
      userId: "15",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
      lastActivity: "3 minutes ago",
      friend: true,
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
  blockedConnections: [
    {
      userId: "1",
      firstName: "Angela",
      location: "Grand Rapids, MI",
      lastName: "Dallas",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
      blocked: true,
    },
    {
      userId: "2",
      firstName: "Torin",
      location: "New York, New York",
      lastName: "Robert",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
      blocked: true,
    },
    {
      userId: "3",
      firstName: "Gayla",
      location: "New York, New York",
      lastName: "Evans",
      lastActivity: "3 minutes ago",
      bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
      friend: true,
      blocked: true,
    },
  ],
  suggestedConnections: [
    {
      userId: "1",
      firstName: "John",
      location: "New York, New York",
      lastName: "Smith",
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

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {},
});

export default connectionSlice;
