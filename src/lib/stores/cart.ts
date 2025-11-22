// src/lib/stores/cart.ts
import { writable } from 'svelte/store';
import type { SubItem } from '$lib/types'; // ✅ Import from types

export interface CartItem {
  item: SubItem;
  quantity: number;
}

export const cart = writable<CartItem[]>([]);