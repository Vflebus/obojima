interface Animations {
    introPlayed: boolean,
    zoomedOnce: boolean
}

export const useAnimationsStore = defineStore('AnimationsStore', {
    state: (): { animations: Animations } => ({
        animations: {
            introPlayed: false,
            zoomedOnce: false
        }
    }),
})