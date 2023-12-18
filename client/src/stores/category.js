import { defineStore } from 'pinia'
import axios from 'axios'
import { DocumentSnapshot, collection, getDocs, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '@/firebase'
import { logEvent } from 'firebase/analytics';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      // try {
      //   this.loading=true
      //   const res = await axios.get('http://localhost:5000/api_categories')
      //   this.categories = await res.data
      //   setTimeout(()=>{
      //     this.loading=false
      //   },300)
      // } catch (err) {
      //   console.error(err)
      // }

      const querySnapshot = await getDocs(collection(db, "categories"));
      this.categories = []
      querySnapshot.forEach((doc) => {
        this.categories.push({ id: doc.id, data: doc.data() })
      });
      this.loading = false
    },
    getCategoryName(id) {
      // const category = this.categories.find(c => c.id === id)
      // return category.name
      const category = this.categories.find(c => c.id === id)
      return category.data.name
    },
  },
})