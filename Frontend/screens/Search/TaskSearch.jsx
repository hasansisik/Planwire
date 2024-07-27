import { View, FlatList, Platform, StatusBar,SafeAreaView } from "react-native";
import React, { useState } from "react";
import styles from "./search.style";
import { Searchbar } from "react-native-paper";
import { HeightSpacer, TaskCard } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import general from "../../components/general.style";
import ModalSearch from "../../components/Modals/ModalSearch";
import axios from "axios";
import { server } from "../../config";

const TaskSearch = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async () => {
    try {
      let url = `${server}/search/task/?`;

      if (searchKey) {
        url += `search=${searchKey}&`;
      }
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
        <View style={general.row("space-between")}>
          <Searchbar
            style={styles.inputPlan}
            placeholder="Görev Ara..."
            onChangeText={(query) => {
              setSearchKey(query);
              if (!query) {
                setSearchResults([]);
              }
            }}
            value={searchKey}
            onSubmitEditing={handleSearch}
          />
          {/* <TouchableOpacity
            style={styles.filter}
            onPress={() => setShowFilters(!showFilters)}
          >
            <FontAwesome5 name="filter" size={17} color={COLORS.lightBlack} />
            <ReusableText
              text={"FİLTRELE"}
              family={"regular"}
              size={TEXT.xSmall}
              color={COLORS.lightBlack}
            />
          </TouchableOpacity> */}
        </View>
        <HeightSpacer height={50} />
        {searchResults.length === 0 ? (
          ""
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ rowGap: SIZES.medium }}
            renderItem={({ item }) => (
              <TaskCard item={item} navigation={navigation} />
            )}
          />
        )}
        <ModalSearch
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearch;
