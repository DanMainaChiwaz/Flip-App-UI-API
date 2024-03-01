import { createSlice } from "@reduxjs/toolkit";

export interface IActivity {
  name: string;
  skillLevel: string;
  playStyle: string;
}

interface IUserState {
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoUrl: string;
  location: string;
  locationName: string;
  bannerId: number;
  phone?: string;
  activities: IActivity[];
}

// const initialState: IUserState = {
//   userId: "1",
//   firstName: "John",
//   lastName: "Smith",
//   bio: "This is a test bio. This is a place to enter information about what you want others to know about your tastes in things",
//   photoUrl: "1",
//   location: "42.966534, -85.664381",
//   locationName: "Grand Rapids, MI",
//   bannerId: 13,
//   activities: [
//     {
//       name: "BasketBall",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//     {
//       name: "Soccer",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//     {
//       name: "Volleyball",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//     {
//       name: "Fishing",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//     {
//       name: "Running",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//     {
//       name: "Bouldering",
//       skillLevel: "Beginner",
//       playStyle: "Casual",
//     },
//   ],
// },

const initialState: IUserState = {
  userId: null,
  firstName: null,
  lastName: null,
  bio: null,
  photoUrl: null,
  location: null,
  locationName: null,
  bannerId: null,
  activities: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice;
