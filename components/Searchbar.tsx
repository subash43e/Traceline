'use client'

import { scrapAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {

    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        if (
            hostname.includes("amazon.com") ||
            hostname.includes("amazon.") ||
            hostname.endsWith("amazon")
        ) {
            return true;
        }

    } catch (error) {
        return false;
    }
    return false;
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault;
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if (!isValidLink) return ("Please provide a Valid Amazon link")
        try {
            setLoading(true);

            //scraping the product page
            const product = await scrapAndStoreProduct(searchPrompt);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                type='text'
                placeholder='Enter product link'
                className='searchbar-input'
            />
            <button
                type='submit'
                className='searchbar-btn'
                disabled={searchPrompt === ""}
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    )
}

export default Searchbar;