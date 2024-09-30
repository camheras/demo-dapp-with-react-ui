import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"
import React, { useEffect, useState } from "react"
import { CreateJettonRequestDto } from "../../server/dto/create-jetton-request-dto"
import { TonProofDemoApi } from "../../TonProofDemoApi"
import { SimpleGrid, Box, Button, Text, VStack, HStack, Icon, useToast, Select } from "@chakra-ui/react"
import { FaGem, FaBomb } from "react-icons/fa"
import axios from "axios"
import fireGif from "../../assets/fire.gif"
import {
    isWalletInfoCurrentlyEmbedded,
    isWalletInfoInjectable,
    isWalletInfoCurrentlyInjected,
    isWalletInfoRemote,
    WalletInfo,
    TonConnect,
} from "@tonconnect/sdk"

interface GameData {
    gameId: string
    encryptedResult: string
}

interface Tile {
    id: number
    isSelected: boolean
    content: string | null
}

const gridSize = 5
const rewardMultipliers = [
    1.01, 1.03, 1.07, 1.13, 1.18, 1.24, 1.31, 1.39, 1.48, 1.58, 1.69, 1.82, 1.97, 2.15, 2.37, 2.63, 2.96, 3.39, 3.95,
    4.74, 5.93, 7.91, 11.87, 23.74,
]

export const GridGame = () => {
    const [gameData, setGameData] = useState<GameData | null>(null)
    const [grid, setGrid] = useState<Tile[]>([])
    const [gameOver, setGameOver] = useState(true)
    const [message, setMessage] = useState<string | null>(null)
    const [betAmount, setBetAmount] = useState(0)
    const [balance, setBalance] = useState(1000)
    const [diamondsFound, setDiamondsFound] = useState(0)

    // Initialize grid
    useEffect(() => {
        initGrid()

        // Create a new game when the component mounts
    }, [])

    const initGrid = () => {
        const initialGrid = Array.from({ length: gridSize * gridSize }, (_, id) => ({
            id,
            isSelected: false,
            content: null, // Content will be updated when a tile is selected
        }))
        setGrid(initialGrid)
    }

    const CreateGame = () => {
        const address = useTonAddress()
        const onclick = async () => {
            console.log(balance)
            console.log(betAmount)

            try {
                if (betAmount <= 0 || betAmount > balance) {
                    setMessage("Invalid bet amount")
                    return
                }
                const response = await axios.post("http://localhost:3000/create-game", {
                    userId: address,
                    betAmount,
                })
                console.log(response.data)
                initGrid()
                setGameData(response.data)
                setGameOver(false) // Reset game over status
                setMessage(null) // Reset message
                setBalance(response.data.balance) // Deduct bet amount from balance
            } catch (error) {
                console.error("Error creating game:", error)
            }
        }
        return <button onClick={onclick}>Start New Game</button>
    }

    const handleTileClick = async (tileId: number) => {
        if (gameOver || grid[tileId].isSelected) return

        try {
            const response = await axios.post("http://localhost:3000/select-tile", {
                gameId: gameData?.gameId,
                tileIndex: tileId,
            })
            if (!response.data.gameOver) {
                setGameOver(false)
            } else {
                setDiamondsFound(response.data.diamondsFound)
            }

            setMessage(response.data.message)
            // Update grid with the selected tile and content (💎 for diamond, 💣 for bomb)
            const updatedGrid = grid.map((tile) =>
                tile.id === tileId
                    ? { ...tile, isSelected: true, content: response.data.tileType === "diamond" ? "💎" : "💣" }
                    : tile
            )
            setGrid(updatedGrid)
        } catch (error) {
            console.error("Error selecting tile:", error)
        }
    }
    const claimReward = async () => {
        if (!gameData?.gameId) return

        try {
            const response = await axios.post("http://localhost:3000/claim-reward", {
                gameId: gameData.gameId,
            })

            setMessage(response.data.message)
            setBalance(response.data.balance)
            setGameData(null)
            setGameOver(true)
        } catch (error) {
            console.error("Error claiming reward:", error)
        }
    }

    const renderGrid = () => {
        return grid.map((tile) => (
            <div
                key={tile.id}
                className={`tile ${tile.isSelected ? "selected" : ""}`}
                onClick={() => handleTileClick(tile.id)}
            >
                {tile.isSelected ? tile.content : ""}
            </div>
        ))
    }

    if (useTonAddress())
        return (
            <Box bg="#0E1621" minH="100vh" p={5}>
                {" "}
                <div className="grid">{renderGrid()}</div>
                <p>Current Balance: {balance}</p>
                {message && <p>{message}</p>}
                {gameOver ? (
                    <>
                        <input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(parseFloat(e.currentTarget.value))}
                            placeholder="Bet Amount"
                        />
                        <CreateGame />
                    </>
                ) : (
                    <>
                        <button onClick={claimReward}>Claim</button>
                    </>
                )}
            </Box>
        )
}
