import { EventAttendee } from '@prisma/client';
import { activitiesDto } from 'src/activity/dto/activityDto';

export interface UserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: any;
  email?: string;
  is_email_verified?: boolean;
  phonenumber?: string;
  is_phone_number_verified?: boolean;
  bio?: any;
  password?: string;
  gender?: any;
  photoUrl?: any;
  isConfigured?: any;
  geohashLocation?: any;
  location?: location;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
}

// activities: activities[];
//   connections: connectedUser[];
  // events: eventsList[];



export interface ProfileDto {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  phonenumber?: string
  bio?: string
  gender?: "male" | "female" | "other"
  photoUrl?: any
  // location: location
  updatedAt: string
  activities: activitiesDto[]
}


export interface location {
  name?: string
  lat?: GLfloat
  long?: GLfloat
}




export interface connectedUser {
  id: number;
  status: boolean
  user: connectedUserInfo

}

export interface connectedUserInfo {
    id: number
    firstName: string
    lastName: string
    location: location,
    activities: activitiesDto[]
}
 




