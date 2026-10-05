import { StyleSheet, Text, View } from 'react-native'

export default function SavedScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>YOUR LIBRARY</Text>
      <Text style={styles.title}>Saved</Text>
      <View style={styles.emptyCard}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>♡</Text>
        </View>
        <Text style={styles.emptyTitle}>Nothing saved yet</Text>
        <Text style={styles.emptyDescription}>
          Save things you love and they will be easy to find here.
        </Text>
      </View>
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
  emptyCard: {
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 36,
    marginTop: 28,
  },
  iconCircle: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#EEF0FF',
    marginBottom: 18,
  },
  icon: {
    color: '#405CF5',
    fontSize: 30,
  },
  emptyTitle: {
    color: '#17233C',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyDescription: {
    color: '#69758B',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },
})
