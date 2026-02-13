// Consolidated react-native imports to avoid eslint "imported multiple times" warnings.
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import Category from "@/models/category";
import { AlertTriangle, Check, Droplet, Plus, Store, Wrench } from "lucide-react-native";

export default function CategoryCard({
    category,
    style,
    checked = false,
    onPress,
}: {
    category: Category;
    // Allow callers to pass arrays, conditional styles, or omit styling entirely.
    style?: StyleProp<ViewStyle>;
    // Optional: lets callers control when the top-right check is visible.
    checked?: boolean;
    onPress?: () => void;
}) {
    return (
        <Pressable
            style={[styles.container, style]}
            // Hook for parent-managed selection state.
            // If not provided, the card remains non-interactive.
            onPress={onPress}
        >
            {/* Optional check indicator (positioned absolutely in top-right). */}
            {checked ? <Check size={20} color="white" style={styles.checkIcon} /> : null}
            {getIcon(category)}
            <Text style={styles.text}>{category.name}</Text>
        </Pressable>
    );
}

const getIcon = (category: Category) => {
    switch (category.id) {
        case 1:
            return <Wrench style={styles.iconSize} />
        case 2:
            return <Store style={styles.iconSize} />
            case 3:
                return <Droplet style={styles.iconSize} />
        case 4:
            return <AlertTriangle style={styles.iconSize} />
        default:
            return <Plus style={styles.iconSize} />
    }
}

const styles = StyleSheet.create({
    container: {
        // Let the parent (FlatList grid cell) control sizing.
        flex: 1,
        gap: 18,
        width: "100%",
        height: "100%",
        // Needed so `checkIcon` absolute positioning anchors to this card.
        position: "relative",
        backgroundColor: "transparent",
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "gray",
        borderWidth: 2,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    iconSize:{width: 40, height: 40},
    checkIcon: {
        // Plain (no badge) check icon in the top-right corner.
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
});