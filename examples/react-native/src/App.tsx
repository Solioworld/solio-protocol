import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {erc20, ReadClient} from '@solio/core';
import {readClient} from './constant';
import {Address, formatUnits} from 'viem';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [account, setAccount] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const handleGetBalanceOf = async () => {
    const result = await erc20.read.getBalanceOf(readClient as ReadClient, {
      account: account as Address,
    });
    setAmount(formatUnits(result, 18));
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            ...styles.item,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.labelTitle}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAccount}
            value={account}
            placeholder="0x..."
          />
          <Button onPress={handleGetBalanceOf} title="Get Balance Of" />
          <Text>Balance: {amount}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
  labelTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
