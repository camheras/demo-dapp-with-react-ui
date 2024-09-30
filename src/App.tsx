import "./App.scss"
import { isWalletInfoCurrentlyInjected, THEME, TonConnectUIProvider, useTonAddress } from "@tonconnect/ui-react"
import { Header } from "./components/Header/Header"
import { TxForm } from "./components/TxForm/TxForm"
import { Footer } from "./components/Footer/Footer"
import { TonProofDemo } from "./components/TonProofDemo/TonProofDemo"
import { CreateJettonDemo } from "./components/CreateJettonDemo/CreateJettonDemo"
import { GridGame } from "./components/GridGame/GridGame"
import { useEffect } from "react"

function App() {
    useEffect(() => {}, [])
    return (
        <TonConnectUIProvider
            manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
            uiPreferences={{ theme: THEME.DARK }}
            walletsListConfiguration={{
                includeWallets: [
                    {
                        appName: "tonwallet",
                        name: "TON Wallet",
                        imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                        aboutUrl:
                            "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                        universalLink: "https://wallet.ton.org/ton-connect",
                        jsBridgeKey: "tonwallet",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["chrome", "android"],
                    },
                    {
                        appName: "nicegramWallet",
                        name: "Nicegram Wallet",
                        imageUrl: "https://static.nicegram.app/icon.png",
                        aboutUrl: "https://nicegram.app",
                        universalLink: "https://nicegram.app/tc",
                        deepLink: "nicegram-tc://",
                        jsBridgeKey: "nicegramWallet",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["ios", "android"],
                    },
                    {
                        appName: "fintopio-tg",
                        name: "Fintopio Telegram",
                        imageUrl: "https://fintopio.com/tonconnect-icon.png",
                        aboutUrl: "https://fintopio.com",
                        universalLink: "https://t.me/fintopio?attach=wallet",
                        bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
                        platforms: ["ios", "android", "macos", "windows", "linux"],
                    },
                    {
                        appName: "tokenpocket",
                        name: "TokenPocket",
                        imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
                        aboutUrl: "https://tokenpocket.pro",
                        jsBridgeKey: "tokenpocket",
                        platforms: ["ios", "android"],
                    },
                    {
                        appName: "dewallet",
                        name: "DeWallet",
                        imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
                        aboutUrl: "https://delabwallet.com",
                        universalLink: "https://t.me/dewallet?attach=wallet",
                        bridgeUrl: "https://bridge.dewallet.pro/bridge",
                        platforms: ["ios", "android", "macos", "windows", "linux"],
                    },
                    {
                        appName: "BitgetWeb3",
                        name: "BitgetWeb3",
                        imageUrl: "https://img.bitgetimg.com/image/third/1723701408284.png",
                        aboutUrl: "https://www.bitget.com",
                        universalLink: "https://t.me/BitgetOfficialBot?attach=wallet",
                        bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
                        platforms: ["ios", "android", "windows", "macos", "linux"],
                    },
                    {
                        appName: "cdcTonWallet",
                        name: "Crypto.com DeFi Wallet",
                        imageUrl: "https://apro-ncw-api-file.crypto.com/wallet/logo",
                        aboutUrl: "https://crypto.com/defi-wallet",
                        universalLink: "https://wallet.crypto.com/deeplink/ton-connect",
                        deepLink: "dfw://",
                        jsBridgeKey: "cdcTonWallet",
                        bridgeUrl: "https://wallet.crypto.com/sse/tonbridge",
                        platforms: ["ios", "android", "chrome"],
                    },
                    {
                        appName: "tobi",
                        name: "Tobi",
                        imageUrl: "https://app.tobiwallet.app/icons/logo.png",
                        aboutUrl: "https://tobi.fun",
                        universalLink: "https://t.me/TobiWalletBot?attach=wallet",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["ios", "android", "macos", "windows", "linux"],
                    },
                ],
            }}
            actionsConfiguration={{
                twaReturnUrl: "https://t.me/DemoDappWithTonConnectBot/demo",
            }}
        >
            <div className="app">
                <Header />
                <GridGame />
                <Footer />
            </div>
        </TonConnectUIProvider>
    )
}

export default App
