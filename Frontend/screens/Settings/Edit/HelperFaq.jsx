import { View, Text, SafeAreaView, Platform, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { AppBar, HeightSpacer } from '../../../components';
import general from "../../../components/general.style";
import { COLORS, SIZES } from '../../../constants/theme';
import { List } from 'react-native-paper';
import styles from '../settings.style.js';

const HelperFaq = ({ navigation }) => {
  const faqs = [
    {
      question: "Sürücü kursuna kayıt için hangi belgelere ihtiyacım var?",
      answer:
        "Kimlik belgesi, sağlık raporu ve 2 adet vesikalık fotoğraf genellikle gereklidir.",
    },
    {
      question: "Sürücü kursu ücretleri ne kadar?",
      answer:
        "Ücretler, kursun süresine, içeriğine ve bulunduğunuz şehre göre değişebilir.",
    },
    {
      question: "Kursun süresi ne kadar?",
      answer:
        "Sürücü kurslarının süresi genellikle 1 ila 3 ay arasında değişebilir.",
    },
    {
      question: "Kurs içeriği neleri kapsar?",
      answer:
        "Kurslar, teorik dersler, direksiyon eğitimleri, trafik kuralları, ilk yardım gibi konuları içerir.",
    },
    {
      question: "Kurs sonunda hangi belgeleri alırım?",
      answer:
        "Kursu tamamlayanlar sürücü belgesi ve kurs bitirme belgesi alırlar.",
    },
    {
      question: "Kurs ücretini nasıl ödeyebilirim?",
      answer:
        "Kurs ücretini nakit, kredi kartı veya banka havalesi gibi yöntemlerle ödeyebilirsiniz.",
    },
    
  ];

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      {/* Header */}
      <View style={general.page}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          title={"Sıkça Sorulan Sorular"}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={75} />
        <FlatList
          style={{ height: SIZES.height / 2.5 }}
          data={faqs}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <List.Accordion
              titleNumberOfLines={null}
              titleEllipsizeMode="tail"
              rippleColor="transparent"
              theme={{ colors: { primary: "black" } }}
              titleStyle={{ fontFamily: "medium", fontSize: SIZES.small }}
              title={item.question}
              style={styles.listItem}
            >
              <List.Item
                titleNumberOfLines={null}
                titleEllipsizeMode="tail"
                title={item.answer}
                style={styles.listItem}
              />
            </List.Accordion>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HelperFaq