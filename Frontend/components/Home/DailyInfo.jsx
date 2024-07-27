import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const DailyInfo = () => {
  const [dateInfo, setDateInfo] = useState({
    day: "",
    month: "",
    weekday: "",
  });
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "",
    condition: "",
  });

  useEffect(() => {
    // Tarih bilgisini almak için
    const today = new Date();
    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    setDateInfo({
      day: today.getDate(),
      month: months[today.getMonth()],
      weekday: days[today.getDay()],
      year: today.getFullYear(),
    });

    // Hava durumu bilgisini almak için
    const apiKey = "baad69bbb07b855c625780ef8b555fc5"; // OpenWeatherMap API keyinizi buraya ekleyin
    const city = "Istanbul"; // Örnek şehir

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        const weatherData = response.data;
        setWeatherInfo({
          temp: Math.round(weatherData.main.temp), // Sıcaklık değerini yuvarlama
          condition: weatherData.weather[0].main,
        });
      })
      .catch((error) => {
        console.error("Hava durumu verisi alınırken bir hata oluştu:", error);
      });
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return "weather-sunny";
      case "Clouds":
        return "weather-cloudy";
      case "Rain":
        return "weather-rainy";
      case "Snow":
        return "weather-snowy";
      case "Drizzle":
        return "weather-hail";
      case "Thunderstorm":
        return "weather-lightning";
      default:
        return "weather-cloudy";
    }
  };

  return (
    <View style={[general.row(""), { paddingBottom: 30 }]}>
      <View style={styles.box}>
        <MaterialCommunityIcons name="calendar-month" size={20} color="black" />
        <ReusableText
          text={`${dateInfo.day} ${dateInfo.month} ${dateInfo.weekday}`}
          family={"regular"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons
          name={getWeatherIcon(weatherInfo.condition)}
          size={20}
          color="black"
        />
        <ReusableText
          text={`${weatherInfo.temp} °C`}
          family={"regular"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </View>
    </View>
  );
};

export default DailyInfo;
