interface Animations {
    introPlayed: boolean
}

export const useAnimationsStore = defineStore('AnimationsStore', {
    state: (): { animations: Animations } => ({
        animations: {
            introPlayed: false
        }
    }),
})