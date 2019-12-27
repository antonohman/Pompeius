class ImageFrame {
    //private img:string  = 'https://source.unsplash.com/350x350/?nature,water'

    private urlRoot: string
    private imgTags: string
    private dWidth: number

    private pieceHeight: number
    private xPos: number
    private img: p5.Image

    private noOfSegments: number
    private segmentPosition: number[]

    private selectedImage: number

    private segmentScore: number

    private levelStartTime: Date
    private lapsedSeconds: number

    private level: number
    private lives: number

    private timerCount: number

    constructor() {
        this.urlRoot = 'https://source.unsplash.com/'
        this.imgTags = 'cartoon'
        this.dWidth = 350
        this.noOfSegments = 2
        this.segmentPosition = []
        this.img = loadImage(this.getImg())
        this.selectedImage = -1
        this.segmentScore = 0
        this.pieceHeight = 0
        this.xPos = 0
        this.levelStartTime = new Date()
        this.lapsedSeconds = 0
        this.level = 0
        this.lives = 3
        this.timerCount = 0
    }

    public getDestinationWidth(): number {
        return this.dWidth
    }

    public getImg(): string {
        let imgUrl = this.urlRoot + this.dWidth + "x" + this.dWidth + "/?" + this.imgTags + "/sig=" + round(random(150))
        console.log(imgUrl)
        return imgUrl
    }

    public getNoOfSegments(): number {
        return this.noOfSegments
    }

    public getSelectedImage(): number {
        return this.selectedImage
    }

    public increaseSelectedImage(): number {
        return this.selectedImage++
    }

    /**
     * Draws the image based on the number of segments and the xPosition
     */
    public imageDraw(offsets: number[]) {

        /**
         * updates the xPosition
         */
        this.pieceHeight = (this.getDestinationWidth() / this.getNoOfSegments())


        this.xPos += this.getNoOfSegments() * 1.5
        //console.log(xPos,this.myXPos)


        if (this.xPos >= width) {
            this.xPos = 0
        }

        for (let i = 0; i < this.getNoOfSegments(); i++) {

            //Updates array with the new position
            if (i > this.selectedImage) {
                this.segmentPosition[i] = this.xPos

                //reverse direction for alternate images
                if (i % 2 === 1) {
                    this.segmentPosition[i] = width - (this.xPos + this.getDestinationWidth())
                }
            }

            //Draws a rectangle around the selected Image
            if (i === (this.selectedImage + 1)) {
                stroke('hsla(160, 100%, 50%, 0.5)')
                strokeWeight(10)
                rect(this.segmentPosition[i], offsets[0] + (this.pieceHeight * i),
                    this.getDestinationWidth(), this.pieceHeight)
            }

            //Renders the image 
            image(this.img, this.segmentPosition[i], offsets[0] + (this.pieceHeight * i),
                this.getDestinationWidth(), this.pieceHeight, 0,
                this.pieceHeight * i, this.getDestinationWidth(), this.pieceHeight)
        }
    }

    public setParameters() {
        localStorage.setItem("score", (this.segmentScore).toString())
        this.noOfSegments++
        this.selectedImage = -1
        this.img = loadImage(this.getImg())
        this.xPos = 0
        this.levelStartTime = new Date()
        this.level++

    }

    public resetLevel() {
        this.lives--
        this.selectedImage = -1
        this.xPos = 0
        this.levelStartTime = new Date()
        let score = localStorage.getItem("score") as string
        this.segmentScore = parseInt(score)
    }

    public gameScore(offsets: number[]) {
        let score = this.segmentPosition[this.selectedImage + 1]
        // console.log("left:", offsets[1])
        if (score > offsets[1] - 5 && score < offsets[1] + 5) {
            this.segmentScore += 1000
            // console.log("score", (this.selectedImage + 1), this.segmentScore)
        }
        else if ((score > offsets[1] + 5 && score < offsets[1] + 30) || (score > offsets[1] - 30 && score < offsets[1] - 5)) {
            this.segmentScore += 500
            // console.log("score", (this.selectedImage + 1), this.segmentScore)
        }
        else {
            this.segmentScore += 0
            // console.log("score", (this.selectedImage + 1), this.segmentScore)
        }
    }

    public displayScore() {
        textSize(32)
        text((this.segmentScore).toString(), 100, 100)
        fill('red')
    }

    public displayTime() {
        let currentTime = new Date()
        this.lapsedSeconds = floor((currentTime.getTime() - this.levelStartTime.getTime()) / 1000)
        //console.log(currentTime.getTime())
        let maxTime = 15
        this.timerCount = maxTime - this.lapsedSeconds
        textSize(32)
        text((this.timerCount + " sec").toString(), 350, 100)
        fill('red')
        if (this.timerCount === 0) {
            this.resetLevel()
        }
    }

    public displayLevel() {
        textSize(32)
        text(("Level:" + this.level).toString(), 500, 100)
        fill('red')
    }

    public displayLives() {
        textSize(32)
        text(("Lives:" + this.lives).toString(), 800, 100)
        fill('red')
    }

}


