import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Offer = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const packages: Offer[] = [
  { id: 'p1', name: 'Ultimate Gamer Pass', price: 1500, description: 'Unlimited gaming access for a full day.' },
  { id: 'p2', name: 'VIP Gaming Experience', price: 1500, description: 'Premium gaming experience with exclusive facilities.' },
  { id: 'p3', name: 'Esports Training Package', price: 1500, description: 'Improve competitive gaming skills with professional coaching.' },
  { id: 'p4', name: 'Birthday Party Package', price: 1500, description: 'Host a gaming-themed birthday celebration.' },
];

const experiences: Offer[] = [
  { id: 'e1', name: 'Virtual Reality Experience', price: 750, description: 'Explore immersive virtual reality games.' },
  { id: 'e2', name: 'Racing Simulator Challenge', price: 750, description: 'Race on professional driving simulators.' },
  { id: 'e3', name: 'Escape Room Challenge', price: 750, description: 'Solve puzzles and escape before time runs out.' },
];

function getDiscountPercent(count: number): number {
  if (count > 3) return 15;
  if (count === 3) return 10;
  if (count === 2) return 5;
  return 0;
}

type CardProps = {
  offer: Offer;
  selected: boolean;
  onPress: () => void;
};

function OfferCard({ offer, selected, onPress }: CardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.cardName}>{offer.name}</Text>
      <Text style={styles.cardDescription}>{offer.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>R{offer.price}</Text>
        <Text style={styles.cardAction}>{selected ? 'Selected ✓' : 'Tap to select'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleOffer = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const allOffers = [...packages, ...experiences];
  const selectedOffers = allOffers.filter((offer) => selectedIds.includes(offer.id));
  const subtotal = selectedOffers.reduce((sum, offer) => sum + offer.price, 0);
  const discountPercent = getDiscountPercent(selectedOffers.length);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>NEXT LEVEL</Text>
        <Text style={styles.subtitle}>Gaming & Esports Arena</Text>

        <Text style={styles.section}>Gaming Packages</Text>
        {packages.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            selected={selectedIds.includes(offer.id)}
            onPress={() => toggleOffer(offer.id)}
          />
        ))}

        <Text style={styles.section}>Individual Experiences</Text>
        {experiences.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            selected={selectedIds.includes(offer.id)}
            onPress={() => toggleOffer(offer.id)}
          />
        ))}

        <Text style={styles.section}>Your Quotation</Text>
        <View style={styles.quote}>
          {selectedOffers.length === 0 ? (
            <Text style={styles.quoteEmpty}>Select at least one offer to see your quotation.</Text>
          ) : (
            <>
              {selectedOffers.map((offer) => (
                <View key={offer.id} style={styles.quoteRow}>
                  <Text style={styles.quoteText}>{offer.name}</Text>
                  <Text style={styles.quoteText}>R{offer.price}</Text>
                </View>
              ))}
              <View style={styles.divider} />
              <View style={styles.quoteRow}>
                <Text style={styles.quoteText}>Bookings</Text>
                <Text style={styles.quoteText}>{selectedOffers.length}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteText}>Subtotal</Text>
                <Text style={styles.quoteText}>R{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteText}>Discount ({discountPercent}%)</Text>
                <Text style={styles.quoteText}>-R{discountAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.quoteRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>R{total.toFixed(2)}</Text>
              </View>
            </>
          )}
        </View>

        {selectedOffers.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setSelectedIds([])}>
            <Text style={styles.clearText}>Clear selection</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B1A' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#00F0FF', textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#FF2E97', textAlign: 'center', marginBottom: 24 },
  section: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginTop: 16, marginBottom: 12 },
  card: {
    backgroundColor: '#161630',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00F0FF',
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: { borderColor: '#FF2E97', borderWidth: 2, backgroundColor: '#24143A' },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  cardDescription: { fontSize: 14, color: '#B0B0C8', marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  cardPrice: { fontSize: 20, fontWeight: 'bold', color: '#FF2E97' },
  cardAction: { fontSize: 13, color: '#00F0FF' },
  quote: {
    backgroundColor: '#161630',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF2E97',
    padding: 16,
  },
  quoteEmpty: { color: '#B0B0C8', fontSize: 14 },
  quoteRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  quoteText: { color: '#FFFFFF', fontSize: 15, flexShrink: 1 },
  totalText: { color: '#00F0FF', fontSize: 20, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#3A3A5C', marginVertical: 8 },
  clearButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#00F0FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  clearText: { color: '#00F0FF', fontSize: 15 },
});