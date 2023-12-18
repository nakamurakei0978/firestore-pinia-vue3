import { defineStore } from 'pinia'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import addSound from '@/assets/sounds/add.wav'
import qty from '@/assets/sounds/qty.wav'
import warning from '@/assets/sounds/warning.wav'
import { collection, getDocs, query, where, getDoc, setDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from '@/firebase'

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [],
        isToggled: false,
        countTotal: 0,
        subTotal: 0,
    }),
    actions: {
        toggleCart() {
            this.isToggled = !this.isToggled
        },
        close() {
            this.isToggled = false
        },
        addToCart(product) {
            const sound = new Audio(addSound)
            sound.play()
            const isFound = this.carts.findIndex((p) => p.id === product.id)
            if (isFound > -1) {
                this.countTotal += 1
                this.carts[isFound].data.qty += 1
                this.carts[isFound].data.subTotal = this.carts[isFound].data.qty * this.carts[isFound].data.price
            } else {
                this.countTotal += 1
                product.data.qty = 1
                product.data.subTotal = parseFloat(product.data.price)
                this.carts.push(product)
            }
        },
        clearCart() {
            if (this.carts.length > 0) {
                const sound = new Audio(warning)
                sound.play()
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, clear it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Cleared!",
                            text: "Your cart has been cleared.",
                            icon: "success"
                        })
                        this.carts = []
                        this.countTotal = 0
                    }
                })
            } else {
                const sound = new Audio(warning)
                sound.play()
                Swal.fire({
                    title: "Cart is empty!",
                    text: "Nothing here!",
                    icon: "info"
                });
            }
        },
        remove(index) {
            const qty = this.carts[index].data.qty
            this.countTotal -= qty
            this.carts.splice(index, 1)
        },
        decrement(index) {
            const sound = new Audio(qty)
            sound.play()
            if (this.carts[index].data.qty > 1) {
                this.countTotal -= 1
                this.carts[index].data.qty -= 1
                this.carts[index].data.subTotal = this.carts[index].data.qty * this.carts[index].data.price
            } else {
                this.countTotal -= 1
                this.carts.splice(index, 1)
            }
        },
        increment(index) {
            const sound = new Audio(qty)
            sound.play()
            this.countTotal += 1
            this.carts[index].data.qty += 1
            this.carts[index].data.subTotal = this.carts[index].data.qty * this.carts[index].data.price
        },
        async getCartItems() {
            const uid = getAuth().currentUser.uid
            const docCarts = await getDoc(doc(db, "carts", uid));
            if (docCarts.exists()) {
                this.carts = docCarts.data().carts;
                this.countTotal = this.carts.reduce((total, c) => {
                    return total + c.data.qty
                },0);
                console.log(this.countTotal);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        },
        async saveCartItems() {
            const uid = getAuth().currentUser.uid
            await setDoc(doc(db, "carts", uid), {
                carts: this.carts
            })
        }
    },
    getters: {
        getCountTotal() {
            return this.countTotal
        },
        getSubTotal() {
            let t = 0
            this.carts.forEach(c => t += c.data.subTotal)
            this.subTotal = t
            return this.subTotal
        }
    }
})