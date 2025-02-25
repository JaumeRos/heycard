import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export function TextInput({ 
  style, 
  error, 
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props 
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.container, error && styles.errorContainer, style]}>
      {leftIcon && (
        <Icon 
          name={leftIcon} 
          size={20} 
          color="#666666" 
          style={styles.leftIcon} 
        />
      )}
      <RNTextInput
        style={[
          styles.input,
          leftIcon && styles.inputWithLeftIcon,
          rightIcon && styles.inputWithRightIcon,
          {
            backgroundColor: isFocused ? colors.input.active : colors.input.inactive,
          },
          error && styles.error,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.grey}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Icon name={rightIcon} size={20} color="#666666" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000000',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  error: {
    borderColor: 'red',
  },
}); 