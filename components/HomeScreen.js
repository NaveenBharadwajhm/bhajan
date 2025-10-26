import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
// (removed static JSON import) - bhajans will be fetched from an API at runtime
import { List, Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // dynamic data state
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: replace with your real API endpoint
    const API_URL = 'https://your-api.example.com/bhajans';
    let isMounted = true;
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        // assume API returns an array of bhajans
        setBhajans(Array.isArray(data) ? data : data.bhajans || []);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load bhajans');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Categories for bhajans
  const categories = [
    { id: 'all', name: 'ಎಲ್ಲಾ', icon: '🎵' },
    { id: 'ganesh', name: 'ಗಣೇಶ', icon: '🐘' },
    { id: 'shiva', name: 'ಶಿವ', icon: '🕉️' },
    { id: 'rama', name: 'ರಾಮ', icon: '🏹' },
    { id: 'krishna', name: 'ಕೃಷ್ಣ', icon: '🪔' },
  ];

  // Filter bhajans based on search and category
  const filteredBhajans = bhajans.filter(bhajan => {
    const matchesSearch = bhajan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bhajan.lyrics.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bhajan.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = bhajan.category.toLowerCase().includes(selectedCategory);
    }
    
    return matchesSearch && matchesCategory;
  });

  const renderBhajanItem = ({ item, index }) => (
    <Card style={styles.bhajanCard} elevation={3}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Lyrics", { bhajan: item })}
        activeOpacity={0.7}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.bhajanInfo}>
            <View style={styles.bhajanHeader}>
              <Text style={styles.bhajanNumber}>#{item.id}</Text>
              <Text style={styles.bhajanTitle}>{item.title}</Text>
            </View>
            {/* <Text style={styles.bhajanPreview}>
              {item.lyrics.substring(0, 80)}...
            </Text> */}
            <View style={styles.bhajanMeta}>
              {/* <Text style={styles.bhajanLength}>
                📖 {Math.ceil(item.lyrics.length / 50)} verses
              </Text> */}
              <Text style={styles.tapToRead}>👆 Tap to read full bhajan</Text>
            </View>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading bhajans...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Beautiful Header */}
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FFD93D']}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.appTitle}>🕉️ ಭಜನ್ ಸಂಗ್ರಹ</Text>
            <Text style={styles.appSubtitle}>Sacred Devotional Songs</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search bhajans..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B35"
          inputStyle={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Bhajans List */}
      <View style={styles.bhajansContainer}>
        <Text style={styles.resultsText}>
          {filteredBhajans.length} bhajan{filteredBhajans.length !== 1 ? 's' : ''} found
        </Text>
        <FlatList
          data={filteredBhajans}
          renderItem={renderBhajanItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bhajansList}
        />
      </View>

      {/* Footer */}
      {/* <SafeAreaView style={styles.footer}>
        <Text style={styles.footerText}>Developed with ❤️ by Naveen</Text>
      </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  searchBar: {
    borderRadius: 25,
    elevation: 5,
    backgroundColor: 'white',
  },
  searchInput: {
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 2,
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#FF6B35',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  bhajansContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  bhajansList: {
    paddingBottom: 20,
  },
  bhajanCard: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  cardContent: {
    padding: 20,
  },
  bhajanInfo: {
    flex: 1,
  },
  bhajanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bhajanNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  bhajanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  bhajanPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  bhajanMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bhajanLength: {
    fontSize: 12,
    color: '#888',
  },
  tapToRead: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;