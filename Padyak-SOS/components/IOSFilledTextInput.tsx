import React, { forwardRef, useState, useCallback } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  Platform,
  useColorScheme,
  ViewStyle,
  TextStyle,
} from "react-native";

// Props interface extending TextInputProps with custom styling options
export interface IOSFilledTextInputProps extends TextInputProps {
  // Optional label text displayed above the input
  label?: string;
  // Optional error message displayed below the input
  error?: string;
  // Style overrides for the container View
  containerStyle?: ViewStyle;
  // Style overrides for the TextInput itself
  inputStyle?: TextStyle;
  // Style overrides for the label Text
  labelStyle?: TextStyle;
  // Style overrides for the error Text
  errorStyle?: TextStyle;
}

/**
 * Custom TextInput component styled to match iOS filled rounded text field appearance.
 * iOS styling is applied only on iOS platform; other platforms use neutral default styling.
 * Supports optional label and error text, and all standard TextInput props.
 */
export const IOSFilledTextInput = forwardRef<TextInput, IOSFilledTextInputProps>(
  (
    {
      label,
      error,
      containerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      onFocus,
      onBlur,
      placeholderTextColor,
      ...textInputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const isIOS = Platform.OS === "ios";

    // Handle focus events: update internal state and call user-provided handlers
    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    // iOS-specific colors matching system appearance
    const iosColors = {
      backgroundLight: "#FFFFFF", // White fill for light mode (as per design)
      backgroundDark: "#1C1C1E",
      borderLight: "#D1D1D1", // Light gray border matching design
      borderDark: "#3A3A3C",
      focusBorder: "#007AFF", // iOS system blue
      placeholderLight: "#8E8E93",
      placeholderDark: "#8E8E93",
      textLight: "#000000",
      textDark: "#FFFFFF",
      error: "#FF3B30", // iOS system red
    };

    // Determine styles based on platform and color scheme
    const backgroundColor = isIOS
      ? isDark
        ? iosColors.backgroundDark
        : iosColors.backgroundLight
      : undefined;

    const borderColor = isIOS
      ? isFocused
        ? iosColors.focusBorder
        : isDark
          ? iosColors.borderDark
          : iosColors.borderLight
      : undefined;

    const placeholderColor = isIOS
      ? isDark
        ? iosColors.placeholderDark
        : iosColors.placeholderLight
      : placeholderTextColor;

    const textColor = isIOS
      ? isDark
        ? iosColors.textDark
        : iosColors.textLight
      : undefined;

    return (
      <View style={[styles.container, containerStyle]}>
        {/* Optional label above the input */}
        {label && (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )}
        
        {/* Main TextInput with iOS styling */}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isIOS && {
              backgroundColor,
              borderColor,
              color: textColor,
            },
            inputStyle,
          ]}
          placeholderTextColor={placeholderColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // Set keyboard appearance on iOS for better dark mode support
          keyboardAppearance={isIOS ? (isDark ? "dark" : "light") : undefined}
          {...textInputProps}
        />
        
        {/* Optional error message below the input */}
        {error && (
          <Text style={[styles.error, { color: iosColors.error }, errorStyle]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

IOSFilledTextInput.displayName = "IOSFilledTextInput";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 6,
    color: "#000000", // Default label color (can be overridden)
  },
  input: {
    fontSize: 17, // iOS standard text field font size
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10, // iOS rounded corners
    borderWidth: 1,
    minHeight: 44, // iOS minimum touch target height
  },
  error: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "400",
  },
});
