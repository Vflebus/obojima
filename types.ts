export interface Character {
    name: string;
    description: string;
    image: string;
}

export interface Region {
    title: string;
    description: string;
    image: string;
    characters: Character[];
    backgroundColor: string
}