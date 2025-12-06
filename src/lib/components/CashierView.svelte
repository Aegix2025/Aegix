<script lang="ts">
  import { 
    type CartItem, 
    type MainCategory, 
    type GenderCategory, 
    type ProductGroup, 
    type SubItem, 
    type Transaction 
  } from '../types';
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
  
  let { categories, onLogout, onCheckout, onSwitchToAdmin } = $props<{
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
    ) => Transaction
  }>();

  let cart = $state<CartItem[]>([]);
  let searchQuery = $state('');

  // Main category tabs always visible
  let selectedMainCategory = $state<MainCategory | null>(null);
  let selectedGenderIndex = $state<number>(-1);
  let selectedKidsCategory = $state<string | null>(null);
  let selectedProduct = $state<ProductGroup | null>(null);

  // Initialize default selection
  let _initialized = $state(false);
  $effect(() => {
    if (!_initialized && categories && categories.length > 0) {
      selectedMainCategory = categories[0];
      selectedGenderIndex = (categories[0].genders && categories[0].genders.length > 0) ? 0 : -1;
      _initialized = true;
    }
  });

  // Discount State
  let discountType = $state<'none' | 'pwd' | 'senior'>('none');
  let discountPercentage = $state<number>(20); // Default 20% discount for both PWD and Senior
  let discountAmount = $state<number>(0);

  // Derived Calculations with Discount
  let subtotal = $derived(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
  
  // Recalculate discount when subtotal or discountType changes
  $effect(() => {
    if (discountType === 'none') {
      discountAmount = 0;
    } else {
      discountAmount = Math.round(subtotal * (discountPercentage / 100));
    }
  });
  
  let total = $derived(subtotal - discountAmount);
  let tax = $derived(Math.round(total * 0.03));
  let grandTotal = $derived(total + tax);
  let roundedGrandTotal = $derived(Math.round(grandTotal));

  let selectedGender = $derived(() => {
    if (selectedMainCategory && selectedGenderIndex >= 0) {
      return selectedMainCategory.genders[selectedGenderIndex];
    }
    return null;
  });

  let currentProducts = $derived(() => {
    const gender = selectedGender();
    if (!gender) return [];
    if (selectedGenderIndex === 2 && !selectedKidsCategory) return [];
    
    if (selectedGenderIndex === 2 && selectedKidsCategory) {
      const kidsCategory = gender.children?.find((c: GenderCategory) => c.name === selectedKidsCategory);
      return kidsCategory?.products || [];
    }
    
    return gender.products || [];
  });

  let filteredSubitems = $derived(() => {
    if (!selectedProduct?.subitems) return [];
    return selectedProduct.subitems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  function selectMainCategory(cat: MainCategory) {
    selectedMainCategory = cat;
    selectedGenderIndex = -1;
    selectedKidsCategory = null;
    selectedProduct = null;
    searchQuery = '';
  }

  function selectGender(index: number) {
    selectedGenderIndex = index;
    selectedKidsCategory = null;
    selectedProduct = null;
    searchQuery = '';
  }

  function selectKidsCategory(name: string) {
    selectedKidsCategory = name;
    selectedProduct = null;
    searchQuery = '';
  }

  function selectProduct(product: ProductGroup) {
    selectedProduct = product;
    searchQuery = '';
  }

  function goBack() {
    selectedProduct = null;
  }

  function isSubitemInCart(subitem: SubItem): boolean {
    return cart.some(item => item.id === subitem.id.toString());
  }

  function toggleSubitemInCart(subitem: SubItem) {
    const existing = cart.find(i => i.id === subitem.id.toString());
    if (existing) {
      cart = cart.filter(i => i.id !== subitem.id.toString());
    } else {
      const product: CartItem = {
        id: subitem.id.toString(),
        name: subitem.name,
        price: subitem.price,
        category: `${selectedMainCategory?.name} > ${selectedGender()?.name}`,
        stock: 99,
        imageUrl: subitem.image,
        quantity: 1
      };
      cart = [...cart, product];
    }
  }

  function updateQty(id: string, delta: number) {
    cart = cart.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(i => i.quantity > 0);
  }

  // Discount Functions
  function applyDiscount(type: 'pwd' | 'senior') {
    discountType = type;
  }

  function removeDiscount() {
    discountType = 'none';
    discountAmount = 0;
  }

  // Checkout State
  let showCheckoutModal = $state(false);
  let showSuccessModal = $state(false);
  let paymentMethod = $state<'cash' | 'card' | 'gcash' | ''>('');
  let cashAmount = $state<number>(0);
  let transactionDetails = $state<Transaction | null>(null);

  // Derived calculations for Checkout
  let changeAmount = $derived(paymentMethod === 'cash' ? Math.max(0, Number(cashAmount) - roundedGrandTotal) : 0);

  function openCheckout() {
    if (cart.length === 0) {
      alert('Please add items to cart first');
      return;
    }
    showCheckoutModal = true;
    paymentMethod = '';
    cashAmount = 0;
  }

  function closeCheckoutModal() {
    showCheckoutModal = false;
    paymentMethod = '';
    cashAmount = 0;
  }

  function setPaymentMethod(method: 'cash' | 'card' | 'gcash') {
    paymentMethod = method;
    if (method === 'cash') {
      cashAmount = roundedGrandTotal; // Auto-fill with exact amount
    } else {
      cashAmount = 0;
    }
  }

  function handleProcessPayment() {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (paymentMethod === 'cash' && Number(cashAmount) < roundedGrandTotal) {
      alert('Cash amount is less than total amount');
      return;
    }
    
    processPayment();
  }

  function processPayment() {
    try {
      // Call the parent component's onCheckout function with discount
      const result = onCheckout(
        cart, 
        subtotal, 
        paymentMethod, 
        changeAmount,
        discountType,
        discountAmount
      );
      
      // Set transaction details
      transactionDetails = {
        ...result,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: subtotal,
        discount: discountAmount,
        discountType: discountType,
        tax: tax,
        total: roundedGrandTotal,
        paymentMethod: paymentMethod,
        change: changeAmount
      } as Transaction & {
        discount: number;
        discountType: 'none' | 'pwd' | 'senior';
      };
      
      // Reset discount for next transaction
      discountType = 'none';
      discountAmount = 0;
      
      // Close checkout modal and show success modal
      showCheckoutModal = false;
      showSuccessModal = true;
      
      // Clear cart for next sale
      cart = [];
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Error processing payment. Please try again.');
    }
  }

  function startNewSale() {
    showSuccessModal = false;
    transactionDetails = null;
    paymentMethod = '';
    cashAmount = 0;
    // Reset discount for next sale
    discountType = 'none';
    discountAmount = 0;
  }

  function printReceipt() {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !transactionDetails) {
        window.print();
        return;
    }

    // Type assertion for transaction with discount
    const transactionWithDiscount = transactionDetails as Transaction & {
      discount?: number;
      discountType?: 'none' | 'pwd' | 'senior';
    };

    // Build items HTML
    const itemsHTML = transactionWithDiscount.items
        .map(item => `<div class="item">
            <span>${item.name} x${item.quantity}</span>
            <span>₱${(item.price * item.quantity).toFixed(2)}</span>
        </div>`)
        .join('');

    // Build discount HTML
    const discountHTML = transactionWithDiscount.discount && transactionWithDiscount.discount > 0
      ? `<div class="item discount">
          <span>Discount (${transactionWithDiscount.discountType?.toUpperCase()}):</span>
          <span>-₱${transactionWithDiscount.discount.toFixed(2)}</span>
         </div>`
      : '';

    // Build change HTML if needed
    const changeVal = transactionWithDiscount.change ?? 0;
    const changeHTML = changeVal > 0
      ? `<div class="item">
          <span>Change:</span>
          <span>₱${changeVal.toFixed(2)}</span>
         </div>`
      : '';

    const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Receipt - ${transactionWithDiscount.id}</title>
        <style>
            body { 
                font-family: 'Courier New', monospace; 
                padding: 20px;
                background: white;
            }
            .receipt { 
                width: 300px; 
                margin: 0 auto;
                border: 1px dashed #ccc;
                padding: 15px;
            }
            .header { 
                text-align: center; 
                margin-bottom: 20px; 
                border-bottom: 1px dashed #000;
                padding-bottom: 10px;
            }
            .item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 5px; 
                font-size: 14px;
            }
            .item.discount {
                color: #16a34a;
                font-weight: bold;
            }
            .total { 
                font-weight: bold; 
                border-top: 2px solid #000; 
                padding-top: 10px;
                margin-top: 10px;
            }
            .footer { 
                text-align: center; 
                margin-top: 20px; 
                font-size: 12px;
                color: #666;
                border-top: 1px dashed #ccc;
                padding-top: 10px;
            }
            @media print {
                body { padding: 0; }
                .receipt { border: none; }
            }
        </style>
    </head>
    <body>
        <div class="receipt">
            <div class="header">
                <h2 style="margin: 0;">Aegix POS</h2>
                <p style="margin: 5px 0;">${transactionWithDiscount.date}, ${transactionWithDiscount.time}</p>
                <p style="margin: 5px 0; font-size: 12px;">ID: ${transactionWithDiscount.id}</p>
            </div>
            ${itemsHTML}
            <div class="item">
                <span>Subtotal:</span>
                <span>₱${transactionWithDiscount.subtotal.toFixed(2)}</span>
            </div>
            ${discountHTML}
            <div class="item">
                <span>Tax:</span>
                <span>₱${transactionWithDiscount.tax.toFixed(2)}</span>
            </div>
            <div class="item total">
                <span>TOTAL:</span>
                <span>₱${transactionWithDiscount.total.toFixed(2)}</span>
            </div>
            <div class="item">
                <span>Payment Method:</span>
                <span>${transactionWithDiscount.paymentMethod.toUpperCase()}</span>
            </div>
            ${changeHTML}
            <div class="footer">
                <p>Thank you for your purchase!</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
        </div>
    </body>
    </html>`;
    
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

  // Helper function to format currency
  function formatCurrency(amount: number): string {
    return `₱${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  // Optional: Add keyboard shortcuts
  $effect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape' && showCheckoutModal) {
        closeCheckoutModal();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p' && showSuccessModal) {
        e.preventDefault();
        printReceipt();
      }
    }
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  // Sa iyong script, dagdagan ito:
$effect(() => {
  if (paymentMethod === 'gcash' && showCheckoutModal) {
    // Auto-scroll to show GCash section
    setTimeout(() => {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = modalContent.scrollHeight;
      }
    }, 100);
  }
});
</script>

