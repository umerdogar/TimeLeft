// src/styles/splashStyles.ts
import { Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get('window');



export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.palette.coral,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      },
      logoContainer: {
        alignItems: 'center',
        gap: 16,
      },
      logoCircle: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: width * 0.14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoEmoji: {
        fontSize: width * 0.12,
      },
      appName: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 1,
      },
      tagline: {
        position: 'absolute',
        bottom: 80,
        fontSize: 15,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: 0.5,
      },
    
});
