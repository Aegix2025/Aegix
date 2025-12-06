<script lang="ts">
  import Login from '$lib/components/Login.svelte';
  import AdminDashboard from '$lib/components/AdminDashboard.svelte';
  import CashierView from '$lib/components/CashierView.svelte';
  import { RAW_CATEGORIES } from '$lib/constants';
  import { UserRole, type User, type Product, type Transaction, type CartItem } from '$lib/types';
  
  let users = $state<User[]>([
    { id: 'admin', username: 'admin', role: UserRole.ADMIN, name: 'Manager' },
    { id: 'c1', username: 'cashier', role: UserRole.CASHIER, name: 'Yan' }
  ]);

  let products = $state<Product[]>([]);
  let transactions = $state<Transaction[]>([]);
  let currentUser = $state<User | null>(null);
  let currentView = $state<string>('login'); // 'login', 'admin', 'cashier'

  function handleLogin(user: User) {
    currentUser = user;
    if (user.role === UserRole.ADMIN) {
        currentView = 'admin';
    } else {
        currentView = 'cashier';
    }
  }

  function handleLogout() {
    currentUser = null;
    currentView = 'login';
  }

  function handleCheckout(items: CartItem[], total: number, paymentMethod: string, change: number) {
    const subtotal = Math.round(total);
    const tax = Math.round(subtotal * 0.03); 
    const finalTotal = Math.round(subtotal + tax);
    const now = new Date();

    const txn: Transaction = {
      id: `txn-${Date.now()}`,
      cashierId: currentUser?.id || 'unknown',
      items: [...items],
      total: finalTotal,
      subtotal: subtotal,
      tax: tax,
      timestamp: Date.now(),
      paymentMethod,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      change: change
    };
    
    // Update central transaction state so AdminDashboard sees it immediately
    transactions = [txn, ...transactions];
    
    return txn;
  }

  function handleSwitchToCashier() {
    currentView = 'cashier';
  }

  function handleSwitchToAdmin() {
    currentView = 'admin';
  }
</script>

<main class="min-h-screen bg-slate-50 text-slate-900">
  {#if currentView === 'login'}
    <Login {users} onLogin={handleLogin} onAddUser={(u: User) => { users = [...users, u]; }} />

  {:else if currentView === 'admin' && currentUser}
    <AdminDashboard 
      currentUser={currentUser}
      {users}
      {products}
      {transactions}
      onLogout={handleLogout}
      onSwitchToCashier={handleSwitchToCashier}
      onAddProduct={() => {}}
      onDeleteProduct={() => {}}
      onAddUser={() => {}}
      onDeleteUser={() => {}}
    />

  {:else if currentView === 'cashier' && currentUser}
    <CashierView 
      categories={RAW_CATEGORIES}
      onLogout={handleLogout} 
      onSwitchToAdmin={handleSwitchToAdmin}
      onCheckout={handleCheckout} 
    />
  {/if}
</main>