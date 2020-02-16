class CheerText {
    public excellentCheer: p5.Image
    public greatCheer: p5.Image

    constructor() {
        this.excellentCheer = loadImage('./assets/images/excellent.png')
        this.greatCheer = loadImage('./assets/images/great.png')
    }

    public drawExcellentCheer() {
        image(this.excellentCheer, 0, 0)
    }

    public drawGreatCheer() {
        image(this.greatCheer, 0, 500)
    }
}

/* image(img, x, y, [width], [height]) */