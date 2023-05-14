import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	PermissionsAndroid,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { WEATHER_API_KEY } from '@env';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';


StatusBar.setBarStyle('light-content');

const windowWidth = Dimensions.get('window').width;
const icons = {
	Clouds: "cloudy",
	Clear: "day-sunny",
	Atmosphere: "cloudy-gusts",
	Snow: "snow",
	Rain: "rains",
	Drizzle: "rain",
	Thunderstorm: "lightning",
};

interface Location {
	latitude: string, 
	longitude: string
}

function App(): JSX.Element {
	const [location, setLocation] = useState<Location | {}>({});
	const [city, setCity] = useState<string>('Loading...');
	const [days, setDays] = useState<[]>([]);

	const getCurrentPosition = () => {
		Geolocation.requestAuthorization('whenInUse');

		Geolocation.getCurrentPosition(
			(position) => {
				const {coords: {latitude, longitude}} = position;
				setLocation({latitude, longitude});
			},
			(error) => {
				// See error code charts below.
				console.log(error.code, error.message);
			},

			{ 
				enableHighAccuracy: true, 
				timeout: 15000, 
				maximumAge: 10000 
			}
		);
	}

	const getWeather = async () => {
		try {
			const response = await axios.get(
				'https://api.openweathermap.org/data/2.5/forecast',
				{
					params: {
						lat: location.latitude,
						lon: location.longitude,
						appid: WEATHER_API_KEY,
						exclude: 'alert',
						units: 'metric',
					}
				}
			);

			setCity(response.data.city.name);
			setDays(
				response.data.list.filter((weather) => {
					if (weather.dt_txt.includes('00:00:00')) {
						return weather
					}
				})
			);
		} catch(error) {
			console.log(error.response);
		}
	}

	useEffect(() => {
		const checkPermissin = async () => {
			if (Platform.OS === 'ios') {
				getCurrentPosition();
			} else {
				try {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
						{
							title: 'Device current location permission',
							message: 'Allow app to get your current location',
							buttonNeutral: 'Ask Me Later',
							buttonNegative: 'Cancel',
							buttonPositive: 'OK',
						},
					);

					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						getCurrentPosition();
					} else {
					  	console.log('Location permission denied');
					}
				} catch (err) {
					console.warn(err);
				}
			}
		};

		checkPermissin();
		getWeather();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.city}>
				<Text style={styles.cityName}>
					{city}
				</Text>
			</View>
			
			<ScrollView 
				horizontal 
				pagingEnabled 
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.weather}
			>
				{
					days.length === 0 ? 
					(
						<View 
							style={{ 
								...styles.day, 
								alignItems: 'center',
							}}
						>
							<ActivityIndicator
								style={{'marginTop': 10}} 
								color='white'
								size='large'
							/>
						</View> 
					) :
					(
						days.map((day, idx) => 
							<View
								key={idx} 
								style={styles.day}
							>
								<View 
									style={{
										width: '100%',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between'
									}}
								>
									<Text style={styles.temp}>
										{parseFloat(day.main.temp).toFixed(1)}
									</Text>
									<Icon 
										name={icons[day.weather[0].main]} 
										size={68} 
										color='white' 
									/>
								</View>
								
								<Text style={styles.description}>
									{day.weather[0].main}
								</Text>
								<Text style={styles.tinyText}>
									{day.weather[0].description}
								</Text>
							</View>
						)
					)
				}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'tomato',
	},

	city: {
		flex: 1.2,
		justifyContent: 'center',
		alignItems: 'center',
	},

	cityName: {
		fontSize: 58,
		fontWeight: '500',
		color: 'white',
	},

	weather: {},

	day: {
		width: windowWidth,
		alignItems: 'flex-start',
		paddingHorizontal: 20,
	},

	temp: {
		marginTop: 50,
		fontWeight: '600',
		fontSize: 100,
		color: 'white',
	},

	description: {
		marginTop: -10,
		fontSize: 30,
		color: 'white',
		fontWeight: '500',
	},
	
	tinyText: {
		fontSize: 25,
		color: 'white',
		fontWeight: '500',
	},
})

export default App;