<div class="cashier-container">
  <!-- Left Section: Catalog -->
  <div class="catalog-section">
    <!-- Header Controls -->
    <div class="header-controls">
      {#if selectedProduct}
        <button 
          onclick={() => selectedProduct = null}
          class="back-button"
        >
          ← Back
        </button>
      {/if}
      <button 
        onclick={() => { selectedMainCategory = null; selectedGenderIndex = -1; selectedProduct = null; }}
        class="home-button"
      >
        Home
      </button>
      <button 
        onclick={onSwitchToAdmin}
        class="admin-button"
      >
        <ShieldCheck class="admin-icon" /> Admin
      </button>
      <button 
        onclick={onLogout}
        class="logout-button-cashier"
      >
        Logout
      </button>
    </div>

    <!-- Categories -->
    <div class="categories-container">
      {#each categories as cat}
        <button
          onclick={() => selectMainCategory(cat)}
          class="category-button {selectedMainCategory?.id === cat.id ? 'active' : ''}"
        >
          {cat.name}
        </button>
      {/each}
      {#if selectedProduct}
        <div class="current-product-indicator">
          {selectedProduct.name}
        </div>
      {/if}
    </div>

    <!-- Gender Tabs & Subcategories -->
    {#if selectedMainCategory && selectedMainCategory.genders}
      <div class="gender-section">
        <div class="gender-controls">
          <div class="gender-tabs">
            {#each selectedMainCategory.genders as gender, idx}
              <button
                onclick={() => selectGender(idx)}
                class="gender-button {selectedGenderIndex === idx ? 'active' : ''}"
              >
                {gender.name}
              </button>
            {/each}

            {#if selectedGender()?.children}
              <div class="kids-subcategories">
                {#each selectedGender()?.children as child}
                  <button
                    onclick={() => selectKidsCategory(child.name)}
                    class="kids-button {selectedKidsCategory === child.name ? 'active' : ''}"
                  >
                    {child.name}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
          
          {#if selectedProduct}
            <div class="search-container">
              <input 
                type="text"
                placeholder="Search subitems..."
                class="search-input"
                bind:value={searchQuery}
              />
            </div>
          {/if}
        </div>
      </div>
    {/if}

<!-- Content Area -->
    <div class="content-area">
      {#if selectedProduct}
        <!-- Subitems Grid -->
        <div class="subitems-grid">
          {#each filteredSubitems() as subitem}
            <div class="subitem-card">
              <div class="subitem-image-container">
                <img src={subitem.image} alt={subitem.name} class="subitem-image" />
              </div>
              <div class="subitem-content">
                <h4 class="subitem-name">{subitem.name}</h4>
                <p class="subitem-price">₱{subitem.price.toLocaleString()}</p>
                <button 
                  onclick={() => toggleSubitemInCart(subitem)}
                  class="subitem-button {isSubitemInCart(subitem) ? 'in-cart' : ''}"
                >
                  {isSubitemInCart(subitem) ? 'Remove' : 'Add to Cart'}
                </button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <!-- Product Groups Grid -->
        {#if currentProducts().length > 0}
          <div class="products-grid">
            {#each currentProducts() as product}
              <button 
                onclick={() => selectProduct(product)}
                class="product-card"
              >
                <div class="product-image-container">
                  <img src={product.image} alt={product.name} class="product-image" />
                </div>
                <div class="product-info">
                  <h3 class="product-name">{product.name}</h3>
                  <span class="product-count">
                    {product.subitems?.length || 0} items
                  </span>
                </div>
              </button>
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            {(selectedGenderIndex === 2 && !selectedKidsCategory) 
              ? "Please select Boys or Girls to view products" 
              : "No products available in this category"}
          </div>
        {/if}
      {/if}
    </div>
  </div>

  <!-- Right Section: Cart -->
  <div class="cart-section">
    <div class="cart-header">
      <h3>Current Order</h3>
      <p>{cart.length} items selected</p>
    </div>

    <div class="cart-items-container">
      {#if cart.length > 0}
        {#each cart as item (item.id)}
          <div class="cart-item">
            <img src={item.imageUrl} alt={item.name} class="cart-item-image" />
            <div class="cart-item-details">
              <div class="cart-item-header">
                <h4>{item.name}</h4>
                <span class="cart-item-total">₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
              <div class="cart-item-controls">
                <div class="quantity-controls">
                  <button onclick={() => updateQty(item.id, -1)} class="quantity-button">
                    <Minus class="quantity-icon"/>
                  </button>
                  <span class="quantity-display">{item.quantity}</span>
                  <button onclick={() => updateQty(item.id, 1)} class="quantity-button">
                    <Plus class="quantity-icon"/>
                  </button>
                </div>
                <button onclick={() => updateQty(item.id, -999)} class="delete-button">
                  <Trash2 class="delete-icon" />
                </button>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="empty-cart">
          <div class="empty-cart-icon">
            <Search class="empty-search-icon" />
          </div>
          <p class="empty-cart-title">Cart is empty</p>
          <p class="empty-cart-subtitle">Select items to start order</p>
        </div>
      {/if}
    </div>

    <div class="cart-footer">
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₱{total.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Tax (3%)</span>
          <span>₱{Math.round(total * 0.03).toLocaleString()}</span>
        </div>
        <div class="summary-total">
          <span>Total</span>
          <span class="total-amount">₱{roundedGrandTotal.toLocaleString()}</span>
        </div>
      </div>
      <button 
        onclick={openCheckout}
        disabled={cart.length === 0}
        class="checkout-button"
      >
        Checkout Now
      </button>
    </div>
  </div>

  
  {#if showCheckoutModal}
    <div class="modal-overlay">
      <div class="checkout-modal">
        <div class="modal-header">
          <h2>Checkout</h2>
          <button onclick={closeCheckoutModal} class="close-modal-button">×</button>
        </div>

        <div class="modal-content modal-flex">
          <!-- LEFT: Order Summary -->
          <div class="order-summary-section left-side">
            <h3>Order Summary</h3>
            <div class="summary-box">
              <div class="summary-line">
                <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>

              <!-- Discount Section -->
              <div class="summary-line">
                <span>Discount</span>
                <div class="discount-controls">
                  {#if discountType === 'none'}
                    <button onclick={() => applyDiscount('pwd')} class="discount-button pwd">
                      <UserCircle size={16} /> PWD
                    </button>
                    <button onclick={() => applyDiscount('senior')} class="discount-button senior">
                      <Users size={16} /> Senior
                    </button>
                  {:else}
                    <div class="applied-discount">
                      <span class="discount-type">
                        {discountType === 'pwd' ? 'PWD' : 'Senior Citizen'} 
                        ({discountPercentage}%)
                      </span>
                      <span class="discount-amount">-₱{discountAmount.toLocaleString()}</span>
                      <button onclick={removeDiscount} class="remove-discount">×</button>
                    </div>
                  {/if}
                </div>
              </div>

              <div class="summary-line">
                <span>Tax (3%)</span>
                <span>₱{tax.toLocaleString()}</span>
              </div>

              <div class="summary-total-line">
                <span>Total to Pay</span>
                <span class="total-highlight">₱{roundedGrandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Payment Method -->
          <div class="payment-method-section right-side">
            <h3>Payment Method</h3>
            <div class="payment-methods">
              <button 
                onclick={() => setPaymentMethod('card')}
                class="payment-button {paymentMethod === 'card' ? 'selected' : ''}"
              >
                <CreditCard class="payment-icon" />
                <span>Card Payment</span>
              </button>
              <button 
                onclick={() => setPaymentMethod('cash')}
                class="payment-button {paymentMethod === 'cash' ? 'selected' : ''}"
              >
                <Banknote class="payment-icon" />
                <span>Cash Payment</span>
              </button>
              <button 
                onclick={() => setPaymentMethod('gcash')}
                class="payment-button {paymentMethod === 'gcash' ? 'selected' : ''}"
              >
                <QrCode class="payment-icon" />
                <span>GCash</span>
              </button>
            </div>

            {#if paymentMethod === 'cash'}
              <div class="cash-payment-section">
                <label for="cash-input">Cash Received</label>
                <div class="cash-input-wrapper">
                  <span>₱</span>
                  <input type="number" id="cash-input" bind:value={cashAmount} placeholder="0.00"/>
                </div>
                {#if changeAmount > 0}
                  <div class="change-display">
                    <span>Change:</span>
                    <span>₱{changeAmount.toLocaleString()}</span>
                  </div>
                {/if}
              </div>
            {/if}

            {#if paymentMethod === 'gcash'}
              <div class="gcash-payment-section scrollable">

                <!-- Header -->
                <div class="gcash-header">
                  <div class="gcash-instructions">
                    <h4>Scan to Pay via GCash</h4>
                    <p>Scan the QR code using your GCash app</p>
                  </div>
                </div>

                <!-- Scrollable GCASH Content -->
                <div class="gcash-content-wrapper">

                  <!-- QR Code -->
                  <div class="qr-code-container">
                    <div class="qr-code-placeholder">
                      <div class="qr-code-icon">
                        <QrCode size={120} />
                      </div>
                      <p class="qr-amount">
                        ₱{roundedGrandTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <!-- Payment Details -->
                  <div class="gcash-details">
                    <div class="detail-item">
                      <span class="detail-label">Merchant:</span>
                      <span class="detail-value">Aegix Store</span>
                    </div>

                    <div class="detail-item">
                      <span class="detail-label">Reference No:</span>
                      <span class="detail-value">
                        TXN-{Date.now().toString().slice(-8)}
                      </span>
                    </div>

                    <div class="detail-item">
                      <span class="detail-label">Amount:</span>
                      <span class="amount-highlight">
                        ₱{roundedGrandTotal.toLocaleString()}
                      </span>
                    </div>

                    <div class="detail-item">
                      <span class="detail-label">Date:</span>
                      <span class="detail-value">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>

                    <div class="detail-item">
                      <span class="detail-label">Time:</span>
                      <span class="detail-value">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                      </span>
                    </div>
                  </div>

                  <!-- Notes / Instructions -->
                  <div class="gcash-notes">
                    <div class="note-item">
                      <div class="note-bullet">1</div>
                      <span>Open GCash app and tap "Scan QR"</span>
                    </div>

                    <div class="note-item">
                      <div class="note-bullet">2</div>
                      <span>Scan the QR code above</span>
                    </div>

                    <div class="note-item">
                      <div class="note-bullet">3</div>
                      <span>Confirm payment details</span>
                    </div>

                    <div class="note-item">
                      <div class="note-bullet">4</div>
                      <span>Enter your MPIN to complete</span>
                    </div>
                  </div>

                </div>

                <!-- Sticky Payment Status -->
                <div class="payment-status">
                  <div class="status-indicator">
                    <div class="status-dot waiting"></div>
                    <span>Waiting for payment...</span>
                  </div>
                </div>

              </div>
            {/if}

          </div>
        </div>

        <div class="modal-actions">
          <button onclick={closeCheckoutModal} class="cancel-button">Cancel</button>
          <button 
            onclick={handleProcessPayment}
            disabled={!paymentMethod || (paymentMethod === 'cash' && Number(cashAmount) < roundedGrandTotal)}
            class="confirm-button"
          >
            {paymentMethod === 'gcash' ? 'Confirm GCash Payment' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Success Modal -->
  {#if showSuccessModal && transactionDetails}
    <div class="modal-overlay">
      <div class="success-modal">
        <div class="success-header">
          <div class="success-icon">
            <ShieldCheck class="success-check-icon" />
          </div>
          <h2>Payment Successful</h2>
          <p>Thank you for your purchase!</p>
        </div>
        
        <div class="success-content">
          <div class="success-store-info">
            <h3>Aegix POS</h3>
            <p>{transactionDetails.date}, {transactionDetails.time}</p>
          </div>

          <div class="success-items-list">
            {#each transactionDetails.items as item}
              <div class="success-item">
                <div class="item-details">
                  <span class="item-name">{item.name}</span>
                  <span class="item-quantity">{item.quantity} x ₱{item.price}</span>
                </div>
                <span class="item-total">₱{item.price * item.quantity}</span>
              </div>
            {/each}
          </div>

          <div class="success-summary">
            <div class="summary-line">
              <span>Subtotal</span>
              <span>₱{transactionDetails.subtotal?.toLocaleString()}</span>
            </div>
            <div class="summary-line">
              <span>Tax</span>
              <span>₱{transactionDetails.tax?.toLocaleString()}</span>
            </div>
            <div class="total-line">
              <span>TOTAL</span>
              <span>₱{transactionDetails.total.toLocaleString()}</span>
            </div>
          </div>

          <div class="transaction-details">
            <div class="detail-line">
              <span>Payment Method:</span>
              <span class="payment-method-text">{transactionDetails.paymentMethod}</span>
            </div>
            <div class="detail-line">
              <span>Transaction ID:</span>
              <span class="transaction-id-text">{transactionDetails.id.split('-')[1]}</span>
            </div>
            {#if transactionDetails.change && transactionDetails.change > 0}
              <div class="change-line">
                <span>Change:</span>
                <span>₱{transactionDetails.change.toLocaleString()}</span>
              </div>
            {/if}
          </div>

          <div class="success-actions">
            <button onclick={printReceipt} class="print-button">Print Receipt</button>
            <button onclick={startNewSale} class="new-sale-button">New Sale</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Main Container */
  .cashier-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #f5f3f3;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /* Left Section: Catalog */
  .catalog-section {
    margin-top: 20px;
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 95vh;
    width: 95vw;
    border-radius: 30px;
    gap: 1rem;
    overflow: hidden;
    background-color: white;
    border-radius: 25px;
    border: 2px solid rgb(241 245 249);
    transition: border-color 0.2s;
  }

  /* Header Controls */
  .header-controls {
    display: flex;
    gap: -1rem;
  }

  .back-button {
    height: 40px;
    width: 8%;
    margin-left: 5%;
    margin-right: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    border: 2px solid #3B5AFE;
    color: #3B5AFE;
    background-color: white;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    cursor: pointer;
  }

  .back-button:hover {
    background-color: #3B5AFE;
    color: white;
  }

  .home-button {
    height: 40px;
    width: 8%;
    margin-left: 45px;
    margin-right: 1rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    border: 2px solid rgb(34 197 94);
    color: rgb(34 197 94);
    background-color: white;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    cursor: pointer;
  }

  .home-button:hover {
    background-color: rgb(34 197 94);
    color: white;
  }

  .admin-button {
    height: 40px;
    width: 9%;
    margin-left: 55%;
    margin-right: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    border: 2px solid rgb(168 85 247);
    color: rgb(168 85 247);
    background-color: white;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: -1rem;
  }

  .admin-button:hover {
    background-color: rgb(168 85 247);
    color: white;
  }

  .logout-button-cashier {
    height: 40px;
    width: 8%;
    margin-left: auto;
    margin-right: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    border: 2px solid rgb(239 68 68);
    color: rgb(239 68 68);
    background-color: white;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    cursor: pointer;
  }

  .logout-button-cashier:hover {
    background-color: rgb(239 68 68);
    color: white;
  }

  /* Categories Container */
  .categories-container {
    margin-left: 45px;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .category-button {
    height: 40px;
    width: 10%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    border: 2px solid #3B5AFE;
    transition: all 0.2s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    justify-content: center;
  }

  .category-button.active {
    background-color: #3B5AFE;
    color: white;
    border-color: #3B5AFE;
  }

  .category-button:not(.active) {
    background-color: white;
    color: #3B5AFE;
  }

  .category-button:not(.active):hover {
    background-color: rgb(219 234 254);
  }

  .current-product-indicator {
    margin-left: 58%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #3B5AFE;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
  }

  /* Gender Section */
  .gender-section {
    margin-left: 45px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: auto; /* Remove fixed width */
  height: auto; /* Remove fixed height */
  align-items: flex-start; /* Align items to the left */
}

  .gender-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gender-tabs {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .gender-button {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 2px solid #3B5AFE;
    transition: all 0.2s;
    cursor: pointer;
  }

  .gender-button.active {
    background-color: #3B5AFE;
    color: white;
  }

  .gender-button:not(.active) {
    background-color: white;
    color: #3B5AFE;
  }

  .gender-button:not(.active):hover {
    background-color: rgb(219 234 254);
  }

  .kids-subcategories {
    display: flex;
    gap: 0.75rem;
    padding-left: 1rem;
    border-left: 2px solid rgb(229 231 235);
  }

  .kids-button {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 2px solid #3B5AFE;
    transition: all 0.2s;
    cursor: pointer;
  }

  .kids-button.active {
    background-color: #3B5AFE;
    color: white;
  }

  .kids-button:not(.active) {
    background-color: white;
    color: #3B5AFE;
  }

  .kids-button:not(.active):hover {
    background-color: rgb(219 234 254);
  }

  .search-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 2px solid rgb(229 231 235);
  border-radius: 9999px;
  width: 16rem;
  height: 40px;

  /* center-ish with a little space to the right */
  margin-left: auto;
  margin-right: 2rem; /* adjust this value to move it left/right */
}



  .search-input {
    border: none;
    outline: none;
    font-size: 0.875rem;
    flex: 1;
    background-color: transparent;
  }

  /* Content Area */
  .content-area {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-top: 40px;
  }

  /* Products Grid */
  /* Products Grid - 3 per line on all screen sizes */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem; /* Reduced gap */
  padding-bottom: 1rem;
}

/* Product Card - Reduced width */
.product-card {
  margin-left: 30px;
  background-color: white;
  border-radius: 1rem;
  padding: 0.75rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  height: 13rem; 
  gap: 0.75rem; 
  cursor: pointer;
  transition: all 0.2s;
  max-width: 80%; 
}

.product-card:hover {
  border-color: rgb(191 219 254);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  height: 7rem; 
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(249 250 251);
  border-radius: 0.75rem;
  transition: transform 0.2s;
  overflow: hidden; 
}

.product-card:hover .product-image-container {
  transform: scale(1.05);
}

.product-image {
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  padding: 0.25rem; 
}

.product-info {
  text-align: center;
  width: 100%;
}

.product-name {
  font-weight: bold;
  color: #3B5AFE;
  transition: color 0.2s;
  font-size: 0.875rem; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.product-card:hover .product-name {
  color: #3B5AFE;
}

.product-count {
  font-size: 0.75rem;
  background-color: rgb(243 244 246);
  color: rgb(107 114 128);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 9999px;
  margin-top: 0.5rem;
  display: inline-block;
}

/* Subitems Grid - Also 3 per line */
.subitems-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Changed to 3 per line */
  gap: 0.75rem; /* Reduced gap */
  padding-bottom: 1rem;
}

.subitem-card {
  margin-left: 50px;
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
  max-width: 80%; /* Ensure it doesn't exceed grid cell */
}

.subitem-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.subitem-image-container {
  height: 8rem; /* Reduced height */
  background-color: rgb(243 244 246);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem; /* Reduced padding */
  overflow: hidden; /* Ensure image doesn't overflow */
}

.subitem-image {
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  padding: 0.25rem; /* Add some padding around image */
}

.subitem-content {
  padding: 0.625rem; /* Reduced padding */
  display: flex;
  flex-direction: column;
  flex: 1;
}

.subitem-name {
  font-weight: 600;
  color: rgb(30 41 59);
  font-size: 0.8125rem; /* Slightly smaller font */
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Allow 2 lines for better readability */
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5em; /* Set minimum height for consistent layout */
}

.subitem-price {
  color: rgb(16 185 129);
  font-weight: bold;
  font-size: 0.8125rem; /* Slightly smaller font */
  margin-bottom: 0.5rem; /* Reduced margin */
}

.subitem-button {
  margin-top: auto;
  width: 100%;
  padding: 0.375rem; /* Reduced padding */
  border-radius: 0.5rem;
  font-size: 0.6875rem; /* Smaller font */
  font-weight: bold;
  transition: background-color 0.2s;
  cursor: pointer;
  white-space: nowrap;
}

.subitem-button.in-cart {
  background-color: rgb(254 242 242);
  color: rgb(220 38 38);
}

.subitem-button.in-cart:hover {
  background-color: rgb(254 226 226);
}

.subitem-button:not(.in-cart) {
  background-color: rgb(37 99 235);
  color: white;
}

.subitem-button:not(.in-cart):hover {
  background-color: rgb(29 78 216);
}

/* For mobile responsiveness, reduce to 2 per line on very small screens */
@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .subitems-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .product-card {
    height: 12rem; /* Further reduce height on mobile */
    padding: 0.5rem;
  }
  
  .product-image-container {
    height: 6rem;
  }
  
  .subitem-image-container {
    height: 7rem;
  }
} 

  /* Empty State */
  .empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(156 163 175);
  }

  /* Right Section: Cart */
  .cart-section {
    width: 20rem;
    background-color: white;
    border-left: 1px solid rgb(226 232 240);
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    z-index: 20;
    margin: 1rem;
    border-radius: 1rem;
    overflow: hidden;
    height: calc(100vh - 2rem);
  }

  .cart-header {
    padding: 1.25rem;
    border-bottom: 1px solid rgb(241 245 249);
    background-color: rgba(248 250 252, 0.5);
  }

  .cart-header h3 {
    font-weight: bold;
    color: rgb(30 41 59);
    font-size: 1.125rem;
  }

  .cart-header p {
    font-size: 0.75rem;
    color: rgb(148 163 184);
    margin-top: 0.25rem;
  }

  .cart-items-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Cart Items */
  .cart-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: rgb(248 250 252);
    border-radius: 0.75rem;
    border: 1px solid rgb(241 245 249);
    transition: border-color 0.2s;
  }

  .cart-item:hover {
    border-color: rgb(191 219 254);
  }

  .cart-item-image {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    object-fit: cover;
    background-color: white;
    border: 1px solid rgb(241 245 249);
  }

  .cart-item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cart-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .cart-item-header h4 {
    font-weight: 600;
    font-size: 0.875rem;
    color: rgb(30 41 59);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cart-item-total {
    font-weight: bold;
    font-size: 0.75rem;
    color: rgb(16 185 129);
  }

  .cart-item-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    border: 1px solid rgb(226 232 240);
    padding: 0.125rem;
  }

  .quantity-button {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(100 116 139);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .quantity-button:hover {
    color: rgb(37 99 235);
    background-color: rgb(248 250 252);
  }

  .quantity-display {
    font-size: 0.75rem;
    font-weight: bold;
    width: 1rem;
    text-align: center;
  }

  .delete-button {
    color: rgb(156 163 175);
    transition: color 0.2s;
    cursor: pointer;
  }

  .delete-button:hover {
    color: rgb(239 68 68);
  }

  /* Empty Cart */
  .empty-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(148 163 184);
    gap: 0.5rem;
  }

  .empty-cart-icon {
    width: 4rem;
    height: 4rem;
    background-color: rgb(241 245 249);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .empty-cart-title {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .empty-cart-subtitle {
    font-size: 0.75rem;
  }

  /* Cart Footer */
  .cart-footer {
    padding: 1.25rem;
    border-top: 1px solid rgb(241 245 249);
    background-color: rgba(248 250 252, 0.5);
  }

  .cart-summary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: rgb(100 116 139);
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.125rem;
    font-weight: bold;
    color: rgb(30 41 59);
    padding-top: 0.5rem;
    border-top: 1px solid rgb(226 232 240);
  }

  .total-amount {
    color: rgb(37 99 235);
  }

  .checkout-button {
    width: 100%;
    padding: 0.75rem;
    background-color: rgb(37 99 235);
    color: white;
    border-radius: 0.75rem;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    transition: all 0.2s;
    cursor: pointer;
  }

  .checkout-button:hover {
    background-color: rgb(29 78 216);
  }

  .checkout-button:disabled {
    background-color: rgb(209 213 219);
    box-shadow: none;
    cursor: not-allowed;
  }

  /* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s;
  width: 200%;
  padding: 20rem; /* dagdagan para may space sa gilid */
  overflow-y: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.checkout-modal {
  background-color: white;
  border-radius: 12px;
  width: 90vw; /* responsive width, hindi sobra */
  max-width: 1000px; /* limit para desktop */
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden; /* important: alisin scrollbar sa parent */
  margin: 0 auto; /* center modal */
  display: flex;
  flex-direction: column;
  max-height: 90vh; /* prevent modal from being too tall */
  box-sizing: border-box; /* padding included sa width/height */
}

.modal-content {
  flex: 1; /* mag-stretch ang content */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: visible; /* hindi auto para hindi lumabas scrollbar sa parent */
}



/* Modal Header */
.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgb(241 245 249);
  background-color: rgb(248 250 252);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0; /* Prevent header from shrinking */
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(30 41 59);
}

.modal-content.modal-flex {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.close-modal-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: rgb(100 116 139);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.close-modal-button:hover {
  background-color: rgb(241 245 249);
}

.left-side {
  flex: 1 1 45%;
  min-width: 300px;
}

.right-side {
  flex: 1 1 50%;
  min-width: 300px;
}

/* MODAL CONTENT */
.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: calc(90vh - 130px);
}

/* GCASH MAIN SECTION */
.gcash-payment-section.scrollable {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  max-height: 400px;
   overflow-y: auto;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
}

/* SCROLLABLE CONTENT */
.gcash-content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overscroll-behavior: contain;
}

/* HEADER (STICKY) */
.gcash-header {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.gcash-instructions {
  text-align: center;
}

.gcash-instructions h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.gcash-instructions p {
  color: #64748b;
  font-size: 0.875rem;
}

/* QR CODE */
.qr-code-container {
  display: flex;
  justify-content: center;
}

.qr-code-placeholder {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 200px;
}

.qr-code-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f9ff;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  color: #0ea5e9;
}

.qr-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* DETAILS */
.gcash-details {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-item:last-child {
  border-bottom: 0;
}

.detail-label {
  color: #64748b;
  font-size: 0.8125rem;
  font-weight: 500;
}

.detail-value {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.8125rem;
}

.amount-highlight {
  color: #059669 !important;
  font-weight: 700;
}

/* NOTES */
.gcash-notes {
  background: #f0f9ff;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #bae6fd;
}

.note-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.note-item:last-child {
  margin-bottom: 0;
}

.note-bullet {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #0ea5e9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: bold;
  flex-shrink: 0;
}

.note-item span {
  font-size: 0.8125rem;
  color: #334155;
  line-height: 1.3;
}

/* PAYMENT STATUS (STICKY BOTTOM) */
.payment-status {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.status-dot.waiting {
  background: #f59e0b;
  animation: pulse 1.5s infinite;
}

.status-indicator span {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 500;
}

/* SCROLLBAR */
.gcash-content-wrapper::-webkit-scrollbar {
  width: 5px;
}
.gcash-content-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}
.gcash-content-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.gcash-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* RESPONSIVE */
@media (max-height: 700px) {
  .gcash-payment-section.scrollable {
    max-height: 300px;
  }
}

@media (max-height: 600px) {
  .gcash-payment-section.scrollable {
    max-height: 250px;
  }
  .gcash-content-wrapper {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

/* ANIMATION */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}


/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(241 245 249);
  flex-shrink: 0; /* Prevent footer from shrinking */
}

.cancel-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgb(243 244 246);
  color: rgb(55 65 81);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: rgb(229 231 235);
}

.confirm-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgb(37 99 235);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-button:hover {
  background-color: rgb(29 78 216);
}

.confirm-button:disabled {
  background-color: rgb(209 213 219);
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .checkout-modal {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .modal-content {
    padding: 1rem;
    gap: 1rem;
  }
  
  .gcash-payment-section {
    height: 280px; /* Adjusted for mobile */
  }
}

@media (min-width: 768px) {
  .checkout-modal {
    max-width: 30rem;
  }
}

/* Custom scrollbar for modal content */
.modal-content::-webkit-scrollbar,
.gcash-scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track,
.gcash-scrollable-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb,
.gcash-scrollable-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover,
.gcash-scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.checkout-modal {
  animation: slideIn 0.3s ease-out;
}

  .order-summary-section {
    margin-bottom: 1.5rem;
  }

  .order-summary-section h3 {
    font-size: 0.875rem;
    font-weight: bold;
    color: rgb(100 116 139);
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .summary-box {
    background-color: rgb(248 250 252);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(241 245 249);
  }

  .summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: rgb(71 85 105);
  }

  .summary-total-line {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.25rem;
    color: rgb(30 41 59);
    padding-top: 0.5rem;
    border-top: 1px solid rgb(226 232 240);
    margin-top: 0.5rem;
  }

  .total-highlight {
    color: rgb(37 99 235);
  }

  .payment-method-section {
    margin-bottom: 1.5rem;
  }

  .payment-method-section h3 {
    font-size: 0.875rem;
    font-weight: bold;
    color: rgb(100 116 139);
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .payment-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .payment-button {
    padding: 1rem;
    border-radius: 0.75rem;
    border: 2px solid rgb(241 245 249);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
    cursor: pointer;
  }

  .payment-button.selected {
    border-color: rgb(37 99 235);
    background-color: rgb(219 234 254);
    color: rgb(37 99 235);
  }

  .payment-button:not(.selected):hover {
    border-color: rgb(191 219 254);
  }

  .payment-button span {
    font-weight: 600;
    font-size: 0.875rem;
  }

  .cash-payment-section {
    margin-bottom: 1.5rem;
    animation: slideIn 0.2s;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cash-input-container {
    background-color: rgb(254 243 199);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(253 230 138);
  }

  .cash-input-label {
    display: block;
    font-size: 0.875rem;
    font-weight: bold;
    color: rgb(55 65 81);
    margin-bottom: 0.5rem;
  }

  .cash-input-wrapper {
    position: relative;
  }

  .cash-currency {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(107 114 128);
    font-weight: bold;
  }

  .cash-input {
    width: 100%;
    padding-left: 2rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(209 213 219);
    outline: none;
  }

  .cash-input:focus {
    border-color: rgb(59 130 246);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  .change-display {
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(22 163 74);
    font-weight: bold;
    background-color: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(220 252 231);
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .cancel-button {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(226 232 240);
    font-weight: bold;
    color: rgb(71 85 105);
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .cancel-button:hover {
    background-color: rgb(248 250 252);
  }

  .confirm-button {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.75rem;
    background-color: rgb(37 99 235);
    color: white;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    transition: all 0.2s;
    cursor: pointer;
  }

  .confirm-button:hover {
    background-color: rgb(29 78 216);
  }

  .confirm-button:disabled {
    background-color: rgb(209 213 219);
    box-shadow: none;
    cursor: not-allowed;
  }

  /* Success Modal */
  .success-modal {
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 24rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    margin: 1rem;
    animation: zoomIn 0.2s;
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .success-header {
    background-color: rgb(16 185 129);
    padding: 1.5rem;
    text-align: center;
    color: white;
  }

  .success-icon {
    width: 4rem;
    height: 4rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    backdrop-filter: blur(4px);
  }

  .success-header h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .success-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
  }

  .success-content {
    padding: 1.5rem;
  }

  .success-store-info {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .success-store-info h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: rgb(37 99 235);
  }

  .success-store-info p {
    font-size: 0.75rem;
    color: rgb(148 163 184);
  }

  .success-items-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px dashed rgb(226 232 240);
    padding-bottom: 1.5rem;
    max-height: 12rem;
    overflow-y: auto;
  }

  .success-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  .item-details {
    display: flex;
    flex-direction: column;
  }

  .item-name {
    font-weight: 500;
    color: rgb(30 41 59);
  }

  .item-quantity {
    font-size: 0.75rem;
    color: rgb(100 116 139);
  }

  .item-total {
    font-weight: bold;
    color: rgb(30 41 59);
  }

  .success-summary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .summary-line {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: rgb(100 116 139);
  }

  .total-line {
    display: flex;
    justify-content: space-between;
    font-size: 1.125rem;
    font-weight: bold;
    color: rgb(30 41 59);
    padding-top: 0.5rem;
    border-top: 1px solid rgb(241 245 249);
  }

  .transaction-details {
    background-color: rgb(248 250 252);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(241 245 249);
    font-size: 0.75rem;
    color: rgb(100 116 139);
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-line {
    display: flex;
    justify-content: space-between;
  }

  .payment-method-text {
    font-weight: bold;
    color: rgb(30 41 59);
    text-transform: uppercase;
  }

  .transaction-id-text {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .change-line {
    display: flex;
    justify-content: space-between;
    color: rgb(22 163 74);
    font-weight: bold;
  }

  .success-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .print-button {
    padding: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(226 232 240);
    font-weight: bold;
    color: rgb(71 85 105);
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .print-button:hover {
    background-color: rgb(248 250 252);
  }

  .new-sale-button {
    padding: 0.75rem;
    border-radius: 0.75rem;
    background-color: rgb(37 99 235);
    color: white;
    font-weight: bold;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .new-sale-button:hover {
    background-color: rgb(29 78 216);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .cashier-container {
      flex-direction: column;
    }
    
    .catalog-section {
      padding-right: 1rem;
    }
    
    .cart-section {
      width: 100%;
      margin: 0;
      border-radius: 0;
      height: auto;
      max-height: 50vh;
    }
  }

  /* Discount Styles */
.discount-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.discount-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.discount-button:hover {
  transform: translateY(-1px);
}

.discount-button.pwd {
  color: #059669;
  border-color: #34d399;
  background-color: #ecfdf5;
}

.discount-button.senior {
  color: #7c3aed;
  border-color: #a78bfa;
  background-color: #f5f3ff;
}

.applied-discount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: #f0f9ff;
  border: 1px solid #0ea5e9;
}

.discount-type {
  font-size: 0.75rem;
  font-weight: 600;
  color: #0369a1;
}

.discount-amount {
  font-size: 0.875rem;
  font-weight: 700;
  color: #dc2626;
}

.remove-discount {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  margin-left: 0.25rem;
}

.remove-discount:hover {
  color: #dc2626;
}

/* GCash Payment Styles */
.gcash-payment-section {
  background-color: #f8fafc;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
  width: 100%;
}

.gcash-instructions {
  text-align: center;
  margin-bottom: 1.5rem;
}

.gcash-instructions h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.gcash-instructions p {
  color: #64748b;
  font-size: 0.875rem;
}

.qr-code-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.qr-code-placeholder {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.qr-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 0.75rem;
}

.gcash-details {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item span:first-child {
  color: #64748b;
  font-size: 0.875rem;
}

.detail-item span:last-child {
  font-weight: 600;
  color: #1e293b;
}

.amount-highlight {
  color: #059669 !important;
  font-size: 1rem;
  font-weight: 700;
}

/* Update payment methods grid */
.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

/* Update summary line for discount */
.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.summary-line .discount-controls {
  margin-left: auto;
}


</style>