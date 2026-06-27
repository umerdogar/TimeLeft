import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilterIcon, SearchIcon } from "@/components/icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
};

export function SearchBar({ value, onChangeText, onFilterPress }: Props) {
  const hasValue = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputWrapper, hasValue && styles.inputWrapperActive]}
      >
        <SearchIcon
          size={18}
          strokeColor={hasValue ? "#1D4ED8" : "#8C8C9E"}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search by type, zone or city..."
          placeholderTextColor="#8C8C9E"
          clearButtonMode={Platform.OS === "ios" ? "while-editing" : "never"}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />

        {hasValue && Platform.OS !== "ios" && (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color="#8C8C9E" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
        onPress={onFilterPress}
      >
        <FilterIcon
          size={28}
          strokeColor={"#8C8C9E"}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 4,
    borderWidth: 1.5,
    backgroundColor: "#EBEBF0",

    borderColor: "#EBEBF0",
    width: "85%",
  },
  inputWrapperActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#1D4ED8",
  },
  searchIcon: {
    marginRight: 8,
  },
  filterIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1A1A2E",
    paddingVertical: 0,
  },
});
