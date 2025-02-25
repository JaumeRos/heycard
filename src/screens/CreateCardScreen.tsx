import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { H2, P1 } from '../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from '../components/TextInput';
import { cardService, SocialMediaLink, SocialMediaPlatform, generateSocialMediaUrl } from '../services/cardService';
import { AddContentModal } from '../components/AddContentModal';

export function CreateCardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [addLogoToQR, setAddLogoToQR] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accreditations, setAccreditations] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAddContentModalVisible, setIsAddContentModalVisible] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [_customLinks, setCustomLinks] = useState<{type: string, value: string}[]>([]);

  const handleSave = useCallback(async () => {
    if (!firstName || !lastName || !jobTitle || !company || !email) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const card = await cardService.createCard({
        name: `${firstName} ${lastName}`,
        title: jobTitle,
        company,
        email,
        phone,
        bio,
        socialMedia: socialLinks,
      });
      
      console.log('Card created successfully:', card);
      navigation.goBack();
    } catch (err: any) {
      console.error('Error creating card:', err);
      if (err.code === 'firestore/unavailable') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to create card');
      }
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, jobTitle, company, email, phone, bio, socialLinks, navigation]);

  const handleAddContent = () => {
    setIsAddContentModalVisible(true);
  };

  const handleSelectContentOption = (type: string, value: string) => {
    // Handle social media platforms
    if (['twitter', 'linkedin', 'instagram', 'facebook', 'youtube', 'tiktok', 'github'].includes(type)) {
      setSocialLinks(prev => [...prev, {
        platform: type as SocialMediaPlatform,
        username: value,
        url: generateSocialMediaUrl(type as SocialMediaPlatform, value)
      }]);
    } 
    // Handle communication options
    else {
      setCustomLinks(prev => [...prev, { type, value }]);
      if (type === 'phone') setPhone(value);
      if (type === 'email') setEmail(value);
    }
    setIsAddContentModalVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <P1 style={styles.saveButton}>{loading ? 'Saving...' : 'Save'}</P1>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave, loading]);

  return (
    <ScrollView style={styles.container}>
      {error ? <P1 style={styles.error}>{error}</P1> : null}

      {/* Card Images Section */}
      <View style={styles.section}>
        <H2 style={styles.sectionTitle}>Card Images</H2>
        <View style={styles.coverImageContainer}>
          <TouchableOpacity style={styles.coverImage}>
            <Icon name="camera" size={24} color="#666666" />
            <P1 style={styles.uploadText}>Cover Image</P1>
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Section */}
      <View style={styles.section}>
        <H2 style={styles.sectionTitle}>Personal</H2>
        <View style={styles.nameRow}>
          <TextInput
            placeholder="First name"
            style={[styles.input, styles.halfInput]}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={[styles.input, styles.halfInput]}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <TextInput
          placeholder="Accreditations and pronouns"
          style={styles.input}
          leftIcon="account"
          value={accreditations}
          onChangeText={setAccreditations}
        />
        <TextInput
          placeholder="Job Title"
          style={styles.input}
          leftIcon="briefcase"
          value={jobTitle}
          onChangeText={setJobTitle}
        />
        <TextInput
          placeholder="Company"
          style={styles.input}
          leftIcon="chart-bar"
          value={company}
          onChangeText={setCompany}
        />
        <TextInput
          placeholder="Profile bio"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        />
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <H2 style={styles.sectionTitle}>Contact Information</H2>
        <View style={styles.contactItem}>
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            leftIcon="phone"
            rightIcon="close"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.contactItem}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            leftIcon="email"
            rightIcon="close"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddContent}
        >
          <Icon name="plus" size={20} color="#FFFFFF" />
          <P1 style={styles.addButtonText}>Add Content</P1>
        </TouchableOpacity>
      </View>

      {/* QR Code Section */}
      <View style={styles.section}>
        <H2 style={styles.sectionTitle}>QR Code</H2>
        <View style={styles.qrToggle}>
          <P1>Add Logo to QR Code</P1>
          <Switch
            value={addLogoToQR}
            onValueChange={setAddLogoToQR}
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>
        <View style={styles.qrContainer}>
          <TouchableOpacity style={styles.uploadLogo}>
            <Icon name="camera" size={24} color="#666666" />
            <P1 style={styles.uploadText}>Upload Logo</P1>
          </TouchableOpacity>
          <View style={styles.qrCode}>
            {/* QR Code will be rendered here */}
          </View>
        </View>
      </View>

      <AddContentModal
        visible={isAddContentModalVisible}
        onClose={() => setIsAddContentModalVisible(false)}
        onSelectOption={handleSelectContentOption}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  coverImageContainer: {
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  coverImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#666666',
    marginTop: 8,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  contactItem: {
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 24,
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
  },
  qrToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadLogo: {
    width: 100,
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: 100,
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  saveButton: {
    color: '#000000',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    padding: 16,
  },
}); 