import tvBase01_01 from "../assets/imgs/tv-base/product01-01.webp"
import tvBase01_02 from "../assets/imgs/tv-base/product01-02.webp"
import tvBase01_03 from "../assets/imgs/tv-base/product01-03.webp"
import tvBase02_01 from "../assets/imgs/tv-base/product02-01.webp"
import tvBase02_02 from "../assets/imgs/tv-base/product02-02.webp"
import tvBase02_03 from "../assets/imgs/tv-base/product02-03.webp"
import tvBase02_04 from "../assets/imgs/tv-base/product02-04.webp"


export const data = {
    products: [
        {
            id: 1,
            title: "Green Apples",
            description: "The Green Apples is the best for you. You can never go wrong with any of our products. All have been created by our amazing designers to bring you the best you can get.",
            details: {
                // dimension: "L-530mm x W-510mm x H-700mm, SH-450mm",
                // base: "With legs",
                // baseMaterial: "Wood, Brass",
                brand: "Mezzo",
                color: "White, Peach, Walnut",
                country: "Portugal",
                feature: "Medium back",
                style: "Mid century"
            },
            price: 230,
            discountPercentage: 30,
            rating: 3.69,
            stock: 94,
            category: "Fruits",
            thumbnail: tvBase01_03,
            images: [tvBase01_02, tvBase01_01]
        },
        {
            id: 2,
            title: "Red Fresh Meat",
            description: "The Red Fresh Meat is the best for you. You can never go wrong with any of our products. All have been created by our amazing designers to bring you the best you can get.",
            details: {
                // dimension: "L-530mm x W-510mm x H-700mm, SH-450mm",
                // base: "With legs",
                // baseMaterial: "Wood, Brass",
                brand: "Mezzo",
                color: "White, Peach, Walnut",
                country: "Portugal",
                feature: "Medium back",
                style: "Mid century"
            },
            price: 200,
            discountPercentage: 20,
            rating: 2.69,
            stock: 14,
            category: "Meat",
            thumbnail: tvBase02_03,
            images: [tvBase02_01, tvBase02_02, tvBase02_04]
        },
        // {
        //     id: 3,
        //     title: "Ashby Dining Sofa",
        //     description: "The Ashby dining sofa is the best for you. You can never go wrong with any of our products. All have been created by our amazing designers to bring you the best you can get.",
        //     details: {
        //         dimension: "L-530mm x W-510mm x H-700mm, SH-450mm",
        //         base: "With legs",
        //         baseMaterial: "Wood, Brass",
        //         brand: "Verun",
        //         color: "White, Peach, Walnut",
        //         country: "Portugal",
        //         feature: "Medium back",
        //         style: "Mid century"
        //     },
        //     price: 230,
        //     discountPercentage: 20,
        //     rating: 5.0,
        //     stock: 14,
        //     category: "Sofas",
        //     thumbnail: tvBase03_01,
        //     images: [ tvBase03_02, tvBase03_03, tvBase03_04 ]
        // },
        // {
        //     id: 4,
        //     title: "Serbium one-sit sofa",
        //     description: "The serbium one-sit sofa is the best for you. You can never go wrong with any of our products. All have been created by our amazing designers to bring you the best you can get.",
        //     details: {
        //         dimension: "L-530mm x W-510mm x H-700mm, SH-450mm",
        //         base: "With legs",
        //         baseMaterial: "Wood, Brass",
        //         brand: "Mezzo",
        //         color: "White, Peach, Walnut",
        //         country: "Portugal",
        //         feature: "Medium back",
        //         style: "Mid century"
        //     },
        //     price: 300,
        //     discountPercentage: 10,
        //     rating: 4.69,
        //     stock: 24,
        //     category: "Sofas",
        //     thumbnail: tvBase04_01,
        //     images: [ tvBase04_02, tvBase04_03, tvBase04_04 ]
        // }
    ]
}