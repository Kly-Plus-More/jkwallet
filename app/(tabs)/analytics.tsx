import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { LineChart, PieChart } from "react-native-chart-kit";

interface ReportData {
  year: number;
  month: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number;
  categories: Array<{
    name: string;
    total: number;
    percentage: number;
  }>;
  insights: {
    isProfitable: boolean;
    savingsHealth: string;
    spendingEfficiency: string;
  };
}

interface HistoricalReport {
  year: number;
  month: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export default function Analytics() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeTab, setActiveTab] = useState("trends");
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchAnalyticsData = async () => {
    try {
      const userDataStr = await AsyncStorage.getItem("userData");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;

      if (!userData) {
        throw new Error("User data not found");
      }

      const userId =
        userData.userid || userData.user_id || userData.userId || userData.id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      // Fetch current month report
      const reportResponse = await fetch(
        `http://192.168.1.87:1010/api/reports/monthly?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (reportResponse.ok) {
        const reportData = await reportResponse.json();
        setReportData(reportData);
      }

      // Fetch historical data for trends
      const historicalResponse = await fetch(
        `http://192.168.1.87:1010/api/reports/historical?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (historicalResponse.ok) {
        const historicalData = await historicalResponse.json();
        setHistoricalData(historicalData.reports || []);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      Alert.alert("Error", "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    await fetchAnalyticsData();
    setGenerating(false);
    Alert.alert("Success", "Report generated successfully!");
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1] || "";
  };

  // Prepare chart data
  const trendsData = {
    labels: historicalData.map((report) => getMonthName(report.month)),
    datasets: [
      {
        data: historicalData.map((report) => report.totalIncome),
        color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: historicalData.map((report) => report.totalExpenses),
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const categoryData = {
    labels: reportData?.categories.map((cat) => cat.name) || [],
    datasets: [
      {
        data: reportData?.categories.map((cat) => cat.total) || [],
      },
    ],
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "#4cd964";
      case "good":
        return "#ffcc00";
      case "fair":
        return "#ff9500";
      case "poor":
        return "#ff3b30";
      default:
        return "#8e8e93";
    }
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "efficient":
        return "#4cd964";
      case "moderate":
        return "#ffcc00";
      case "inefficient":
        return "#ff3b30";
      default:
        return "#8e8e93";
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Analytics</Text>
          <Text style={styles.headerSubtitle}>
            {reportData
              ? `${getMonthName(reportData.month)} ${reportData.year}`
              : "Current Month"}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.incomeBg]}>
            <MaterialCommunityIcons
              name="trending-up"
              size={24}
              color="#4cd964"
            />
            <Text style={styles.statValue}>
              {reportData ? formatCurrency(reportData.totalIncome) : "$0"}
            </Text>
            <Text style={styles.statLabel}>Income</Text>
          </View>
          <View style={[styles.statCard, styles.expenseBg]}>
            <MaterialCommunityIcons
              name="trending-down"
              size={24}
              color="#F44336"
            />
            <Text style={styles.statValue}>
              {reportData ? formatCurrency(reportData.totalExpenses) : "$0"}
            </Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <View style={[styles.statCard, styles.netBg]}>
            <MaterialCommunityIcons
              name={
                reportData?.insights.isProfitable ? "arrow-up" : "arrow-down"
              }
              size={24}
              color={reportData?.insights.isProfitable ? "#4cd964" : "#F44336"}
            />
            <Text
              style={[
                styles.statValue,
                {
                  color: reportData?.insights.isProfitable
                    ? "#4cd964"
                    : "#F44336",
                },
              ]}
            >
              {reportData ? formatCurrency(reportData.netBalance) : "$0"}
            </Text>
            <Text style={styles.statLabel}>Net</Text>
          </View>
        </View>

        {/* Analytics Tabs */}
        <View style={styles.tabContainer}>
          {["trends", "categories", "insights"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>
                {tab === "trends"
                  ? "Trends"
                  : tab === "categories"
                  ? "Categories"
                  : "Insights"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Charts and Insights */}
        {activeTab === "trends" && historicalData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>6-Month Financial Trends</Text>
            <LineChart
              data={trendsData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: "#1e3c72",
                backgroundGradientFrom: "#1e3c72",
                backgroundGradientTo: "#2a5298",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "4", strokeWidth: "2" },
              }}
              bezier
              style={styles.chart}
            />
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#4cd964" }]}
                />
                <Text style={styles.legendText}>Income</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#F44336" }]}
                />
                <Text style={styles.legendText}>Expenses</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === "categories" &&
          reportData?.categories &&
          reportData.categories.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Spending by Category</Text>
              <PieChart
                data={reportData.categories.map((cat, index) => ({
                  name: cat.name,
                  population: cat.total,
                  color: `hsl(${index * 60}, 70%, 50%)`,
                  legendFontColor: "#fff",
                  legendFontSize: 12,
                }))}
                width={350}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          )}

        {activeTab === "insights" && reportData && (
          <View style={styles.insightsContainer}>
            <Text style={styles.insightsTitle}>Financial Health</Text>

            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Savings Rate</Text>
              <View style={styles.insightValueContainer}>
                <Text style={styles.insightValue}>
                  {reportData.savingsRate}%
                </Text>
                <View
                  style={[
                    styles.healthIndicator,
                    {
                      backgroundColor: getHealthColor(
                        reportData.insights.savingsHealth
                      ),
                    },
                  ]}
                />
              </View>
              <Text style={styles.insightDescription}>
                {reportData.insights.savingsHealth === "excellent"
                  ? "Great job! You're saving more than 20% of your income."
                  : reportData.insights.savingsHealth === "good"
                  ? "Good! You're saving 10-20% of your income."
                  : reportData.insights.savingsHealth === "fair"
                  ? "You're breaking even. Try to save more."
                  : "You're spending more than you earn. Review your expenses."}
              </Text>
            </View>

            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Spending Efficiency</Text>
              <View style={styles.insightValueContainer}>
                <Text style={styles.insightValue}>
                  {reportData.insights.spendingEfficiency
                    .charAt(0)
                    .toUpperCase() +
                    reportData.insights.spendingEfficiency.slice(1)}
                </Text>
                <View
                  style={[
                    styles.healthIndicator,
                    {
                      backgroundColor: getEfficiencyColor(
                        reportData.insights.spendingEfficiency
                      ),
                    },
                  ]}
                />
              </View>
              <Text style={styles.insightDescription}>
                {reportData.insights.spendingEfficiency === "efficient"
                  ? "You're spending less than 70% of your income. Excellent!"
                  : reportData.insights.spendingEfficiency === "moderate"
                  ? "You're spending 70-90% of your income. Could be better."
                  : "You're spending over 90% of your income. Consider cutting costs."}
              </Text>
            </View>

            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Profitability</Text>
              <View style={styles.insightValueContainer}>
                <Text
                  style={[
                    styles.insightValue,
                    {
                      color: reportData.insights.isProfitable
                        ? "#4cd964"
                        : "#F44336",
                    },
                  ]}
                >
                  {reportData.insights.isProfitable
                    ? "Profitable"
                    : "Loss Making"}
                </Text>
                <Ionicons
                  name={
                    reportData.insights.isProfitable
                      ? "checkmark-circle"
                      : "warning"
                  }
                  size={20}
                  color={
                    reportData.insights.isProfitable ? "#4cd964" : "#F44336"
                  }
                />
              </View>
              <Text style={styles.insightDescription}>
                {reportData.insights.isProfitable
                  ? "You're earning more than you spend. Keep it up!"
                  : "You're spending more than you earn. Review your budget."}
              </Text>
            </View>
          </View>
        )}

        {/* Generate Report Button */}
        {/* <TouchableOpacity
          style={[
            styles.actionButton,
            generating && styles.actionButtonDisabled,
          ]}
          onPress={generateReport}
          disabled={generating}
        >
          {generating ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text style={styles.actionButtonText}>Generate New Report</Text>
              <MaterialCommunityIcons
                name="file-chart"
                size={20}
                color="#fff"
              />
            </>
          )}
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3c72",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  incomeBg: {
    backgroundColor: "rgba(76, 217, 100, 0.2)",
  },
  expenseBg: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
  },
  netBg: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  tabText: {
    color: "#fff",
    fontWeight: "600",
  },
  chartContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  chartTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  legend: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
  },
  insightsContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  insightsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  insightItem: {
    marginBottom: 20,
  },
  insightLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  insightValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  insightValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  insightDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4cd964",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
