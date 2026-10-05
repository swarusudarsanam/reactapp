import { Link } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const colors = {
  background: '#F5F7FB',
  ink: '#17233C',
  muted: '#69758B',
  primary: '#405CF5',
  white: '#FFFFFF',
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>YOUR SPACE</Text>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>
        A calm place to pick up right where you left off.
      </Text>

      <View style={styles.welcomeCard}>
        <View style={styles.cardMark}>
          <Text style={styles.cardMarkText}>✦</Text>
        </View>
        <Text style={styles.cardTitle}>Make it yours</Text>
        <Text style={styles.cardDescription}>
          Search for what you need, save your favorites, and manage your account
          from one place.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Explore</Text>
      <View style={styles.actions}>
        <Link href="/search" style={styles.actionCard}>
          <Text style={styles.actionIcon}>⌕</Text>
          <Text style={styles.actionTitle}>Search</Text>
          <Text style={styles.actionDescription}>Find what you need</Text>
        </Link>
        <Link href="/saved" style={styles.actionCard}>
          <Text style={styles.actionIcon}>♡</Text>
          <Text style={styles.actionTitle}>Saved</Text>
          <Text style={styles.actionDescription}>Your favorites</Text>
        </Link>
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
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 9,
  },
  title: {
    color: colors.ink,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
  welcomeCard: {
    borderRadius: 22,
    backgroundColor: colors.white,
    padding: 22,
    marginTop: 30,
  },
  cardMark: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#EEF0FF',
    marginBottom: 18,
  },
  cardMarkText: {
    color: colors.primary,
    fontSize: 23,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '700',
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minHeight: 138,
    borderRadius: 18,
    backgroundColor: colors.white,
    padding: 16,
  },
  actionIcon: {
    color: colors.primary,
    fontSize: 24,
    marginBottom: 12,
  },
  actionTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  actionDescription: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
})
