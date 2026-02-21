import { Pressable, StyleSheet, Text, View } from "react-native";

const PadyakButton = ({
  label,
  onPress,
  backgroundColor,
  disabled,
  textColor,
}: {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  disabled: boolean;
  textColor: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor }, disabled && styles.disabled]}
      disabled={disabled}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    height: 62,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default PadyakButton;
