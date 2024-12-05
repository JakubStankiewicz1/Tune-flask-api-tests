import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { RadialGradient } from 'react-native-gradients-2';


export default function Index() {
  
  return (

    <View style={styles.container}>
      <View style={styles.GradientBG}>
        <RadialGradient x="0%" y="50%" rx="272px" ry="272px" colorList={colorList1}/>
      </View>
      <View style={styles.GradientBG}>
        <RadialGradient x="100%" y="100%" rx="272px" ry="272px" colorList={colorList1}/>
      </View>
      <View style={styles.GradientBG}>
        <RadialGradient x="100%" y="0%" rx="272px" ry="272px" colorList={colorList2}/>
      </View>
      <View style={styles.ImageContainer}>
        <Image source={require('../../assets/images/headphones.png')} style={styles.splash}/>
      </View>
      <View style={styles.HeaderContainer}>
        <Text style={{fontFamily: 'Outfit_400Regular', color: '#fff', fontSize: 32, lineHeight: 32}}>
          Getting Started 
        </Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Link href="/login" asChild>
          <Pressable style={styles.button}>
            <Text style={{fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 16}}>
              Let's Start 
            </Text>
            <Image source={require('../../assets/images/Letsstart.png')} style={styles.buttonIcon} />
          </Pressable>
        </Link>
      </View>
      <View style={styles.FooterContainer}>
          <Text style={{fontFamily: 'Outfit_700Bold', color: '#fff', fontSize: 15}}>
            Tune 
          </Text>
          <Text style={{fontFamily: 'Outfit_400Regular', color: '#fff', fontSize: 10, top: '30%'}}>
            Music App 
          </Text>
      </View>
      
    </View>

  )};

const colorList1 = [
  {offset: '0%', color: '#C10EED', opacity: '0.4'},
  {offset: '100%', color: '#101224', opacity: '0.2'},
]
const colorList2 = [
  {offset: '0%', color: '#34BDEB', opacity: '0.2'},
  {offset: '100%', color: '#101224', opacity: '0.2'},
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101224',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImageContainer: {
    position: 'absolute',
    top: '14%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  HeaderContainer: {
    position: 'absolute',
    top: '45%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonContainer: {
    position: 'absolute',
    top: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  FooterContainer: {
    position: 'absolute',
    top: '92%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  GradientBG : {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  splash: {
    width: 297,
    height: 223,
  },
  button: {
    borderRadius: 27,
    width: 200,
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#C10EED' 
  },
  buttonIcon: {
    width: 33,
    height: 33,
    left: 15,
  },
});