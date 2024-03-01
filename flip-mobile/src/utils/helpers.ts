import { format } from "date-fns";
import { Dimensions, Platform, PixelRatio } from "react-native";
import { IUser, IAmplifyUser } from "types/auth";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 420;

export const formatPhone = (countryCode: number, phone: string) => {
  return `+${countryCode}${phone.replace(/\D/g, "")}`;
};

export const getDateSuffix = (date: Date): string => {
  const day = date.getDate();
  return day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
};

export const getDayStamp = (date: Date) => {
  const dateTime = new Date(date);
  const todayTime = new Date();
  const yesterday = new Date();
  const yesterdayTime = new Date(yesterday.setDate(yesterday.getDate() - 1));

  if (dateTime.toDateString() === todayTime.toDateString()) {
    return "Today";
  } else if (dateTime.toDateString() === yesterdayTime.toDateString()) {
    return "Yesterday";
  } else {
    return format(dateTime, "MM/dd/yyyy");
  }
};

export const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const normalize = (size: number) => {
  const newSize = size * scale;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return Platform.OS === "ios" ? normalizedSize : normalizedSize - 4;
};

export const SETTING_SCREENS = [
  {
    title: "Account",
    navigation: "AccountSetting",
  },
  {
    title: "Notifications",
    navigation: "NotificationSetting",
  },
  {
    title: "Help",
    navigation: "HelpSetting",
  },
  {
    title: "Email",
    navigation: "EmailSetting",
  },
  {
    title: "Phone Number",
    navigation: "PhoneNumberSetting",
  },
  {
    title: "Password",
    navigation: "PasswordSetting",
  },
  {
    title: "Close Account",
    navigation: "CloseAccountSetting",
  },
  {
    title: "Blocked Connections",
    navigation: "BlockedConnectionsSetting",
  },
];
