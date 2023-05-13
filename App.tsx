import React from 'react';
import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

function App(): JSX.Element {
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>
					Seoul
				</Text>
			</View>
			
			<ScrollView 
				horizontal 
				pagingEnabled 
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: 'tomato'
	},

	city: {
		flex: 1.2,
		justifyContent: 'center',
		alignItems: 'center'
	},

	cityName: {
		fontSize: 68,
		fontWeight: '500' 
	},

	weather: {
	},

	day: {
		width: windowWidth,
		alignItems: 'center',
	},

	temp: {
		marginTop: 50,
		fontSize: 148,
	},

	description: {
		marginTop: -30,
		fontSize: 40,
	}
})

export default App;