
import { Button, StyleSheet, View } from "react-native";
import {
  ChannelRepository,
  Client,
} from "@amityco/ts-sdk";
import AuthProvider from "./auth";


export default function App() {

  function queryChannel() {
    const unsubscribe = ChannelRepository.getChannels(
      {
        sortBy: "lastActivity",
        limit: 10,
        membership: "member",
        types: ['conversation']
      },
      (data) => {
        console.log('data:', data)
      }
    );
  }
  const startSync = async () => {
    const res = await Client.startUnreadSync();
    console.log('res:', res)

  };
  const stopSync = async () => {
    const res = await Client.stopUnreadSyncing();
    console.log("res: ", res);
  };

  return (
    <View style={styles.container}>
      <AuthProvider>
        <Button onPress={queryChannel} title="Query Channel" />
        <Button onPress={startSync} title="Start Sync" />
        <Button onPress={stopSync} title="Stop Sync" />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
