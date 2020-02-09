type ExtendedElement = p5.Element & {
    option: (value: string) => void
    changed: (callback: () => void) => void
    value: () => string
}

class MusicChoice {
    private sel: ExtendedElement

    constructor() {
        this.sel = createSelect() as ExtendedElement
    }

    /**
     * styles and creates options for the Music Selection
     */
    public createSelector() {
        this.sel.position((30), (40))
        this.sel.size(170, 40)
        this.sel.style('font-size', '18px')
        this.sel.style('background-color', 'grey')
        this.sel.style('color', 'white')
        this.sel.style('border', 'none')

        this.sel.option('No music selected')
        this.sel.option('punk')
        this.sel.option('metal')
        this.sel.option('pop')
        this.sel.option('blues')
        this.sel.changed(this.selectMusic.bind(this))
    }

    /**
     * Determines which music is selected
     */
    private selectMusic() {
        if (this.sel.value() === 'punk') {
            punk.loop()
            popp.stop()
            metal.stop()
            blues.stop()
        } else if (this.sel.value() === 'pop') {
            popp.loop()
            punk.stop()
            metal.stop()
            blues.stop()
        } else if (this.sel.value() === 'metal') {
            metal.loop()
            punk.stop()
            blues.stop()
            popp.stop()
        } else if (this.sel.value() === 'blues') {
            blues.loop()
            popp.stop()
            punk.stop()
            metal.stop()
        } else if (this.sel.value() === 'No music selected') {
            popp.stop()
            punk.stop()
            metal.stop()
            blues.stop()
        }
    }
}

