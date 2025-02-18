import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "cardTitle";
  highlight?: boolean;
  adjustsFontSizeToFit?: boolean;
  numberOfLines?: number;
};

export default function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  highlight = false,
  adjustsFontSizeToFit = false,
  numberOfLines = undefined,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    highlight ? "primary" : "text"
  );

  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={2}
      style={styles.baseText}
    >
      <Text
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          type === "cardTitle" ? styles.cardTitle : undefined,
          style,
        ]}
        {...rest}
      />
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Hanken Grotesk",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 68,
    fontWeight: "bold",
    lineHeight: 68,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
