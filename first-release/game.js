export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.x
        const playerY = command.y

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.x
        const fruitY = command.y

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y > 0) {
                    player.y -= 1
                }
            },
            ArrowDown(player) {
                if (player.y < state.screen.height - 1) {
                    player.y += 1
                }
            },
            ArrowLeft(player) {
                if (player.x > 0) {
                    player.x -= 1
                }
            },
            ArrowRight(player) {
                if (player.x < state.screen.width - 1) {
                    player.x += 1
                }
            }
        }

        const player = state.players[command.playerId]
        const playerId = command.playerId
        const key = command.key
        const moveFunction = acceptedMoves[key]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            console.log(`Checking ${playerId} and ${fruitId}`)

            if (fruit.x === player.x && fruit.y === player.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
            }
        }
    }


    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}
