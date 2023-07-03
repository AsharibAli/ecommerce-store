"use client"
import React, { createContext , useState , Dispatch, SetStateAction, ReactNode } from 'react';



export type Search = {
    value : string
};


export interface UserSearchInterface {
    search : Search,
    setSearch : Dispatch<SetStateAction<Search>>
}

const defaultState = {
    search : {
        value : ''
    },
    setSearch : (search : Search) => {}
} as UserSearchInterface;

export const SearchContext = createContext(defaultState)

type UserProviderProps = {
    children : ReactNode
};


export default function SearchProvider ( {children} : UserProviderProps ) {
    const [search,setSearch] = useState<Search>({
        value : ''
    });

    return (
        <SearchContext.Provider value={{search,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}