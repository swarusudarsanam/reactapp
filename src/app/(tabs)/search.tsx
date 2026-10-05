import { useMemo, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const destinations = [
  { title: 'Home', description: 'Your personal starting point' },
  { title: 'Saved', description: 'Things you have saved for later' },
  { title: 'Profile', description: 'Your account and preferences' },
  { title: 'Help & support', description: 'Get help with your account' },
]

export default function SearchScreen() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return destinations
    }

    return destinations.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>DISCOVER</Text>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Find your way around your space.</Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#8993A6"
          style={styles.input}
          autoCapitalize="none"
          accessibilityLabel="Search"
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionTitle}>
        {query.trim() ? 'Results' : 'Explore'}
      </Text>
      {results.length ? (
        results.map(({ title, description }) => (
          <View key={title} style={styles.resultCard}>
            <View style={styles.resultMark}>
              <Text style={styles.resultMarkText}>{title.charAt(0)}</Text>
            </View>
            <View style={styles.resultCopy}>
              <Text style={styles.resultTitle}>{title}</Text>
              <Text style={styles.resultDescription}>{description}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyDescription}>
            Try a different search term.
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
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
  subtitle: {
    color: '#69758B',
    fontSize: 15,
    marginTop: 8,
  },
  searchBox: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8F1',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    marginTop: 26,
  },
  searchIcon: {
    color: '#69758B',
    fontSize: 25,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#17233C',
    fontSize: 15,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#17233C',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },
  resultCard: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  resultMark: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#EEF0FF',
  },
  resultMarkText: {
    color: '#405CF5',
    fontSize: 16,
    fontWeight: '700',
  },
  resultCopy: {
    flex: 1,
    marginLeft: 12,
  },
  resultTitle: {
    color: '#17233C',
    fontSize: 15,
    fontWeight: '700',
  },
  resultDescription: {
    color: '#69758B',
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: '#8993A6',
    fontSize: 25,
    marginLeft: 8,
  },
  emptyCard: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  emptyTitle: {
    color: '#17233C',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyDescription: {
    color: '#69758B',
    fontSize: 14,
    marginTop: 6,
  },
})
