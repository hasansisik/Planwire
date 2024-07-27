import { View, FlatList, Platform, StatusBar,SafeAreaView } from "react-native";
import React, { useState } from "react";
import styles from "./search.style";
import general from "../../components/general.style";
import { Searchbar } from "react-native-paper";
import { HeightSpacer, PlanCard } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import axios from "axios";
import { server } from "../../config";

const PlanSearch = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      let url = `${server}/search/plan/?`;

      if (searchKey) {
        url += `search=${searchKey}&`;
      }
      // Son karakter '&' ise kaldır
      if (url[url.length - 1] === "&") {
        url = url.slice(0, -1);
      }
      const response = await axios.get(url);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get products", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: COLORS.lightWhite,
        }}
      >
        <Searchbar
          style={styles.inputPlan}
          placeholder="Plan Ara..."
          onChangeText={(query) => {
            setSearchKey(query);
            if (!query) {
              setSearchResults([]);
            }
          }}
          value={searchKey}
          onSubmitEditing={handleSearch}
        />
        <HeightSpacer height={50} />
        {searchResults.length === 0 ? (
          ""
        ) : (
          <FlatList
            data={searchResults}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ rowGap: SIZES.medium }}
            renderItem={({ item }) => (
              <PlanCard item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlanSearch;
