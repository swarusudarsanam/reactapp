import { useClerk, useUser } from '@clerk/expo'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function ProfileScreen() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const displayName = user?.fullName || user?.username || 'Your profile'
  const emailAddress = user?.primaryEmailAddress?.emailAddress
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleSignOut = async () => {
    setErrorMessage('')
    setIsSigningOut(true)

    try {
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to sign out. Please try again.',
      )
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>ACCOUNT</Text>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials || 'U'}</Text>
        </View>
        <Text style={styles.name}>{displayName}</Text>
        {emailAddress ? (
          <Text style={styles.email}>{emailAddress}</Text>
        ) : null}
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsLabel}>Account</Text>
        <Text style={styles.detailsValue}>Signed in with Clerk</Text>
      </View>

      {errorMessage ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {errorMessage}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={isSigningOut}
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.signOutButton,
          pressed && styles.buttonPressed,
          isSigningOut && styles.buttonDisabled,
        ]}
      >
        {isSigningOut ? (
          <ActivityIndicator color="#C43C4E" />
        ) : (
          <Text style={styles.signOutText}>Sign out</Text>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 24,
    paddingTop: 64,
  },
  eyebrow: {
    color: '#405CF5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 9,
  },
  title: {
    color: '#17233C',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 26,
    marginTop: 28,
  },
  avatar: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#405CF5',
    marginBottom: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    color: '#17233C',
    fontSize: 19,
    fontWeight: '700',
  },
  email: {
    color: '#69758B',
    fontSize: 14,
    marginTop: 5,
  },
  detailsCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginTop: 14,
  },
  detailsLabel: {
    color: '#69758B',
    fontSize: 12,
    marginBottom: 6,
  },
  detailsValue: {
    color: '#17233C',
    fontSize: 15,
    fontWeight: '600',
  },
  error: {
    color: '#C62828',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
  },
  signOutButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1CFD3',
    borderRadius: 14,
    backgroundColor: '#FFF7F7',
    marginTop: 22,
  },
  signOutText: {
    color: '#C43C4E',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
})
