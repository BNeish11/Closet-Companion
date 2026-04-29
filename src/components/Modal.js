import React from 'react';
import { Modal as RNModal, View, StyleSheet } from 'react-native';
import spacing from '../styles/spacing';
import colors from '../styles/colors';
import shadows from '../styles/shadows';

export default function Modal({ visible, onRequestClose, children }) {
  return (
    <RNModal visible={visible} animationType="slide" transparent onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, shadows.medium]}>{children}</View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.cardBg, padding: spacing.lg, borderTopLeftRadius: 12, borderTopRightRadius: 12 }
});
