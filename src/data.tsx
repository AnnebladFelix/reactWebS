
export interface Product {
    id: number,
    name: string,
    price: number
}

export interface CartProduct extends Product{
    quantity: number
}

export const mockedProducts: Product[] = [
    {
        id: 1,
        name: "Morötter",
        price: 25.99
    },    
    {
        id: 2,
        name: "Gurka",
        price: 19.99
    },
    {
        id: 3,
        name: "Paprika",
        price: 30.69
    }
]