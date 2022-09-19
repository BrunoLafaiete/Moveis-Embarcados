import * as React from 'react';
import { Text, View, StyleSheet, Button, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
 
export default class ContactDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Dados do Contato',
  };
 
  constructor(props) {
    super(props);
    let course = props.navigation.getParam('courses');
    this.state = {
      id: course.codigo,
      name: course.name,
      email: course.email_coordenador,
      telefone: course.telefone_contato,
      lat: course.mapa.lat,
      lng: course.mapa.lng,
      campus: course.campus,
      turno: course.turno,
      video: course.video,
      carga_horaria: course.carga_horaria,
      coordenador: course.nome_coordenador,
      site: course.website,
      fotos: course.fotos,
      coursesFav: ''
    };
    AsyncStorage.getItem('guiaCursosUfsc_fav').then(
      value =>
        this.setState({ coursesFav: value })
    );
    saveCourseFunction = () => {
      data = this.state.id + "," + this.state.coursesFav;
      alert(data)
      AsyncStorage.setItem('guiaCursosUfsc_fav', data);
      alert("curso salvo");
    };
  }
  
  

  

  render() {
    const { navigate } = this.props.navigation;
    const { name, email, telefone, lat, lng, campus, turno, video, carga_horaria, coordenador, site, fotos} = this.state;
    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${lat},${lng}` ,
      android: `geo:0,0?q=${lat},${lng}`
    });
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.contactName}>{name}</Text>
          <Text>O curso {name} é lecionado no periodo {turno} do campus {campus}, sua carga horaria é {carga_horaria}</Text>
          <Text style={styles.contactDetails}>coordenador: {coordenador}</Text>
          <Text style={styles.contactDetails}>E-mail: {email}</Text>
          <Text style={styles.contactDetails}>Site: {site}</Text>
          <Text style={styles.contactDetails}>Telefone: {telefone}</Text>
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`mailto:${email}`) }
            title="Enviar E-mail" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`tel:${telefone}`) }
            title="Ligar" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${mapUrl}`) }
            title="Encontrar Localização" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${site}`) }
            title="Visitar Website" />
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${video}`) }
            title="Ver videos do curso" />
        </View>
        <View style={styles.button} >
          <Button title="Voltar" onPress={() => navigate('CoursesList')} />
        </View>
        <View style={styles.button} >
          <Button title="Favoritar" onPress={saveCourseFunction} />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  contactDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15
  }
});