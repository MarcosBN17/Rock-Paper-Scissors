        
        const BtnPaper = document.getElementById('btnpaper');
        const BtnRock = document.getElementById('btnrock');
        const BtnScissors = document.getElementById('btnscissors');
        
        // div DOM
        const container = document.querySelector('#gamecontainer');
        const scoreDisplay = document.querySelector('#scorecontainer');
        const playAgainContainer = document.querySelector('#playAgainContainer');

        let playerSelection;
        let playerScore = 0;
        let cpuScore = 0;

        BtnPaper.addEventListener('click', function() {
            if (!playAgainContainer.querySelector('#playAgainButton')) {
                playerSelection = "paper";
                game();
            }
        });

        BtnRock.addEventListener('click', function() {
            if (!playAgainContainer.querySelector('#playAgainButton')) {
                playerSelection = "rock";
                game();
            }
        });

        BtnScissors.addEventListener('click', function() {
            if (!playAgainContainer.querySelector('#playAgainButton')) {
                playerSelection = "scissors";
                game();
            }
        });

        function game() {
            let computerSelection = getComputerChoice();
            console.log("Computer chose: " + computerSelection);
            console.log("Player chose: " + playerSelection);
            playRound(playerSelection.toLowerCase(), computerSelection.toLowerCase());
        }

        function getComputerChoice() {
            const randomPick = ["rock", "paper", "scissors"];
            const randomNumber = Math.floor(Math.random() * 3);
            return randomPick[randomNumber];
        }

        function playRound(playerSelection, computerSelection) {
            
            if (playerSelection === computerSelection) {
            displayResult("It's a Tie!");
            } else if (
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "scissors" && computerSelection === "paper")
            ) {
                playerScore++;
                displayResult("Player Wins!");
            } else {
                cpuScore++;
                displayResult("CPU Wins!");
            }

            // Update the score display
            updateScoreDisplay();

        
        }

        function displayResult(resultText, playerSelection, computerSelection) {
            //Remove existing results
            const existingResults = document.querySelectorAll('.result');
            existingResults.forEach(element => element.remove());

            //Create and append the new result
            const result = document.createElement('div');
            result.classList.add('result');
            result.textContent = resultText;
            container.appendChild(result);
        }

        function updateScoreDisplay() {
            scoreDisplay.textContent = `Player: ${playerScore} | CPU: ${cpuScore}`;

            if (playerScore === 5 || cpuScore === 5) {

             // Disable game buttons
             BtnPaper.disabled = true;
             BtnRock.disabled = true;
             BtnScissors.disabled = true;              

             // Check if either the player or CPU has reached 5 points
             const winner = playerScore === 5 ? "Player" : "CPU";
             displayResult(`${winner} wins the game!`);

             //Show "Play Again" button
             createPlayAgainButton();
            }
        }

        function createPlayAgainButton() {
            const playAgainButton = document.createElement('button');
            playAgainButton.id = 'playAgainButton';
            playAgainButton.textContent = 'Play Again';
            playAgainButton.addEventListener('click', playAgain);
            playAgainContainer.appendChild(playAgainButton);
        }

        function playAgain() {
            BtnPaper.disabled = false;
            BtnRock.disabled = false;
            BtnScissors.disabled = false;

            //Remove "Play Again" button
            const playAgainButton = playAgainContainer.querySelector('#playAgainButton');
            if (playAgainButton) {
                playAgainButton.remove();
            }

            //Remove results from the container
            const resultElements = document.querySelectorAll('.result');
            resultElements.forEach(element => element.remove());

            //Reset score
            playerScore = 0;
            cpuScore = 0;

            //Update score discplay after reset
            updateScoreDisplay();
        }
        