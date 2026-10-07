import { useAuth, useSignIn, useSignUp } from '@clerk/expo'
import { Image } from 'expo-image'
import { Link, Redirect, router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

type AuthScreenProps = {
  mode: 'sign-in' | 'sign-up'
}

const colors = {
  background: '#F5F7FB',
  ink: '#17233C',
  muted: '#69758B',
  primary: '#405CF5',
  input: '#F8F9FC',
  border: '#E3E8F1',
  error: '#C62828',
  white: '#FFFFFF',
}

export default function AuthScreen({ mode }: AuthScreenProps) {
  const authState = useAuth()
  const signInState = useSignIn()
  const signUpState = useSignUp()
  const isSignUp = mode === 'sign-up'
  const { isLoaded, isSignedIn } = authState
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleSignUp = async () => {
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const { error } = await signUpState.signUp.password({
        emailAddress: emailAddress.trim(),
        password,
      })
      if (error) {
        setErrorMessage(error.message)
        return
      }

      const { error: sendError } =
        await signUpState.signUp.verifications.sendEmailCode()
      if (sendError) {
        setErrorMessage(sendError.message)
        return
      }

      setIsVerifying(true)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to start sign-up. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async () => {
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const { error } =
        await signUpState.signUp.verifications.verifyEmailCode({ code })
      if (error) {
        setErrorMessage(error.message)
        return
      }

      const { error: finalizeError } = await signUpState.signUp.finalize()
      if (finalizeError) {
        setErrorMessage(finalizeError.message)
        return
      }

      router.replace('/(tabs)')
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to verify your email. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignIn = async () => {
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const { error } = await signInState.signIn.password({
        emailAddress: emailAddress.trim(),
        password,
      })
      if (error) {
        setErrorMessage(error.message)
        return
      }

      const { error: finalizeError } = await signInState.signIn.finalize()
      if (finalizeError) {
        setErrorMessage(finalizeError.message)
        return
      }

      router.replace('/(tabs)')
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to sign in. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = isSignUp ? handleSignUp : handleSignIn
  const isButtonDisabled = isVerifying
    ? code.trim().length === 0
    : !emailAddress.trim() || !password

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandMark}>
          <Image
            source={require('../../assets/images/homely.jpg')}
            contentFit="fill"
            style={styles.brandIconImage}
            accessibilityLabel="Homely icon"
          />
        </View>
        <Text style={styles.eyebrow}>YOUR SPACE, ALL IN ONE PLACE</Text>
        <Text style={styles.title}>
          {isVerifying
            ? 'Check your inbox'
            : isSignUp
              ? 'Create your account'
              : 'Welcome back'}
        </Text>
        <Text style={styles.subtitle}>
          {isVerifying
            ? `Enter the verification code sent to ${emailAddress.trim()}.`
            : isSignUp
              ? 'Sign up to get started.'
              : 'Sign in to pick up where you left off.'}
        </Text>

        <View style={styles.form}>
          {isVerifying ? (
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Verification code"
              placeholderTextColor={colors.muted}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              accessibilityLabel="Verification code"
            />
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={emailAddress}
                placeholder="Email address"
                placeholderTextColor={colors.muted}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                accessibilityLabel="Email address"
              />
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                placeholderTextColor={colors.muted}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                textContentType={isSignUp ? 'newPassword' : 'password'}
                accessibilityLabel="Password"
              />
            </>
          )}

          {errorMessage ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {errorMessage}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting || isButtonDisabled}
            onPress={isVerifying ? handleVerify : handleSubmit}
            android_ripple={{ color: '#3349D1' }}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isVerifying
                  ? 'Verify email'
                  : isSignUp
                    ? 'Create account'
                    : 'Sign in'}
              </Text>
            )}
          </Pressable>

          {isSignUp && !isVerifying ? (
            <View nativeID="clerk-captcha" />
          ) : null}
        </View>

        {!isVerifying ? (
          <View style={styles.switchAuth}>
            <Text style={styles.switchText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </Text>
            <Link
              href={isSignUp ? '/sign-in' : '/sign-up'}
              style={styles.link}
              accessibilityRole="link"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Link>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  brandMark: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: colors.white,
    marginBottom: 28,
    overflow: 'hidden',
  },
  brandIconImage: {
    position: 'absolute',
    width: 250,
    height: 136,
    left: -99,
    top: -28,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  form: {
    gap: 14,
    marginTop: 32,
  },
  input: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    color: colors.ink,
    fontSize: 16,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    width: '100%',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: '#3149D8',
    marginTop: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  switchAuth: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  switchText: {
    color: colors.muted,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
})
