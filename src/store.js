import { create } from "zustand";

export const  UseStore = create(
    (set,get) => ({
        email:"",
        setEmail:(email) =>{
            set({email})
        }
    })
)