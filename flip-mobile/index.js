import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import "expo-dev-client";
import App from "./src/app";
import store from "./src/store";
import { Amplify } from "aws-amplify";
import awsConfig from "./src/aws-exports";

Amplify.configure(awsConfig);

const root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(root);
