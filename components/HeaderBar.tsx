import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  title: string;
  activeFilterCount?: number;
  back?: boolean;
};

export function HeaderBar({ title, back = false }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtn} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  backBtn: {
    width: 60,
  },
  backText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1D4ED8",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A2E",
  },
});
