import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const LyricsScreen = ({ route, navigation }) => {
  const { bhajan } = route.params;
  const [fontSize, setFontSize] = useState(24);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const handleFontSizeChange = (value) => {
    setFontSize(Math.round(value));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? "Bookmark Removed" : "Bookmark Added",
      isBookmarked
        ? "Bhajan removed from favorites"
        : "Bhajan added to favorites"
    );
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, progress)));
  };

  // Function to format lyrics with proper line breaks and verse numbers
  const formatLyrics = (lyrics) => {
    return lyrics
      .split("\n")
      //.filter((line) => line.trim() !== "")
      .map((line, index) => {
        return (
          <Text
            key={index}
            style={[
              styles.lyricsLine,
              { fontSize: fontSize },
            ]}
          >
            {line.trim()}
          </Text>
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* Beautiful Header */}
      <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{bhajan.title}</Text>
            <Text style={styles.headerSubtitle}>Bhajan #{bhajan.id}</Text>
          </View>

          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmark}
          >
            <MaterialIcons
              name={isBookmarked ? "bookmark" : "bookmark-border"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Reading Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${readingProgress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(readingProgress)}% read
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Font Size: {fontSize.toFixed(0)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={40}
          step={1}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#007AFF"
        />
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        {/* Bhajan Content */}
        <ScrollView
          style={styles.lyricsContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={12}
        >
          <View style={styles.lyricsWrapper}>
            {formatLyrics(bhajan.lyrics)}
          </View>

          {/* End of bhajan indicator */}
          <View style={styles.endIndicator}>
            <Text style={styles.endText}>🕉️</Text>
            <Text style={styles.endText}>End of Bhajan</Text>
            <Text style={styles.endText}>🕉️</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  bookmarkButton: {
    padding: 8,
  },
  progressContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  previewText: {
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
  },
  sliderContainer: {
    alignItems: "stretch",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  verticalSlider: {
    width: 200,
    height: 40,
    transform: [{ rotate: "90deg" }],
  },
  sliderThumb: {
    backgroundColor: "#FF6B35",
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
    marginVertical: 5,
  },
  fontSizeText: {
    fontSize: 160,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  lyricsContainer: {
    flex: 1,
    padding: 10,
  },
  lyricsWrapper: {
    paddingBottom: 40,
  },
  lyricsLine: {
    fontWeight: "normal",
    lineHeight: 32,
    color: "#34495E",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
    fontSize: 32,
  },
  verseNumber: {
    fontWeight: "bold",
    color: "#34495E",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  endIndicator: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  endText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
});

export default LyricsScreen;
