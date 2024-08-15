import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#308DBF', headerShown: false, tabBarShowLabel: false, }}  >
      <Tabs.Screen
        name="home/home"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />,
       <Tabs.Screen
        name="cadastroPassageiro/cadastroPassageiro"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
