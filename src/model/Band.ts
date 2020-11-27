
export interface Band {
    id: string,
    name: string,
    genre: string,
    responsible: string
}

export interface InputBand {
    name: string,
    genre: string,
    responsible: string
}

export class ClassBand {

    constructor (
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string
    ) {}

    static toBandModel(band: any): ClassBand {
        return new ClassBand(
            band.id,
            band.name,
            band.genre,
            band.responsible
        );
    }

    public getId = (): string => this.id
    public getName = (): string => this.name
    public getGenre = (): string => this.genre
    public getResponsible = (): string => this.responsible
}