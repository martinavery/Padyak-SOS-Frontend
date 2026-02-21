import CategoryCard from "@/components/CategoryCard";
import { IOSFilledTextInput } from "@/components/IOSFilledTextInput";
import PadyakButton from "@/components/PadyakButton";
import Category from "@/models/category";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function AddScreen() {
  // Dummy screen placeholder (requested): replace with real "Add" flow later.
  // Example usage of IOSFilledTextInput component for visual reference.

  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [shopName, setShopName] = useState<string>("");

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (shopName.length > 0 && selectedCategory) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [shopName, selectedCategory]);

  return (
    // Use FlatList as the single scroll container so the entire screen
    // (map + input + categories) scrolls together without nested scroll views.
    <FlatList
      style={[styles.container, styles.categoriesContainer]}
      contentContainerStyle={[styles.categoriesContent, styles.listContent]}
      ListHeaderComponentStyle={styles.listHeader}
      ListHeaderComponent={
        <View>
          <View style={styles.mapPlaceHolder} />
          <View style={styles.inputContainer}>
            <IOSFilledTextInput
              label="Shop Name"
              placeholder="Enter Shop Name"
              value={shopName}
              onChangeText={setShopName}
            />
          </View>
        </View>
      }
      ListFooterComponent={
        <View>
          <PadyakButton
            label="Save offline"
            onPress={() => {}}
            backgroundColor="#264437"
            disabled={buttonDisabled}
            textColor="white"
          />
        </View>
      }
      data={categories}
      // Added a grid "cell" wrapper that provides consistent gutters between cards.
      renderItem={({ item }) => (
        <View style={styles.categoryCell}>
          {/* Enforce a consistent card height across the grid. */}
          <CategoryCard
            category={item}
            style={styles.categoryCard}
            checked={selectedCategory?.id === item.id}
            selectedBgColor={
              selectedCategory?.id === item.id ? item.color : "transparent"
            }
            selectedTextColor={
              selectedCategory?.id === item.id ? "white" : "black"
            }
            // IMPORTANT: pass a function, not the result of calling the state setter.
            onPress={() => setSelectedCategory(item)}
          />
        </View>
      )}
      // Added explicit keys to avoid FlatList warnings.
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
    />
  );
}

const categories = [
  new Category(1, "Vulcanizing", "#A855F7"),
  new Category(2, "Bike Shop", "#3B82F6"),
  new Category(3, "Water Station", "#06B6D4"),
  new Category(4, "Hazard", "#DC2626"),
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Let list/header stretch full width.
    width: "100%",
  },
  listHeader: {
    width: "100%",
  },
  listContent: {
    // Add bottom padding so content doesn't sit under the tab bar.
    paddingBottom: 16,
  },
  mapPlaceHolder: {
    width: "100%",
    height: 250,
    backgroundColor: "green",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
  },
  categoriesContainer: {
    width: "100%",
    padding: 2,
  },
  categoriesContent: {
    // Keep the grid aligned with the surrounding padding.
    // Note: card-to-card spacing is handled by `categoryCell` (gutters).
    marginHorizontal: 4,
    marginBottom: 10,
  },
  categoryCell: {
    // Spacing between category cards (both row + column gutters).
    // Force each grid cell to take exactly half the row width so the last row
    // (when item count is odd) doesn't stretch a single card to full width.
    flexBasis: "50%",
    maxWidth: "50%",
    padding: 6,
  },
  categoryCard: {
    // Match requested design: each card is 300dp tall.
    aspectRatio: 1.2,
  },
});
