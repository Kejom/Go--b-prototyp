import { defineStore } from 'pinia';

export const useCooStore = defineStore("Coo", {
    state: () => ({
        coos: []
    }),
    actions: {
        addCoo(coo) {this.coos.unshift(coo)},
        removeCoo(coo) {this.coos = this.coos.filter(c => c.id !== coo.id)},
        editCoo(coo){
            const coos = [...this.coos];
            const index = coos.findIndex(c => c.id === coo.id);
            coos[index] = coo;
            this.coos = coos;
        }
    },
    getters: {
        getCoosByUserId: (state) => {
            return (userId) => state.coos.filter(c => c.userId === userId);
        }
    }
})