import React from "react";
import { View } from "react-native";

const BottomSheet = React.forwardRef(({ children }: any, ref: any) => (
  <View>{children}</View>
));

const BottomSheetView = ({ children }: any) => <View>{children}</View>;
const BottomSheetBackdrop = () => <View />;

export default BottomSheet;
export { BottomSheetView, BottomSheetBackdrop };
