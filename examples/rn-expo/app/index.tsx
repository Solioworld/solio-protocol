import React from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { erc20, ReadClient } from "@solio/core";
import { readClient } from "../constant";
import { type Address, formatUnits } from "viem";
export default function Index() {
  const [account, setAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const handleGetBalanceOf = async () => {
    const result = await erc20.read.getBalanceOf(readClient as ReadClient, {
      account: account as Address,
    });
    setAmount(formatUnits(result, 18));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          ...styles.item,
        }}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
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
