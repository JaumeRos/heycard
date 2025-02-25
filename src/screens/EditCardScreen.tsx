import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { H2, P1 } from '../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from '../components/TextInput';
import { cardService, BusinessCard, SocialMediaLink, SocialMediaPlatform, generateSocialMediaUrl } from '../services/cardService';
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { AddContentModal } from '../components/AddContentModal';

type Props = NativeStackScreenProps<RootStackParamList, 'EditCard'>;

export const EditCardScreen = ({ route, navigation }: Props) => {
  const { cardId } = route.params;
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accreditations, setAccreditations] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addLogoToQR, setAddLogoToQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<Asset | null>(null);
  const [logoImage, setLogoImage] = useState<Asset | null>(null);
  const [isAddContentModalVisible, setIsAddContentModalVisible] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [_customLinks, setCustomLinks] = useState<{type: string, value: string}[]>([]);

  const loadCard = useCallback(async () => {
    try {
      setInitialLoading(true);
      const cards = await cardService.getUserCards();
      const foundCard = cards.find(c => c.id === cardId);
      
      if (!foundCard) {
        throw new Error('Card not found');
      }

      setCard(foundCard);
      // Split the name into first and last name
      const nameParts = foundCard.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setJobTitle(foundCard.title);
      setCompany(foundCard.company);
      setEmail(foundCard.email);
      setPhone(foundCard.phone);
      setBio(foundCard.bio || '');
      setSocialLinks(foundCard.socialMedia || []);
    } catch (err: any) {
      console.error('Error loading card:', err);
      setError(err.message || 'Failed to load card');
    } finally {
      setInitialLoading(false);
    }
  }, [cardId]);

  useEffect(() => {
    loadCard();
  }, [loadCard]);

  const handleSave = useCallback(async () => {
    if (!firstName || !lastName || !jobTitle || !company || !email) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const updatedCard = await cardService.updateCard(cardId, {
        name: `${firstName} ${lastName}`,
        title: jobTitle,
        company,
        email,
        phone,
        bio,
        socialMedia: socialLinks,
      });
      
      console.log('Card updated successfully:', updatedCard);
      navigation.goBack();
    } catch (err: any) {
      console.error('Error updating card:', err);
      setError(err.message || 'Failed to update card');
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, jobTitle, company, email, phone, bio, socialLinks, cardId, navigation]);

  const handleImagePick = useCallback(async (type: 'cover' | 'logo') => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7 as const,
      maxWidth: 1200,
      maxHeight: 1200,
    };

    Alert.alert(
      'Upload Image',
      'Choose image source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            try {
              const result = await launchCamera(options);
              if (result.assets && result.assets[0]) {
                if (type === 'cover') {
                  setCoverImage(result.assets[0]);
                } else {
                  setLogoImage(result.assets[0]);
                }
              }
            } catch (err) {
              console.error('Error taking photo:', err);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            try {
              const result = await launchImageLibrary(options);
              if (result.assets && result.assets[0]) {
                if (type === 'cover') {
                  setCoverImage(result.assets[0]);
                } else {
                  setLogoImage(result.assets[0]);
                }
              }
            } catch (err) {
              console.error('Error picking image:', err);
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  }, []);

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

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.container}>
        <P1 style={styles.error}>Card not found</P1>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {error ? <P1 style={styles.error}>{error}</P1> : null}

      {/* Card Images Section */}
      <View style={styles.section}>
        <H2 style={styles.sectionTitle}>Card Images</H2>
        <TouchableOpacity 
          style={[styles.coverImageContainer, coverImage && styles.coverImageWithPreview]}
          onPress={() => handleImagePick('cover')}
        >
          {coverImage ? (
            <View style={styles.coverImagePreview}>
              <Image 
                source={{ uri: coverImage.uri }} 
                style={styles.previewImage} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.changeImageButton}
                onPress={() => handleImagePick('cover')}
              >
                <Icon name="camera" size={24} color="#FFFFFF" />
                <P1 style={styles.changeImageText}>Change Image</P1>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.coverImage}>
              <Icon name="camera" size={24} color="#666666" />
              <P1 style={styles.uploadText}>Cover Image</P1>
            </View>
          )}
        </TouchableOpacity>
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
          <TouchableOpacity 
            style={styles.uploadLogo}
            onPress={() => handleImagePick('logo')}
          >
            {logoImage ? (
              <Image 
                source={{ uri: logoImage.uri }} 
                style={styles.logoPreview} 
                resizeMode="contain"
              />
            ) : (
              <>
                <Icon name="camera" size={24} color="#666666" />
                <P1 style={styles.uploadText}>Upload Logo</P1>
              </>
            )}
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
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    color: '#000000',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    padding: 16,
  },
  coverImageWithPreview: {
    padding: 0,
    overflow: 'hidden',
  },
  coverImagePreview: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  changeImageText: {
    color: '#FFFFFF',
    marginLeft: 8,
  },
  logoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
}); 