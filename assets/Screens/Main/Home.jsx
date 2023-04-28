import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "../Main/PostsScreen";
import { CreatePostsScreen } from "../Main/CreatePostsScreen";
import { ProfileScreen } from "../Main/ProfileScreen";

import { SvgCreatePost } from "../SvgIcons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const MainTab = createBottomTabNavigator();

export const HomeScreen = () => {
  const { isBottomBarShown } = useSelector((state) => state.auth);

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: isBottomBarShown ? {} : { display: "none" },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => <SvgCreatePost />,
          tabBarStyle: { display: "none" },
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
