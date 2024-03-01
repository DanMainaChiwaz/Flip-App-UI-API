import { Hub } from "aws-amplify";
import { autoSignInFailure, autoSignInSuccess } from "reducers/auth";
import { IUser } from "types/auth";

export const registerAuthListeners = async (dispatch) => {
  Hub.listen("auth", async ({ payload }) => {
    const { event, data } = payload;

    switch (event) {
      case "autoSignIn":
        {
          const { attributes } = data;
          const newUser: IUser = {
            id: attributes.sub,
            email: attributes.email,
            firstName: attributes.given_name,
            lastName: attributes.family_name,
            phoneNumber: attributes.phone_number,
            isVerified: attributes.email_verified,
            isConfigured: false,
          };

          dispatch(autoSignInSuccess(newUser));
        }
        break;
      case "autoSignIn_failure":
        dispatch(autoSignInFailure());
    }
  });
};
