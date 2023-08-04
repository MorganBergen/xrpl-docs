export const serverInfo = async () => {
    const client = new Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    if (client.isConnected()){
        console.log("testing commit")
        clinet.disconnected;
    }
}
