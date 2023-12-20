import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, doc, setDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL, ref as Ref, listAll, deleteObject } from "firebase/storage";

export const useHomepageStore = defineStore('homepage', () => {
    const isLoading = ref(false)
    const homepage = ref(null)
    const docId = ref(null)
    const getHomepage = async () => {
        isLoading.value = true
        const querySnapshot = await getDocs(collection(db, "homepage"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            homepage.value = doc.data()
            docId.value = doc.id
        })
        isLoading.value = false
    }

    const title = ref('')
    const subTitle = ref('')
    const buttonText = ref('')
    const first_product_name = ref('')
    const second_product_name = ref('')
    const first_image_url = ref('')
    const second_image_url = ref('')
    const first_product_price = ref(0)
    const second_product_price = ref(0)

    const isChanging=ref(false)
    async function change(images) {
        try {
            isChanging.value = true
            await handleImage(images)
            const docRef = doc(db, "homepage", docId.value);
            await updateDoc(docRef, {
                button: buttonText.value === '' ? homepage.value.button : buttonText.value,
                subtitle: subTitle.value != '' ? subTitle.value : homepage.value.subtitle,
                title: title.value === '' ? homepage.value.title : title.value,
                product_name: {
                    first: first_product_name.value != '' ? first_product_name.value : homepage.value.product_name.first,
                    second: second_product_name.value != '' ? second_product_name.value : homepage.value.product_name.second
                },
                image: {
                    first: first_image_url.value === '' ? homepage.value.image.first : first_image_url.value,
                    second: second_image_url.value === '' ? homepage.value.image.second : second_image_url.value,
                },
                price: {
                    first: first_product_price.value === 0 || first_product_price.value==='' ? homepage.value.price.first:first_product_price.value,
                    second: second_product_price.value === 0 || second_product_price.value==='' ? homepage.value.price.second:second_product_price.value
                }
            })
        } catch (err) {
            console.log(err);
        } finally{
            isChanging.value = false
        }
    }

    async function handleImage(images) {
        if (images.length > 0) {

            for (const image of images) {
                const storage = getStorage();
                const split = image.image.name.split('.')
                const length = split.length
                const extension = split[length - 1]
                const filename = `${image.num}.${extension}`

                const storageRef = Ref(storage, 'homepage/' + filename)

                const listRef = Ref(storage, 'homepage')
                const res = await listAll(listRef);
                const existingFiles = res.items.filter(item => item.name.startsWith(image.num))
                for (const file of existingFiles) {
                    await deleteObject(file)
                }
                await uploadBytes(storageRef, image.image)
                await getDownloadURL(storageRef).then((url) => {
                    if (image.num === 1) {
                        first_image_url.value = url
                    }
                    if (image.num === 2) {
                        second_image_url.value = url
                    }
                }
                )
            }
        }
    }



return { isLoading, homepage, docId, getHomepage, title, subTitle, first_product_name, second_product_name, buttonText, change,isChanging, first_product_price, second_product_price }
})
