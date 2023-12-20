import { defineStore } from 'pinia'
import axios from 'axios'
import { collection, getDocs,DocumentSnapshot, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '@/firebase'


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: true,
  }),
  actions: {
    async getProducts() {
      // try {
        this.loading=true
        
      //   const res = await axios.get('http://localhost:5000/api_products')
      //   this.products = await res.data
      //   setTimeout(()=>{
      //     this.loading=false
      //   },300)
      // } catch (err) {
      //   console.error(err)
      // }

      const querySnapshot = await getDocs(collection(db, "products"));
      this.products=[]
      querySnapshot.forEach((doc) => {
        this.products.push({ id:doc.id, data:doc.data()})
      });
      // setTimeout(()=>{
      //       this.loading=false
      //     },300)
      this.loading = false
    },

    async addProduct(name, price, category_id, imageFile) {
      // Create a storage reference
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, 'products/' + imageFile.name);

        // Upload the image to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
          (snapshot) => {
            // You can use this section to display upload progress
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Once the upload is complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);

              // Add a new document to Firestore with the download URL
              try {
                const docRef = await addDoc(collection(db, "products"), {
                  name: name,
                  price: price,
                  category_id: category_id,
                  image: downloadURL,
                  description: '',
                  created_at: serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            });
          }
        );
      } else {
        try {
          const docRef = await addDoc(collection(db, "products"), {
            name: name,
            price: price,
            category_id: category_id,
            image: '',
            description: '',
            created_at: serverTimestamp()
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  },
  getters: {
    totalCount() {
      return this.products.length
    }
  }
})