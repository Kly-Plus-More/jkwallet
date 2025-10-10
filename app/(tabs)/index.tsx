import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
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

export default function Dashboard() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remaining: 0,
    monthlyBudget: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const fetchUserBalance = async () => {
    try {
      const userDataStr = await AsyncStorage.getItem("userData");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;

      console.log("User data structure:", userData);

      if (!userData) {
        throw new Error("User data not found");
      }

      // Try userid (from users table) first, then fallback to other common names
      const userId =
        userData.userid || userData.user_id || userData.userId || userData.id;

      if (!userId) {
        console.log("Available properties in userData:", Object.keys(userData));
        throw new Error("User ID not found in user data");
      }

      console.log("Using user ID:", userId);

      // Fetch balance data
      const balanceResponse = await fetch(
        `http://192.168.1.87:1010/api/balance?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!balanceResponse.ok) {
        const errorText = await balanceResponse.text();
        console.error("Balance API Error Response:", errorText);
        throw new Error(`Server error: ${balanceResponse.status}`);
      }

      const balanceData = await balanceResponse.json();
      console.log("Balance API response:", balanceData);

      // Fetch monthly budget (now uses current month's income)
      const budgetResponse = await fetch(
        `http://192.168.1.87:1010/api/budget?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let monthlyBudget = 4000; // Default fallback
      if (budgetResponse.ok) {
        const budgetData = await budgetResponse.json();
        monthlyBudget = budgetData.monthlyBudget || 4000;
        console.log("Monthly budget from API:", monthlyBudget);
      } else {
        console.log("Budget API failed, using default");
      }

      // Fetch recent transactions
      const transactionsResponse = await fetch(
        `http://192.168.1.87:1010/api/transactions/recent?user_id=${userId}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let transactions: Transaction[] = [];
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        transactions = transactionsData.transactions || [];
        console.log("Recent transactions from API:", transactions);
      } else {
        console.log("Transactions API failed, using empty array");
        // Fallback to mock data if API fails
        transactions = [
          {
            id: "1",
            name: "No transactions yet",
            amount: 0,
            category: "Add your first transaction",
            date: new Date().toISOString(),
            type: "income",
          },
        ];
      }

      setBudgetData({
        totalIncome: balanceData.totalIncome || 0,
        totalExpenses: balanceData.totalExpenses || 0,
        remaining: balanceData.remaining || 0,
        monthlyBudget: monthlyBudget,
      });
      console.log("Final budget data being set:", {
        totalIncome: balanceData.totalIncome || 0,
        totalExpenses: balanceData.totalExpenses || 0,
        remaining: balanceData.remaining || 0,
        monthlyBudget: monthlyBudget,
      });
      setRecentTransactions(transactions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  ////////////
  // In your fetchUserBalance function, after setting the state:

  // And add this useEffect to debug state changes
  useEffect(() => {
    console.log("Budget data state updated:", budgetData);
    console.log("Recent transactions state updated:", recentTransactions);
  }, [budgetData, recentTransactions]);
  /////////

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        console.log("Stored user data from AsyncStorage:", storedUserData);

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Parsed user data:", parsedUserData);
          console.log("User ID:", parsedUserData.userid);
          console.log("All keys:", Object.keys(parsedUserData));

          setUserData(parsedUserData);

          // Fetch all dashboard data after user data is loaded
          await fetchUserBalance();
        } else {
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

  // Refresh data when returning to dashboard
  // useEffect(() => {
  //   const unsubscribe = router.addListener("focus", () => {
  //     if (userData) {
  //       fetchUserBalance();
  //     }
  //   });

  //   return unsubscribe;
  // }, [router, userData]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays === 0) return "Today";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getProgressPercentage = () => {
    if (budgetData.monthlyBudget === 0) return 0;
    return Math.min(
      (budgetData.totalExpenses / budgetData.monthlyBudget) * 100,
      100
    );
  };

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
          Loading your finances...
        </Text>
      </View>
    );
  }

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
            <TouchableOpacity onPress={fetchUserBalance}>
              <Ionicons name="refresh" size={20} color={colors.primary} />
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
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
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
                            transaction.type === "income"
                              ? "#22c55e" + "20"
                              : "#ef4444" + "20",
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          transaction.type === "income"
                            ? "trending-up"
                            : "trending-down"
                        }
                        size={16}
                        color={
                          transaction.type === "income" ? "#22c55e" : "#ef4444"
                        }
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
                          color:
                            transaction.type === "income"
                              ? "#22c55e"
                              : "#ef4444",
                        },
                      ]}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </Text>
                    <Text
                      style={[
                        styles.transactionDate,
                        { color: colors.textMuted },
                      ]}
                    >
                      {formatDate(transaction.date)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noTransactions}>
                <Ionicons
                  name="receipt-outline"
                  size={48}
                  color={colors.textMuted}
                />
                <Text
                  style={[
                    styles.noTransactionsText,
                    { color: colors.textMuted },
                  ]}
                >
                  No transactions yet
                </Text>
                <Text
                  style={[
                    styles.noTransactionsSubtext,
                    { color: colors.textMuted },
                  ]}
                >
                  Add your first income or expense to get started
                </Text>
              </View>
            )}
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
    paddingBottom: 120,
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
    minHeight: 200,
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
  noTransactions: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  noTransactionsText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  noTransactionsSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
