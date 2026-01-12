<script lang="ts">
  import { 
    type MainCategory, 
    type CartItem, 
    type SubItem, 
    type ProductGroup, 
    type Transaction,
    type User
  } from '$lib/types';
  import { 
    Search, 
    Trash2, 
    Plus, 
    Minus, 
    CreditCard, 
    Banknote, 
    ShieldCheck,
    QrCode,
    UserCircle,
    Users
  } from 'lucide-svelte';

  let { categories, onLogout, onSwitchToAdmin, onCheckout, currentUser } = $props<{
    categories: MainCategory[],
    onLogout: () => void,
    onSwitchToAdmin: () => void,
    onCheckout: (
      items: CartItem[], 
      subtotal: number, 
      paymentMethod: string, 
      change: number,
      discountType: 'none' | 'pwd' | 'senior',
      discountAmount: number
    ) => Transaction,
    currentUser: User | null
  }>();

  let cart = $state<CartItem[]>([]);
  let searchQuery = $state('');
  
  // Navigation State
  let selectedMainCategory = $state<MainCategory | null>(null);
  let selectedGenderIndex = $state<number>(-1);
  let selectedKidsCategory = $state<string | null>(null);
  let selectedProduct = $state<ProductGroup | null>(null);

  // Initialize
  $effect(() => {
    if (categories && categories.length > 0 && !selectedMainCategory) {
      selectedMainCategory = categories[0];
      if (categories[0].genders && categories[0].genders.length > 0) {
        selectedGenderIndex = 0;
      }
    }
  });

  // Discount State
  let discountType = $state<'none' | 'pwd' | 'senior'>('none');
  const discountPercentage = 20;

  // Checkout Modal State
  let showCheckoutModal = $state(false);
  let showSuccessModal = $state(false);
  let paymentMethod = $state<'cash' | 'card' | 'gcash' | ''>('');
  let cashAmount = $state<number | string>('');
  let transactionDetails = $state<Transaction | null>(null);

  // Computed
  let subtotal = $derived(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
  
  let discountAmount = $derived(
    discountType === 'none' ? 0 : Math.round(subtotal * (discountPercentage / 100))
  );

  let total = $derived(subtotal - discountAmount);
  let tax = $derived(Math.round(total * 0.03));
  let grandTotal = $derived(Math.round(total + tax));
  
  let changeAmount = $derived(() => {
    const cash = Number(cashAmount);
    if (!cash || isNaN(cash)) return 0;
    return paymentMethod === 'cash' ? Math.max(0, cash - grandTotal) : 0;
  });

  let selectedGender = $derived(
    (selectedMainCategory && selectedGenderIndex >= 0 && selectedMainCategory.genders) 
      ? selectedMainCategory.genders[selectedGenderIndex] 
      : null
  );

  let currentProducts = $derived(() => {
    const gender = selectedGender;
    if (!gender) return [];
    
    // Logic for kids category selection
    const isKids = gender.name === 'Kids';
    
    if (isKids) {
        if (!selectedKidsCategory) return [];
        const kidsCat = gender.children?.find(c => c.name === selectedKidsCategory);
        return kidsCat?.products || [];
    }
    
    return gender.products || [];
  });

  let filteredSubitems = $derived(() => {
    if (!selectedProduct?.subitems) return [];
    return selectedProduct.subitems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handlers
  const handleSelectMainCategory = (cat: MainCategory) => {
    selectedMainCategory = cat;
    selectedGenderIndex = cat.genders?.length ? 0 : -1;
    selectedKidsCategory = null;
    selectedProduct = null;
    searchQuery = '';
  };

  const handleSelectGender = (index: number) => {
    selectedGenderIndex = index;
    selectedKidsCategory = null;
    selectedProduct = null;
    searchQuery = '';
  };

  const handleToggleSubitem = (subitem: SubItem) => {
    const existing = cart.find(i => i.id === subitem.id.toString());
    if (existing) {
        cart = cart.filter(i => i.id !== subitem.id.toString());
    } else {
        const newItem: CartItem = {
            id: subitem.id.toString(),
            name: subitem.name,
            price: subitem.price,
            category: `${selectedMainCategory?.name} > ${selectedGender?.name}`,
            stock: 99,
            imageUrl: subitem.image,
            quantity: 1
        };
        cart = [...cart, newItem];
    }
  };

  const updateQty = (id: string, delta: number) => {
    cart = cart.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty };
        }
        return item;
    }).filter(Boolean) as CartItem[];
  };

  const handlePayment = () => {
    try {
        const txn = onCheckout(
            cart,
            subtotal,
            paymentMethod,
            changeAmount(),
            discountType,
            discountAmount
        );
        transactionDetails = txn;
        showCheckoutModal = false;
        showSuccessModal = true;
        cart = [];
        discountType = 'none';
        paymentMethod = '';
        cashAmount = '';
    } catch (e) {
        console.error(e);
        alert('Payment processing error');
    }
  };

  const printReceipt = () => {
    if (!transactionDetails) return;
    
    // Very simple print simulation for React
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        const html = `
            <html>
                <body style="font-family: monospace; text-align: center; padding: 20px;">
                    <h2>Aegix POS</h2>
                    <p>Transaction: ${transactionDetails.id}</p>
                    <hr/>
                    <div style="text-align: left;">
                        ${transactionDetails.items.map(i => `<div>${i.name} x${i.quantity} - ${i.price * i.quantity}</div>`).join('')}
                    </div>
                    <hr/>
                    <div style="text-align: right;">
                        <p>Total: ${transactionDetails.total}</p>
                        <p>Payment: ${transactionDetails.paymentMethod}</p>
                    </div>
                </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.print();
        printWindow.close();
    }
  };
</script>

<div class="flex h-screen w-screen bg-linear-to-br from-purple-400 to-purple-600 overflow-hidden fixed inset-0">
  <!-- TOP HEADER -->
  <div class="fixed top-0 left-0 right-0 bg-linear-to-r from-purple-500 to-purple-700 text-white p-4 z-40 flex justify-between items-center shadow-lg">
    <div class="flex items-center gap-4">
      <button onclick={() => { selectedMainCategory = null; selectedProduct = null; }} class="px-4 py-2 rounded-full border-2 border-green-400 text-green-400 font-bold hover:bg-green-400 hover:text-purple-700 transition-colors">
        Home
      </button>
      <span class="text-sm text-purple-100">TERMINAL: <strong>TERM-3911</strong></span>
      <button class="px-4 py-2 rounded-full border-2 border-purple-200 text-purple-200 font-bold hover:bg-purple-400 transition-colors text-sm">
        Change Terminal
      </button>
    </div>
    <h2 class="text-xl font-bold">AEGIX POS SYSTEM</h2>
    <button onclick={onLogout} class="px-4 py-2 rounded-full border-2 border-red-400 text-red-400 font-bold hover:bg-red-400 hover:text-white transition-colors">
      Logout
    </button>
  </div>

  <!-- MAIN CONTENT - starts below header -->
  <div class="flex w-full h-full pt-20 gap-4 p-4 overflow-hidden">
    <!-- LEFT SIDEBAR: Cart Items -->
    <div class="w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <div class="p-4 border-b border-slate-200 bg-linear-to-r from-slate-50 to-slate-100">
        <h3 class="font-bold text-slate-800 text-lg">Sweet Printers</h3>
        <p class="text-xs text-slate-500">Category</p>
      </div>

      <!-- Cart Items List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        {#if cart.length > 0}
          {#each cart as item (item.id)}
            <div class="flex gap-3 p-3 bg-linear-to-r from-slate-50 to-white rounded-xl border-l-4 border-blue-500 group hover:shadow-md transition-all">
              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-bold text-sm text-slate-800">{item.name}</h4>
                  <span class="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">x{item.quantity}</span>
                </div>
                <p class="text-xs text-slate-500 mb-2">₱{item.price.toLocaleString()}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold text-emerald-600">₱{(item.price * item.quantity).toLocaleString()}</span>
                  <button onclick={() => updateQty(item.id, -999)} class="text-slate-400 hover:text-red-500 transition-colors text-xs">Remove</button>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div class="h-full flex flex-col items-center justify-center text-slate-400">
            <p class="text-sm font-medium">No items yet</p>
            <p class="text-xs">Select items from menu</p>
          </div>
        {/if}
      </div>

      <!-- Totals & Checkout -->
      <div class="p-4 border-t border-slate-200 bg-linear-to-r from-slate-50 to-slate-100 space-y-3">
        <div class="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span class="text-emerald-600">₱{subtotal.toLocaleString()}</span>
        </div>
        <div class="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span class="text-emerald-600">₱{grandTotal.toLocaleString()}</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button class="py-2 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700">
            1.0 Ltr
          </button>
          <button onclick={() => showCheckoutModal = true} class="py-2 rounded-lg bg-green-500 text-white font-bold text-sm hover:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- CENTER: Categories & Products Grid -->
    <div class="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <!-- Category Filter Tabs -->
      <div class="p-4 border-b border-slate-200 flex gap-2 overflow-x-auto flex-wrap bg-slate-50">
        <!-- Main Categories -->
        {#each categories as cat (cat.id)}
          <button
            onclick={() => handleSelectMainCategory(cat)}
            class={`px-4 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap transition-all ${
              selectedMainCategory?.id === cat.id 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
          >
            {cat.name}
          </button>
        {/each}

        <!-- Gender/Subcategories -->
        {#if selectedMainCategory && selectedMainCategory.genders}
          <div class="flex gap-2 pl-2 border-l-2 border-slate-300 flex-wrap">
            {#each selectedMainCategory.genders as g, idx}
              <div class="flex gap-2 items-center">
                <button
                  onclick={() => handleSelectGender(idx)}
                  class={`px-4 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap transition-all ${
                    selectedGenderIndex === idx 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {g.name}
                </button>
                
                <!-- Kids subcategories (Boys/Girls) -->
                {#if g.name === 'Kids' && g.children && selectedGenderIndex === idx}
                  <div class="flex gap-2 pl-2 border-l-2 border-amber-300">
                    {#each g.children as child}
                      <button
                        onclick={() => selectedKidsCategory = child.name}
                        class={`px-4 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap transition-all ${
                          selectedKidsCategory === child.name 
                          ? 'bg-amber-500 text-white border-amber-500' 
                          : 'bg-white text-amber-500 border-amber-500 hover:bg-amber-50'
                        }`}
                      >
                        {child.name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Products Grid -->
      <div class="flex-1 overflow-y-auto p-6 bg-slate-50">
        {#if selectedProduct}
          <!-- Back to categories -->
          <button onclick={() => selectedProduct = null} class="mb-4 px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white">
            ← Back to {selectedMainCategory?.name}
          </button>
          
          <!-- Subitems Grid -->
          <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {#each filteredSubitems() as subitem (subitem.id)}
              <button
                onclick={() => handleToggleSubitem(subitem)}
                class={`p-4 rounded-2xl text-white font-bold text-sm transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 h-32 ${
                  cart.some(i => i.id === subitem.id.toString())
                  ? 'bg-orange-400 hover:bg-orange-500 shadow-lg shadow-orange-300'
                  : 'bg-blue-200 hover:bg-blue-200 shadow-lg shadow-blue-300'
                }`}
              >
                <img src={subitem.image} alt={subitem.name} class="h-16 object-contain filter brightness-0 invert" />
                <div class="text-center">
                  <p class="text-xs">{subitem.name}</p>
                  <p class="text-xs font-bold">₱{subitem.price}</p>
                </div>
              </button>
            {/each}
          </div>
        {:else}
          <!-- Product Categories Grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#if currentProducts().length > 0}
              {#each currentProducts() as product (product.id)}
                <button
                  onclick={() => selectedProduct = product}
                  class="bg-linear-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white font-bold text-center hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center justify-center gap-3 h-40"
                >
                  <img src={product.image} alt={product.name} class="h-20 object-contain" />
                  <div>
                    <p class="text-sm font-bold">{product.name}</p>
                    <p class="text-xs opacity-80">{product.subitems?.length || 0} items</p>
                  </div>
                </button>
              {/each}
            {:else}
              <div class="col-span-full h-40 flex items-center justify-center text-slate-400">
                Select a gender to view products
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Checkout Modal -->
  {#if showCheckoutModal}
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog">
      <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div class="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 class="text-xl font-bold text-slate-800">Checkout</h2>
          <button onclick={() => showCheckoutModal = false} class="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-8">
          <!-- Left: Order Summary -->
          <div>
            <h3 class="text-sm font-bold text-slate-500 uppercase mb-3">Order Summary</h3>
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <div class="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              
              <!-- Discounts -->
              <div class="py-2 border-y border-slate-200 space-y-2">
                <div class="text-sm font-bold text-slate-700 mb-2">Discounts</div>
                <div class="flex gap-2">
                  <button
                    onclick={() => discountType = discountType === 'pwd' ? 'none' : 'pwd'}
                    class={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      discountType === 'pwd'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    PWD (20%)
                  </button>
                  <button
                    onclick={() => discountType = discountType === 'senior' ? 'none' : 'senior'}
                    class={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      discountType === 'senior'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-purple-600 border border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    Senior (20%)
                  </button>
                </div>
                {#if discountType !== 'none'}
                  <div class="flex justify-between text-sm text-red-600 font-bold">
                    <span>-{discountType === 'pwd' ? 'PWD' : 'Senior'} Discount (20%)</span>
                    <span>-₱{discountAmount.toLocaleString()}</span>
                  </div>
                {/if}
              </div>
              
              <div class="flex justify-between text-slate-600">
                <span>Tax (3%)</span>
                <span>₱{tax.toLocaleString()}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-slate-800 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span class="text-blue-600">₱{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Right: Payment -->
          <div>
            <h3 class="text-sm font-bold text-slate-500 uppercase mb-3">Payment Method</h3>
            <div class="grid grid-cols-3 gap-3 mb-6">
              {#each [
                { id: 'card', label: 'Card' },
                { id: 'cash', label: 'Cash' },
                { id: 'gcash', label: 'GCash' },
              ] as method}
                <button
                  onclick={() => {
                    paymentMethod = method.id as any;
                    if (method.id === 'cash') cashAmount = grandTotal;
                  }}
                  class={`p-3 rounded-lg border-2 font-bold transition-all ${
                    paymentMethod === method.id 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200'
                  }`}
                >
                  {method.label}
                </button>
              {/each}
            </div>

            {#if paymentMethod === 'cash'}
              <div class="mb-4">
                <label class="block text-sm font-bold text-slate-700 mb-2" for="cashInput">Cash Received</label>
                <input
                  id="cashInput" 
                  type="number" 
                  bind:value={cashAmount}
                  class="w-full bg-amber-50 border border-amber-200 rounded-lg py-2 px-3 font-bold outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            {/if}
          </div>
        </div>

        <div class="p-5 border-t border-slate-100 flex gap-3 bg-slate-50">
          <button onclick={() => showCheckoutModal = false} class="flex-1 py-3 rounded-lg font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50">
            Cancel
          </button>
          <button 
            onclick={handlePayment}
            disabled={!paymentMethod || (paymentMethod === 'cash' && Number(cashAmount) < grandTotal)}
            class="flex-1 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Success Modal -->
  {#if showSuccessModal && transactionDetails}
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog">
      <div class="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div class="bg-linear-to-r from-purple-500 to-purple-600 p-6 text-center text-white">
          <h2 class="text-2xl font-bold">Thank You!</h2>
          <p class="text-purple-100 text-sm">Your payment is complete!</p>
        </div>
        <div class="p-6">
          <div class="text-center mb-4">
            <h3 class="text-2xl font-bold text-blue-600">₱{transactionDetails.total}</h3>
            <p class="text-sm text-slate-500">{transactionDetails.date}, {transactionDetails.time}</p>
          </div>
          
          <div class="space-y-2 mb-4 pb-4 border-b border-slate-200">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Payment Method:</span>
              <span class="font-bold uppercase">{transactionDetails.paymentMethod}</span>
            </div>
            {#if transactionDetails.change && transactionDetails.change > 0}
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Change:</span>
                <span class="font-bold text-emerald-600">₱{transactionDetails.change}</span>
              </div>
            {/if}
          </div>

          <div class="grid grid-cols-3 gap-2">
            <button onclick={printReceipt} class="py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Print</button>
            <button class="py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Email</button>
            <button onclick={() => { showSuccessModal = false; transactionDetails = null; }} class="py-2 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700">Done</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>