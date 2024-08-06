"use server"

import { scrapAmazonProduct } from "../scraper";

export async function scrapAndStoreProduct(ProductUrl: string) {
    if (!ProductUrl) return;

    try {
        const scrapedProduct = await scrapAmazonProduct(ProductUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}