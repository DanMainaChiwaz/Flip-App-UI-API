import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "./home";

interface IEventState {
  upcomingEvents: IEvent[];
  pastEvents: IEvent[];
  myEvents: IEvent[];
}

const initialState: IEventState = {
  upcomingEvents: [
    {
      id: "3",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
      id: "1",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
    {
      id: "4",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
  pastEvents: [
    {
      id: "1",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
    {
      id: "2",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
    {
      id: "3",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
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
  myEvents: [
    {
      id: "1",
      title: "Soccer in the Park",
      startTime: "2022-09-14T20:12:50.380Z",
      endTime: "2022-09-14T20:18:50.380Z",
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
      hosted: true,
      eventLeader: {
        userId: "1",
        firstName: "Angela",
        lastName: "Dallas",
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
      location: "Central Park, 76th St",
      description: "Let's have fun!",
      status: "accepted",
      hosted: true,
      eventLeader: {
        userId: "1",
        firstName: "Angela",
        lastName: "Dallas",
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
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default eventSlice;
