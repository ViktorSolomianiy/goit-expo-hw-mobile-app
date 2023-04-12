import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen } from "../NestedPostScreens/DefaultPostScreen";
import { MapScreen } from "../NestedPostScreens/MapScreen";
import { CommentsScreen } from "../NestedPostScreens/CommentsScreen";

const NestedPostScreens = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedPostScreens.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NestedPostScreens.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
      />
      <NestedPostScreens.Screen name="Comments" component={CommentsScreen} />
      <NestedPostScreens.Screen name="Map" component={MapScreen} />
    </NestedPostScreens.Navigator>
  );
};
