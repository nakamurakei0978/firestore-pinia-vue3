import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', () => {

    const isLoggedIn = ref(false)
    let auth
    function handleSignIn(){
        auth = getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                isLoggedIn.value = true
            }else{
                isLoggedIn.value = false
            }
        })
    }
    

    const router = useRouter()
    function handleSignOut() {
        signOut(auth).then(() => {
            router.push('/')
        })
    }
    


    return {
        handleSignIn, handleSignOut, isLoggedIn
    }
})