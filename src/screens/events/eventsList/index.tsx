import {
  RefreshControl,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { useEvents, useEventFilters } from "@/src/hooks";
import { Event } from "@appTypes";
import {
  EventCard,
  FilterBar,
  HeaderBar,
  SearchBar,
  StatsBar,
} from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useCallback, useEffect } from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { styles } from "./styles";

export default function EventsScreen() {
  const { data, isLoading, isError, isFetching, refetch } = useEvents();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const flashListRef = useRef<FlashListRef<Event>>(null);

  const {
    filters,
    sort,
    filteredEvents,
    availableCities,
    availableTypes,
    toggleStatus,
    toggleCity,
    toggleType,
    changeSort,
    resetFilters,
    hasActiveFilters,
    searchQuery,
    setSearchQuery,
  } = useEventFilters(data, () => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: false });
  });

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.8}
      />
    ),
    [],
  );

  const handleEventPress = (event: Event) => {
    console.log("pressed", event.id);
  };

  const openFilters = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeFilters = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  if (isLoading) return <View style={{ flex: 1 }} />;
  if (isError) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <HeaderBar title="Events" />

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={openFilters}
          />

          <StatsBar events={data ?? []} />

          <FlashList
            ref={flashListRef}
            key={filteredEvents.length}
            data={filteredEvents}
            testID="events-list"
            keyExtractor={(item) => item.id}
            // estimatedItemSize={130}
            renderItem={({ item }) => (
              <EventCard event={item} onPress={handleEventPress} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !isLoading}
                onRefresh={refetch}
                tintColor="#FF6B6B"
              />
            }
          />
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["58%"]}
            enablePanDownToClose
            onClose={closeFilters}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView style={styles.sheetContent}>
              <FilterBar
                selectedStatuses={filters.statuses}
                selectedCities={filters.cities}
                selectedTypes={filters.types}
                cities={availableCities}
                types={availableTypes}
                onStatusToggle={toggleStatus}
                onCityToggle={toggleCity}
                onTypeToggle={toggleType}
                sort={sort} // ← add
                onSortChange={changeSort} // ← add
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
                filteredCount={filteredEvents.length}
                onClose={closeFilters}
              />
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
