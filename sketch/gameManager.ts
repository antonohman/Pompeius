class GameManager {

    private startButton: Button
    private resetButton: Button
    private quitButton: Button
    private pauseButton: Button
    private resumeButton: Button
    private playerSettings: PlayerSettings
    private isGameRunning: boolean
    private isGamePaused: boolean
    private gamePage: GamePage
    private scoreTable: ScoreTable
    private userScore: number

    private redAvatarButton: Button
    private blueAvatarButton: Button
    private greenAvatarButton: Button

    private selectedAvatar : p5.Image

    constructor() {
        this.playerSettings = new PlayerSettings()

        this.startButton = new Button(-100, (height * 0.85), 100, 50, 10, 'Start game', 'green', this.startButtonPressed.bind(this))
        this.resetButton = new Button(10, (height * 0.85), 100, 50, 10, 'Reset game', 'red', this.resetButtonPressed.bind(this))
        this.resumeButton = new Button(120, (height * 0.85), 100, 50, 10, 'Resume game', 'purple', this.resumeButtonPressed.bind(this))
        this.quitButton = new Button(-100, (height * 0.9), 100, 25, 10, 'Quit', 'blue', this.quitButtonPressed.bind(this))
        this.pauseButton = new Button(10, (height * 0.9), 100, 25, 10, 'Pause', 'purple', this.pauseButtonPressed.bind(this))
 
        this.redAvatarButton = new Button(-250,210, 150, 150, 0, " ", "", this.redAvatarPressed.bind(this))
        this.blueAvatarButton = new Button(-50,210, 150, 150, 0, " ", "", this.blueAvatarPressed.bind(this))
        this.greenAvatarButton = new Button(150,210, 150, 150, 0, " ", "", this.greenAvatarPressed.bind(this))

        

        this.selectedAvatar = avatar.redAvatar

        this.redAvatarButton.setAvatar(avatar.redAvatar)
        this.blueAvatarButton.setAvatar(avatar.blueAvatar)
        this.greenAvatarButton.setAvatar(avatar.greenAvatar)
        this.gamePage = new GamePage()
        this.isGameRunning = false
        this.isGamePaused = false

        this.scoreTable = new ScoreTable()
        this.userScore = 0
    }

    private drawHomePage() {
        //Inputfield
        this.playerSettings.draw()
        this.playerSettings.update()

        //Start button and Reset button
        this.startButton.draw(width / 2)
        this.resetButton.draw(width / 2)

        this.scoreTable.draw()

        fill('white')
        if (this.userScore > 0) {
            text('Your score: ' + this.userScore, (windowWidth / 2), (windowHeight * 0.7))
        }

        textSize(30)
        fill('green')
        textFont('Quintessential')
        if (this.gamePage.checkIfGameIsComplete() && (this.gamePage.checkLevel() === 15)) {
            text('Congratulation! You finished all the levels!! Good Job!', (windowWidth / 2), (windowHeight * 0.7))
        }
        if ((this.gamePage.isGameOver()) && this.gamePage.checkLifes() === 1) {
            text('GAME OVER!!', (windowWidth / 2), (windowHeight * 0.7))
        }

        if (this.isGamePaused) {
            this.resumeButton.draw(width / 2)
        }

    }

    private drawGamePage() {
        this.quitButton.draw(width / 2)
        this.pauseButton.draw(width / 2)
        this.gamePage.drawContent()
    }

    
    public draw() {

        background(0)
        textSize(60)
        fill('red')
        textAlign(CENTER, CENTER)
        strokeWeight(0)
        textFont('Quintessential')
        text("Pompeius", (width / 2), (height / 9.5))
        textSize(18)
        textFont('Arial')
        text(("Pick your music"), 90, 25)

        let gameOver = this.gamePage.isGameOver()
        if (this.isGameRunning && !gameOver) {
            this.drawGamePage()
            avatar.drawAvatar(this.selectedAvatar)
            
        } else {
            this.isGameRunning = false
            this.drawHomePage()
            this.redAvatarButton.draw(width/2)
            this.blueAvatarButton.draw(width/2)
            this.greenAvatarButton.draw(width/2)
        }
    }

    public eventHandler() {
        if (this.isGameRunning) {
            const isDone = this.gamePage.eventHandler()
            if (isDone && this.gamePage.checkLevel() === 15 && this.gamePage.isGameOver()) {
                this.scoreTable.addPlayer(this.playerSettings.getMyName(), this.gamePage.exposeScore())
                this.scoreTable.saveScoreTable()
                this.scoreTable.playerTable()
            }
        }
    }


    private startButtonPressed() {
        if (!this.isGameRunning) {
            this.isGameRunning = true
            this.gamePage.resetParam()
        }
    }

    private resetButtonPressed() {
        localStorage.removeItem("myName")
        this.playerSettings.setMyName("")
        this.userScore = 0
    }

    private quitButtonPressed() {
        this.isGameRunning = false
        this.isGamePaused = false
        this.scoreTable.addPlayer(this.playerSettings.getMyName(), this.gamePage.exposeScore())
        this.scoreTable.saveScoreTable()
        this.userScore = this.gamePage.exposeScore()
        this.scoreTable.playerTable()
    }

    private pauseButtonPressed() {
        this.isGameRunning = false
        this.isGamePaused = true
    }

    private resumeButtonPressed() {
        this.isGameRunning = true

    }

    private redAvatarPressed() {
        console.log("red")
        this.selectedAvatar = avatar.redAvatar; 

    }
    private blueAvatarPressed() {
        this.selectedAvatar = avatar.blueAvatar
        console.log("blue")
    }
    private greenAvatarPressed() {
        console.log("green")
        this.selectedAvatar = avatar.greenAvatar
    }
}