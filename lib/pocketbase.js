// lib/pocketbase.js
import PocketBase from 'pocketbase';

const pocketBaseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8000"; // replace with your PocketBase URL

const pb = new PocketBase(pocketBaseUrl);

export default pb;
