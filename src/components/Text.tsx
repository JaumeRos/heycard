import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'p1' | 'input' | 'button';
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'p1', 
  style, 
  children, 
  ...props 
}) => {
  return (
    <RNText 
      style={[typography[variant], style]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

// Convenience components for specific variants
export const H1: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="h1" {...props} />
);

export const H2: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="h2" {...props} />
);

export const P1: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="p1" {...props} />
);

export const ButtonText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="button" {...props} />
);

export const InputText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="input" {...props} />
); 