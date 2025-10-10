import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export default function Transactions() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const fetchAllTransactions = async () => {
    try {
      const userDataStr = await AsyncStorage.getItem("userData");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;

      if (!userData) {
        throw new Error("User data not found");
      }

      // Try userid (from users table) first, then fallback to other common names
      const userId =
        userData.userid || userData.user_id || userData.userId || userData.id;

      if (!userId) {
        throw new Error("User ID not found in user data");
      }

      console.log("Fetching all transactions for user:", userId);

      const response = await fetch(
        `http://192.168.1.87:1010/api/transactions/all?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Transactions API Error:", errorText);
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Transactions API response count:",
        data.transactions?.length || 0
      );

      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Failed to load transactions");
      // Keep empty array on error
      setTransactions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllTransactions();
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      "Food & Dining": "restaurant",
      Food: "restaurant",
      Transportation: "car",
      Transport: "car",
      Shopping: "bag",
      Entertainment: "game-controller",
      Salary: "cash",
      Income: "cash",
      Freelance: "laptop",
      Investment: "trending-up",
      Healthcare: "medical",
      Bills: "card",
      Education: "school",
      Other: "ellipsis-horizontal",
    };
    return iconMap[category] || "ellipsis-horizontal";
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      "Food & Dining": "#ef4444",
      Food: "#ef4444",
      Transportation: "#f59e0b",
      Transport: "#f59e0b",
      Shopping: "#8b5cf6",
      Entertainment: "#ec4899",
      Salary: "#22c55e",
      Income: "#22c55e",
      Freelance: "#3b82f6",
      Investment: "#10b981",
      Healthcare: "#06b6d4",
      Bills: "#84cc16",
      Education: "#f97316",
      Other: "#6b7280",
    };
    return colorMap[category] || "#6b7280";
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={[styles.transactionCard, { backgroundColor: colors.surface }]}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: getCategoryColor(item.category) + "20" },
          ]}
        >
          <Ionicons
            name={getCategoryIcon(item.category) as any}
            size={20}
            color={getCategoryColor(item.category)}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={[styles.transactionName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.transactionCategory,
              { color: colors.textSecondary },
            ]}
          >
            {item.category}
          </Text>
          <Text style={[styles.transactionDate, { color: colors.textMuted }]}>
            {formatDate(item.date)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.type === "income" ? colors.success : colors.danger },
          ]}
        >
          {item.type === "income" ? "+" : "-"}
          {formatCurrency(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading transactions...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Transactions
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

      {/* Search Bar */}
      <View
        style={[styles.searchContainer, { backgroundColor: colors.surface }]}
      >
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search transactions..."
          placeholderTextColor={colors.textMuted}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {[
          { key: "all", label: "All", icon: "list" },
          { key: "income", label: "Income", icon: "trending-up" },
          { key: "expense", label: "Expenses", icon: "trending-down" },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              filterType === filter.key && { backgroundColor: colors.primary },
            ]}
            onPress={() => setFilterType(filter.key as any)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={filterType === filter.key ? "#fff" : colors.textSecondary}
            />
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    filterType === filter.key ? "#fff" : colors.textSecondary,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions Count */}
      <View style={styles.countContainer}>
        <Text style={[styles.countText, { color: colors.textSecondary }]}>
          Showing {filteredTransactions.length} of {transactions.length}{" "}
          transactions
        </Text>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer, { paddingBottom: 120 }]}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={64}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {transactions.length === 0
                ? "No transactions yet"
                : "No transactions found"}
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>
              {transactions.length === 0
                ? "Add your first income or expense to get started"
                : "Try adjusting your search or filters"}
            </Text>
          </View>
        }
      />

      {/* Summary */}
      <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total Income:
          </Text>
          <Text style={[styles.summaryAmount, { color: colors.success }]}>
            {formatCurrency(
              filteredTransactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total Expenses:
          </Text>
          <Text style={[styles.summaryAmount, { color: colors.danger }]}>
            {formatCurrency(
              filteredTransactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotal]}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Net:
          </Text>
          <Text
            style={[
              styles.summaryAmount,
              {
                color:
                  filteredTransactions.reduce(
                    (sum, t) =>
                      t.type === "income" ? sum + t.amount : sum - t.amount,
                    0
                  ) >= 0
                    ? colors.success
                    : colors.danger,
              },
            ]}
          >
            {formatCurrency(
              filteredTransactions.reduce(
                (sum, t) =>
                  t.type === "income" ? sum + t.amount : sum - t.amount,
                0
              )
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  countText: {
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  summaryCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
