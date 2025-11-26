import { writable } from 'svelte/store';
import type { SubItem } from '$lib/types';

export interface CartItem {
  item: SubItem;
  quantity: number;
}

export const cart = writable<CartItem[]>([]);