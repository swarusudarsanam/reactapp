import { useAuth } from '@clerk/expo'
import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const tabIcons: Record<string, string> = {
  index: '⌂',
  search: '⌕',
  saved: '♡',
  profile: '○',
}

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#405CF5" />
      </View>
    )
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#405CF5',
        tabBarInactiveTintColor: '#8993A6',
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color }) => (
          <Text style={[styles.tabIcon, { color }]}>
            {tabIcons[route.name] ?? '•'}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },
  tabBar: {
    height: 68,
    paddingTop: 7,
    paddingBottom: 7,
    borderTopColor: '#E9EDF4',
    backgroundColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 25,
    lineHeight: 28,
  },
})
