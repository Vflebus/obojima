declare module "colorthief" {
    export type RGBColor = [number, number, number]
    export default class ColorThief {
        getColor: (
            img: HTMLImageElement | null | undefined,
            quality: number = 10,
        ) => RGBColor | null

        getPalette: (
            img: HTMLImageElement | null | undefined,
            colorCount: number = 10,
            quality: number = 10,
        ) => RGBColor[] | null
    }
}