import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const colors = isDarkMode ? Colors.dark : Colors.light;

  useEffect(() => {
    // Load user data from AsyncStorage
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        console.log("Stored user data from AsyncStorage:", storedUserData);

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Parsed user data:", parsedUserData);
          setUserData(parsedUserData);
        } else {
          // If no user data found, redirect to login
          console.log("No user data found, redirecting to login");
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

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("userData");
            router.replace("/login");
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
      },
    ]);
  };

  // Mock data - in a real app, this would come from your state management
  const budgetData = {
    totalIncome: 5000,
    totalExpenses: 3200,
    remaining: 1800,
    monthlyBudget: 4000,
  };

  const recentTransactions = [
    {
      id: "1",
      name: "Grocery Shopping",
      amount: -120,
      category: "Food",
      date: "Today",
    },
    {
      id: "2",
      name: "Salary",
      amount: 5000,
      category: "Income",
      date: "Yesterday",
    },
    {
      id: "3",
      name: "Gas Station",
      amount: -45,
      category: "Transport",
      date: "2 days ago",
    },
    {
      id: "4",
      name: "Netflix Subscription",
      amount: -15,
      category: "Entertainment",
      date: "3 days ago",
    },
  ];

  const quickActions = [
    {
      id: "1",
      title: "Add Income",
      icon: "add-circle",
      color: "#22c55e",
      onPress: () => router.push("/categories"),
    },
    {
      id: "2",
      title: "Add Expense",
      icon: "remove-circle",
      color: "#ef4444",
      onPress: () => router.push("/categories"),
    },
    {
      id: "3",
      title: "Set Budget",
      icon: "calculator",
      color: "#6366f1",
      onPress: () => router.push("/add budget"),
    },
    {
      id: "4",
      title: "View Reports",
      icon: "analytics",
      color: "#f59e0b",
      onPress: () => router.push("/analytics"),
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const getProgressPercentage = () => {
    return Math.min(
      (budgetData.totalExpenses / budgetData.monthlyBudget) * 100,
      100
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Good morning
            {userData?.username
              ? `, ${userData.username}`
              : userData?.email
              ? `, ${userData.email.split("@")[0]}`
              : ""}
            !
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let's track your budget
          </Text>
        </View>
        <View style={styles.headerActions}>
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
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.surface }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.surface }]}>
          <View style={styles.balanceHeader}>
            <Text
              style={[styles.balanceLabel, { color: colors.textSecondary }]}
            >
              Total Balance
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewDetails, { color: colors.primary }]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.balanceAmount, { color: colors.text }]}>
            {formatCurrency(budgetData.remaining)}
          </Text>

          {/* Budget Progress */}
          <View style={styles.budgetProgress}>
            <View style={styles.progressHeader}>
              <Text
                style={[styles.progressLabel, { color: colors.textSecondary }]}
              >
                Monthly Budget
              </Text>
              <Text style={[styles.progressAmount, { color: colors.text }]}>
                {formatCurrency(budgetData.totalExpenses)} /{" "}
                {formatCurrency(budgetData.monthlyBudget)}
              </Text>
            </View>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.borderLight },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${getProgressPercentage()}%`,
                    backgroundColor:
                      getProgressPercentage() > 80 ? "#ef4444" : "#6366f1",
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: colors.surface }]}
                onPress={action.onPress}
              >
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: action.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={action.icon as any}
                    size={24}
                    color={action.color}
                  />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Income vs Expenses */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            This Month
          </Text>
          <View style={styles.statsContainer}>
            <View
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <View
                style={[styles.statIcon, { backgroundColor: "#22c55e" + "20" }]}
              >
                <Ionicons name="trending-up" size={20} color="#22c55e" />
              </View>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Income
              </Text>
              <Text style={[styles.statAmount, { color: "#22c55e" }]}>
                {formatCurrency(budgetData.totalIncome)}
              </Text>
            </View>

            <View
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <View
                style={[styles.statIcon, { backgroundColor: "#ef4444" + "20" }]}
              >
                <Ionicons name="trending-down" size={20} color="#ef4444" />
              </View>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Expenses
              </Text>
              <Text style={[styles.statAmount, { color: "#ef4444" }]}>
                {formatCurrency(budgetData.totalExpenses)}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.transactionsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => router.push("/transactions")}>
              <Text style={[styles.viewAll, { color: colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.transactionsContainer,
              { backgroundColor: colors.surface },
            ]}
          >
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionItem}
              >
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor:
                          transaction.amount > 0
                            ? "#22c55e" + "20"
                            : "#ef4444" + "20",
                      },
                    ]}
                  >
                    <Ionicons
                      name={
                        transaction.amount > 0 ? "trending-up" : "trending-down"
                      }
                      size={16}
                      color={transaction.amount > 0 ? "#22c55e" : "#ef4444"}
                    />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text
                      style={[styles.transactionName, { color: colors.text }]}
                    >
                      {transaction.name}
                    </Text>
                    <Text
                      style={[
                        styles.transactionCategory,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {transaction.category}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
                      },
                    ]}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <Text
                    style={[
                      styles.transactionDate,
                      { color: colors.textMuted },
                    ]}
                  >
                    {transaction.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
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
  logoutButton: {
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
    paddingBottom: 120, // Add extra padding to prevent tab navigator overlap
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: "600",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  budgetProgress: {
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionsContainer: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
});
