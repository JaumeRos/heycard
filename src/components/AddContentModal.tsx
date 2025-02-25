import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H2, P1 } from './Text';
import { TextInput } from './TextInput';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (type: string, value: string) => void;
};

type Option = {
  id: string;
  title: string;
  icon: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'url' | 'phone-pad';
};

export function AddContentModal({ visible, onClose, onSelectOption }: Props) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState('');

  const communicationOptions: Option[] = [
    { 
      id: 'custom-link', 
      title: 'Custom Link', 
      icon: 'link-variant',
      placeholder: 'Enter URL (e.g., https://yourwebsite.com)',
      keyboardType: 'url',
    },
    { 
      id: 'phone', 
      title: 'Phone Number', 
      icon: 'phone',
      placeholder: 'Enter phone number',
      keyboardType: 'phone-pad',
    },
    { 
      id: 'email', 
      title: 'Email', 
      icon: 'email',
      placeholder: 'Enter email address',
      keyboardType: 'email-address',
    },
    { 
      id: 'address', 
      title: 'Address', 
      icon: 'map-marker',
      placeholder: 'Enter address',
    },
  ];

  const socialPlatforms: Option[] = [
    { id: 'twitter', title: 'X', icon: 'twitter', placeholder: 'Enter X username' },
    { id: 'linkedin', title: 'LinkedIn', icon: 'linkedin', placeholder: 'Enter LinkedIn profile URL', keyboardType: 'url' },
    { id: 'instagram', title: 'Instagram', icon: 'instagram', placeholder: 'Enter Instagram username' },
    { id: 'facebook', title: 'Facebook', icon: 'facebook', placeholder: 'Enter Facebook profile URL', keyboardType: 'url' },
    { id: 'youtube', title: 'YouTube', icon: 'youtube', placeholder: 'Enter YouTube channel URL', keyboardType: 'url' },
    { id: 'tiktok', title: 'TikTok', icon: 'music-note', placeholder: 'Enter TikTok username' },
    { id: 'github', title: 'GitHub', icon: 'github', placeholder: 'Enter GitHub username' },
    { id: 'dribbble', title: 'Dribbble', icon: 'dribbble', placeholder: 'Enter Dribbble username' },
    { id: 'behance', title: 'Behance', icon: 'behance', placeholder: 'Enter Behance username' },
    { id: 'medium', title: 'Medium', icon: 'medium', placeholder: 'Enter Medium username or URL' },
    { id: 'pinterest', title: 'Pinterest', icon: 'pinterest', placeholder: 'Enter Pinterest username' },
    { id: 'snapchat', title: 'Snapchat', icon: 'snapchat', placeholder: 'Enter Snapchat username' },
    { id: 'whatsapp', title: 'WhatsApp', icon: 'whatsapp', placeholder: 'Enter WhatsApp number', keyboardType: 'phone-pad' },
    { id: 'telegram', title: 'Telegram', icon: 'telegram', placeholder: 'Enter Telegram username' },
    { id: 'discord', title: 'Discord', icon: 'discord', placeholder: 'Enter Discord username' },
    { id: 'twitch', title: 'Twitch', icon: 'twitch', placeholder: 'Enter Twitch username' },
    { id: 'reddit', title: 'Reddit', icon: 'reddit', placeholder: 'Enter Reddit username' },
    { id: 'spotify', title: 'Spotify', icon: 'spotify', placeholder: 'Enter Spotify profile URL', keyboardType: 'url' },
    { id: 'soundcloud', title: 'SoundCloud', icon: 'soundcloud', placeholder: 'Enter SoundCloud URL', keyboardType: 'url' },
    { id: 'vimeo', title: 'Vimeo', icon: 'vimeo', placeholder: 'Enter Vimeo username' },
  ];

  const handleOptionSelect = (option: Option) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
      setInputValue('');
    } else {
      setSelectedOption(option);
      setInputValue('');
    }
  };

  const handleAdd = () => {
    if (selectedOption && inputValue.trim()) {
      onSelectOption(selectedOption.id, inputValue.trim());
      setSelectedOption(null);
      setInputValue('');
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setInputValue('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <P1>Done</P1>
          </TouchableOpacity>
          <H2>Add Content</H2>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <H2 style={styles.sectionTitle}>Communication</H2>
            {communicationOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  selectedOption?.id === option.id && styles.selectedOption
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Icon name={option.icon} size={24} color="#000000" />
                <P1 style={styles.optionText}>{option.title}</P1>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <H2 style={styles.sectionTitle}>Social Links</H2>
            {socialPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[
                  styles.option,
                  selectedOption?.id === platform.id && styles.selectedOption
                ]}
                onPress={() => handleOptionSelect(platform)}
              >
                <Icon name={platform.icon} size={24} color="#000000" />
                <P1 style={styles.optionText}>{platform.title}</P1>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {selectedOption && (
          <View style={styles.bottomInputContainer}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={selectedOption.placeholder}
              keyboardType={selectedOption.keyboardType || 'default'}
              leftIcon={selectedOption.icon}
              rightIcon="close"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
              style={styles.input}
            />
            <TouchableOpacity
              style={[styles.doneButton, !inputValue.trim() && styles.disabledButton]}
              onPress={handleAdd}
              disabled={!inputValue.trim()}
            >
              <P1 style={styles.doneButtonText}>Add</P1>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#E5E7EB',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  bottomInputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginBottom: 16,
  },
  doneButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#666666',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 