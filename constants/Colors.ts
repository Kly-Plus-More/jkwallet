/**
 * Modern Budget App Color Scheme
 * Clean, professional colors optimized for financial tracking
 */

const primaryColor = "#6366f1"; // Indigo
const secondaryColor = "#10b981"; // Emerald
const accentColor = "#f59e0b"; // Amber
const dangerColor = "#ef4444"; // Red
const successColor = "#22c55e"; // Green

export const Colors = {
  light: {
    // Primary colors
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    danger: dangerColor,
    success: successColor,

    // Background colors
    background: "#f8fafc",
    surface: "#ffffff",
    card: "#ffffff",

    // Text colors
    text: "black",
    textSecondary: "black",
    textMuted: "black",

    // Border colors
    border: "#e2e8f0",
    borderLight: "#f1f5f9",

    // Status colors
    income: successColor,
    expense: dangerColor,
    neutral: "#6b7280",

    // Tab colors
    tabIconDefault: "#94a3b8",
    tabIconSelected: primaryColor,
    tint: primaryColor,
    icon: "#687076",
  },
  dark: {
    // Primary colors
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    danger: dangerColor,
    success: successColor,

    // Background colors
    background: "#0f172a",
    surface: "#1e293b",
    card: "#334155",

    // Text colors
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
    textMuted: "#64748b",

    // Border colors
    border: "#334155",
    borderLight: "#475569",

    // Status colors
    income: successColor,
    expense: dangerColor,
    neutral: "#94a3b8",

    // Tab colors
    tabIconDefault: "#64748b",
    tabIconSelected: primaryColor,
    tint: primaryColor,
    icon: "#9BA1A6",
  },
};
