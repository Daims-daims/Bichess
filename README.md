# React TS + Node TS Project

To start run `yarn start` from `client` 

Double chess game one with white pieces, one with black pieces

## To-Do

### Mécanique de jeu
- En-passant (move et PGN Read)

### Visuel 
- Pièces prises
- Améliorer visuel partie remportée

### Serveur
- Communication partie (Ws)
- Créer partie
- Utilisateur

### Bug
- Roi ne peut pas se défendre en mangeant
qswsss

Serveur 
- Route to /game/:idGame
- create flow to create a room
- Create endpoint to "join game" which creates/return link to 2 websocket and game information (opponent / color)
- Create endpoint to "end game" where detects a player has lost and updates game info / sends them to front

### Game Room : 
- id
- 2 chess game
- 2 websocket id 

### chat 
- calculer pgn new coup and implement move with character chain only using player color 

