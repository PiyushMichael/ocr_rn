/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import {Colors} from 'react-native/Libraries/NewAppScreen';

let cameraRef;
const {width} = Dimensions.get('window');
const offset = (width * 1.5) / 16;

const App: () => Node = () => {
  const [textBlocks, setTextBlocks] = useState([]);
  const [modal, setModal] = useState(false);

  let text = '';
  textBlocks.forEach((block, i) => {
    text += block.value + '\n';
  });
  console.log(text);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <RNCamera
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // onGoogleVisionBarcodesDetected={({barcodes}) => {
        //   console.log(barcodes);
        // }}
        // onFacesDetected={faces => console.log(faces)}
        onTextRecognized={({textBlocks}) => setTextBlocks(textBlocks)}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setModal(true)} style={styles.capture}>
          <Text style={styles.scanText}> SCAN</Text>
        </TouchableOpacity>
      </View>
      {textBlocks.map((block, index) => (
        <View
          key={index.toString()}
          style={{
            position: 'absolute',
            left: block.bounds.origin.x + offset,
            top: block.bounds.origin.y,
            width: block.bounds.size.width,
            height: block.bounds.size.height,
            borderWidth: 2,
            borderColor:  'red',
          }}
        />
      ))}
      <Modal visible={modal} onRequestClose={() => setModal(false)} transparent>
        <View style={styles.backdrop}>
          <View style={styles.modalWindow}>
            <ScrollView>
              <Text>{text}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scanText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalWindow: {
    height: '70%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default App;
