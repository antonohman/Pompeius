class CheerText {
    public excellentCheer: p5.Image
    public greatCheer: p5.Image

    constructor() {
        this.excellentCheer = loadImage('./assets/images/excellent.png')
        this.greatCheer = loadImage('./assets/images/great.png')
    }

    public drawExcellentCheer() {
        image(this.excellentCheer, (width/2 - 230), (height/2 - 150))
    }

    public drawGreatCheer() {
        image(this.greatCheer, (width/2 - 150), (height/2 - 150))
    }
}