import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Categories() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>(null);

  const colors = isDarkMode ? Colors.dark : Colors.light;

  useEffect(() => {
    // Load user data from AsyncStorage
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          // If no user data found, redirect to login
          Alert.alert("Session Expired", "Please log in again", [
            {
              text: "OK",
              onPress: () => router.replace("/login"),
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        router.replace("/login");
      }
    };
    loadUserData();
  }, []);

  const expenseCategories = [
    { id: "1", name: "Food & Dining", icon: "restaurant", color: "#ef4444" },
    { id: "2", name: "Transportation", icon: "car", color: "#f59e0b" },
    { id: "3", name: "Shopping", icon: "bag", color: "#8b5cf6" },
    {
      id: "4",
      name: "Entertainment",
      icon: "game-controller",
      color: "#ec4899",
    },
    { id: "5", name: "Healthcare", icon: "medical", color: "#06b6d4" },
    { id: "6", name: "Bills", icon: "card", color: "#84cc16" },
    { id: "7", name: "Education", icon: "school", color: "#f97316" },
    { id: "8", name: "Other", icon: "ellipsis-horizontal", color: "#6b7280" },
  ];

  const incomeCategories = [
    { id: "1", name: "Salary", icon: "cash", color: "#22c55e" },
    { id: "2", name: "Freelance", icon: "laptop", color: "#3b82f6" },
    { id: "3", name: "Investment", icon: "trending-up", color: "#10b981" },
    { id: "4", name: "Gift", icon: "gift", color: "#f59e0b" },
    { id: "5", name: "Other", icon: "ellipsis-horizontal", color: "#6b7280" },
  ];

  const handleSave = async () => {
    setError("");

    if (!userData) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    if (!amount || !description || !selectedCategory) {
      setError("Please fill in all fields");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    try {
      // Get the selected category name
      const categories =
        transactionType === "income" ? incomeCategories : expenseCategories;
      const selectedCategoryData = categories.find(
        (cat) => cat.id === selectedCategory
      );

      const requestBody = {
        user_id: userData.user_id,
        amount: numAmount,
        description: description.trim(),
        category: selectedCategoryData?.name || "Other",
        date: new Date().toISOString(),
      };

      // Debug: Log the request body being sent
      console.log("Sending request body:", requestBody);
      console.log("User data:", userData);

      const endpoint =
        transactionType === "income"
          ? "http://192.168.1.81:1010/income"
          : "http://192.168.1.81:1010/expense";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Transaction saved successfully
        Alert.alert(
          "Success!",
          `${
            transactionType === "income" ? "Income" : "Expense"
          } added successfully`,
          [
            {
              text: "OK",
              onPress: () => {
                setAmount("");
                setDescription("");
                setSelectedCategory("");
                setError("");
                router.back();
              },
            },
          ]
        );
      } else {
        // Transaction save failed
        setError(
          data.message || `Failed to add ${transactionType}. Please try again.`
        );
      }
    } catch (error) {
      console.error("Transaction save error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories =
    transactionType === "income" ? incomeCategories : expenseCategories;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Add Transaction
        </Text>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: colors.surface }]}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Transaction Type Toggle */}
        <View style={[styles.typeToggle, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === "expense" && {
                backgroundColor: colors.danger,
              },
            ]}
            onPress={() => setTransactionType("expense")}
          >
            <Ionicons
              name="remove-circle"
              size={20}
              color={transactionType === "expense" ? "#fff" : colors.danger}
            />
            <Text
              style={[
                styles.typeButtonText,
                {
                  color: transactionType === "expense" ? "#fff" : colors.danger,
                },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === "income" && {
                backgroundColor: colors.success,
              },
            ]}
            onPress={() => setTransactionType("income")}
          >
            <Ionicons
              name="add-circle"
              size={20}
              color={transactionType === "income" ? "#fff" : colors.success}
            />
            <Text
              style={[
                styles.typeButtonText,
                {
                  color: transactionType === "income" ? "#fff" : colors.success,
                },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View
          style={[styles.inputSection, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Amount
          </Text>
          <View style={styles.amountInput}>
            <Text
              style={[styles.currencySymbol, { color: colors.textSecondary }]}
            >
              $
            </Text>
            <TextInput
              style={[styles.amountTextInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Description Input */}
        <View
          style={[styles.inputSection, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Description
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                color: colors.text,
                borderColor: colors.border,
                backgroundColor: colors.background,
              },
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="What was this for?"
            placeholderTextColor={colors.textMuted}
            multiline
          />
        </View>

        {/* Category Selection */}
        <View
          style={[styles.inputSection, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Category
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && {
                    backgroundColor: category.color + "20",
                    borderColor: category.color,
                  },
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={category.color}
                  />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor:
                transactionType === "income" ? colors.success : colors.danger,
            },
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  themeToggle: {
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40, // Add padding to the bottom of the scroll view
  },
  typeToggle: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  amountInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    minHeight: 50,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  saveButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: "#ff4444",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
});
