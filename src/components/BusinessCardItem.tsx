import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BusinessCard } from '../services/cardService';
import { H2, P1 } from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BusinessCardItemProps {
  card: BusinessCard;
  onEdit: () => void;
  onShowQR: () => void;
}

const DEFAULT_COVER = 'https://via.placeholder.com/800x400/FF5733/FFFFFF?text=Cover';
const DEFAULT_PROFILE = 'https://via.placeholder.com/100?text=Profile';

export function BusinessCardItem({ card, onEdit, onShowQR }: BusinessCardItemProps) {
  // Generate a unique QR code value for the card
  const qrValue = JSON.stringify({
    id: card.id,
    name: card.name,
    title: card.title,
    company: card.company,
    phone: card.phone,
    email: card.email,
    socialMedia: card.socialMedia,
  });

  console.log('Card bio in BusinessCardItem:', card.bio);

  return (
    <View style={styles.card}>
      {/* Cover Image */}
      <View style={styles.coverContainer}>
        <Image 
          source={{ uri: card.coverImage || DEFAULT_COVER }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <P1 style={styles.editButtonText}>Edit</P1>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: card.profileImage || DEFAULT_PROFILE }} 
          style={styles.profileImage}
        />
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={80}
            logo={{ uri: card.companyLogo }}
            logoSize={24}
            logoBackgroundColor='white'
          />
        </View>
      </View>

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <H2 style={styles.name}>{card.name}</H2>
        <P1 style={styles.title}>{card.title}</P1>
        <P1 style={styles.company}>{card.company}</P1>
        
        {card.bio && (
          <P1 style={styles.bio}>{card.bio}</P1>
        )}

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          {card.phone && (
            <View style={styles.contactRow}>
              <Icon name="phone" size={20} color="#666666" />
              <P1 style={styles.contactText}>{card.phone}</P1>
            </View>
          )}
          {card.email && (
            <View style={styles.contactRow}>
              <Icon name="email" size={20} color="#666666" />
              <P1 style={styles.contactText}>{card.email}</P1>
            </View>
          )}
          {card.socialMedia?.map((link, index) => (
            <View key={index} style={styles.contactRow}>
              <Icon name={link.platform.toLowerCase()} size={20} color="#666666" />
              <P1 style={styles.contactText}>@{link.username}</P1>
            </View>
          ))}
        </View>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={onShowQR}>
        <Icon name="share-variant" size={20} color="#FFFFFF" />
        <P1 style={styles.shareButtonText}>Share Card</P1>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coverContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#F3F4F6',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -40,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardDetails: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 2,
  },
  company: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  contactInfo: {
    marginTop: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 12,
    color: '#666666',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    margin: 16,
    padding: 16,
    borderRadius: 24,
  },
  shareButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
    padding: 8,
  },
});


