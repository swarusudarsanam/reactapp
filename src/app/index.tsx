import { useAuth } from '@clerk/expo'
import { Image } from 'expo-image'
import { Redirect, router } from 'expo-router'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const colors = {
  background: '#F5F7FB',
  ink: '#17233C',
  muted: '#69758B',
  primary: '#405CF5',
  white: '#FFFFFF',
}

export default function WelcomeScreen() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      alwaysBounceVertical={false}
    >
      <Image
        source={require('../../assets/images/homely.jpg')}
        contentFit="contain"
        style={styles.heroImage}
        accessibilityLabel="Homely — Find Your Perfect Home"
      />

      <View style={styles.intro}>
        <Text style={styles.title}>Find a place to call home.</Text>
        <Text style={styles.subtitle}>
          Explore homes, save your favorites, and make your next move with
          Homely.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/sign-up')}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/sign-in')}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>Sign in</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 28,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: 260,
  },
  intro: {
    alignItems: 'center',
    marginTop: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.7,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 340,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    marginTop: 30,
  },
  primaryButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E0EE',
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.84,
  },
})
