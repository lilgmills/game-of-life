const GameOfLife = class {
    constructor(numCols, numRows) {
        this.height= numRows;
        this.width = numCols;
        this.GameCellArray = []
        this.initializeCellArray();
        this.DrawGameBoard();

        setInterval(this.runGame.bind(this), 5000);
        
        
    }

    

    initializeCellArray = () => {
        for (let j = 0; j<this.height; j++) {
            this.GameCellArray.push([]);
            for (let i = 0; i<this.width; i++) {
                this.GameCellArray[j].push(new GameCell(i, j, Math.floor(Math.random()*2) == 0?true:false));
            }

        }

    }


    hookup(cell, x, y) {
        cell.aliveVector = [];
        const getAliveSafe = (xVal, yVal) => { 
            try {
                return this.GameCellArray[yVal][xVal].alive;
                
            } catch (e) {
                return false;
            }
        }

        cell.above = getAliveSafe(x,y-1);
        cell.below = getAliveSafe(x,y+1); 
        cell.left = getAliveSafe(x-1, y);
        cell.right = getAliveSafe(x+1, y);
        cell.topLeft = getAliveSafe(x-1,y-1);
        cell.belowLeft = getAliveSafe(x-1, y+1);
        cell.topRight = getAliveSafe(x+1, y-1);
        cell.belowRight = getAliveSafe(x+1, y+1);

        cell.aliveVector = [
            cell.above,
            cell.below,
            cell.right,
            cell.left,
            cell.topRight,
            cell.topLeft,
            cell.belowLeft,
            cell.belowRight,
        ]

    }

    DrawGameBoard() {
        
        gameContainer.innerHTML = "";
        this.GameCellArray.forEach(
            (row, j) => {
                const newRow = document.createElement('tr')
                newRow.setAttribute("class", "board-row")
                row.forEach((cell, i) => {
                    const newCell = document.createElement('td');
                    newCell.setAttribute('class', 'game-cell');
                    if(this.GameCellArray[j][i].alive) {
                        newCell.classList.add("alive")
                        
                        newCell.classList.remove("dead")
                        
                    }
                    else {
                        newCell.classList.add("dead")
                        
                        newCell.classList.remove("alive")
                    }

                    newRow.appendChild(newCell)
                })

                gameContainer.appendChild(newRow);

            }
        )
    }

    reDrawGameBoard() {
        this.GameCellArray.forEach(
            (row, j) => {
                const rowElement = document.querySelectorAll(`tr`)[j]
                row.forEach((cell, i) => {
                    const cellElement = rowElement.querySelectorAll(`td`)[i]
                    if (cell.alive) {
                        cellElement.classList.add("alive");
                        cellElement.classList.remove("dead");
                    }
                    else {
                        cellElement.classList.remove("alive");
                        cellElement.classList.add("dead");
                        

                    }
                })
            }) 

    }
    runGame() {
        this.GameCellArray.forEach((row, j)=>row.forEach((cell, i)=> this.hookup(cell, i, j)))
        this.GameCellArray.forEach((row, j)=>{row.forEach((cell, i)=> {cell.decideAlive()})})
        this.reDrawGameBoard()
    }


}

const GameCell = class {
    constructor(x, y, alive) {
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.aliveVector = [
            
        ]
        
    }

    decideAlive() {
        const neighbors = this.aliveVector.reduce((sum, isAlive) => sum + (isAlive ? 1 : 0), 0);
        if (this.alive) {
            this.alive = neighbors === 2 || neighbors === 3;
        } else {
            this.alive = neighbors === 3;
        }
    }
}

const gameContainer = document.getElementById('game-container');

x = new GameOfLife(600,600)


