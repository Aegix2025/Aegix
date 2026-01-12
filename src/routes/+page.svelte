<script lang="ts">
  import Welcome from '$lib/components/Welcome.svelte';
  import Login from '$lib/components/Login.svelte';
  import AdminDashboard from '$lib/components/AdminDashboard.svelte';
  import CashierView from '$lib/components/CashierView.svelte';
  import { RAW_CATEGORIES } from '$lib/constants';
  import { UserRole, type User, type Product, type Transaction, type CartItem } from '$lib/types';
  
  // Initial users
  let users = $state<User[]>([
    { 
      id: 'admin', 
      username: 'admin', 
      role: UserRole.ADMIN, 
      name: 'Manager',
      email: 'admin@store.com',
      status: 'active',
      createdAt: new Date().toISOString()
    },
    { 
      id: 'cashier_001', 
      username: 'cashier1', 
      role: UserRole.CASHIER, 
      name: 'Yan',
      email: 'yan@store.com',
      status: 'active',
      createdAt: new Date().toISOString()
    },
    { 
      id: 'cashier_002', 
      username: 'cashier2', 
      role: UserRole.CASHIER, 
      name: 'Maria',
      email: 'maria@store.com',
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ]);

  let products = $state<Product[]>([
    { id: '1', name: 'T-Shirt Basic', price: 450, category: 'Clothing', stock: 50 },
    { id: '2', name: 'Jeans Classic', price: 1800, category: 'Clothing', stock: 30 },
    { id: '3', name: 'Running Shoes', price: 2200, category: 'Footwear', stock: 25 },
    { id: '4', name: 'Leather Bag', price: 1500, category: 'Accessories', stock: 15 }
  ]);

  let transactions = $state<Transaction[]>([]);
  let currentUser = $state<User | null>(null);
  let currentView = $state<string>('welcome');
  let activeSessions = $state<Record<string, any>>({});

  // Load sessions from localStorage
  $effect(() => {
    const savedSessions = localStorage.getItem('activeCashierSessions');
    if (savedSessions) {
      activeSessions = JSON.parse(savedSessions);
    }
  });

  // Save sessions to localStorage when they change
  $effect(() => {
    localStorage.setItem('activeCashierSessions', JSON.stringify(activeSessions));
  });

  function handleLogin(user: User) {
    currentUser = {
      ...user,
      isLoggedIn: true,
      lastLogin: new Date().toISOString()
    };
    
    // Update active sessions
    activeSessions = {
      ...activeSessions,
      [user.id]: {
        sessionId: user.sessionId,
        terminalId: user.terminalId,
        loginTime: new Date().toISOString(),
        user: user.name
      }
    };
    
    if (user.role === UserRole.ADMIN) {
      currentView = 'admin';
    } else {
      currentView = 'cashier';
    }
  }

  function handleLogout() {
    if (currentUser) {
      // Remove from active sessions
      const newSessions = { ...activeSessions };
      delete newSessions[currentUser.id];
      activeSessions = newSessions;
    }
    
    currentUser = null;
    currentView = 'login';
  }

  function handleSwitchToCashier() {
    currentView = 'cashier';
  }

  function handleSwitchToAdmin() {
    currentView = 'admin';
  }

  function handleCheckout(
    items: CartItem[], 
    subtotal: number, 
    paymentMethod: string, 
    change: number,
    discountType: 'none' | 'pwd' | 'senior',
    discountAmount: number
  ): Transaction {
    const tax = Math.round(subtotal * 0.03);
    const total = Math.round(subtotal - discountAmount + tax);
    const now = new Date();

    const txn: Transaction = {
      id: `txn-${Date.now()}`,
      cashierId: currentUser?.id || 'unknown',
      cashierName: currentUser?.name || 'Unknown',
      items: [...items],
      total: total,
      subtotal: subtotal,
      tax: tax,
      timestamp: Date.now(),
      paymentMethod: paymentMethod as 'cash' | 'card' | 'gcash',
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      change: change,
      status: 'completed',
      discount: discountAmount,
      discountType: discountType
    };
    
    transactions = [txn, ...transactions];
    
    return txn;
  }

  function handleAddProduct(product: Product) {
    if (product.id) {
      // Update existing product
      products = products.map(p => p.id === product.id ? product : p);
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        stock: product.stock || 0
      };
      products = [...products, newProduct];
    }
  }

  function handleDeleteProduct(productId: string) {
    products = products.filter(p => p.id !== productId);
  }

  function handleAddUser(user: User) {
    if (user.id) {
      // Update existing user
      users = users.map(u => u.id === user.id ? user : u);
    } else {
      // Add new user
      const newUser = {
        ...user,
        id: `user_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      users = [...users, newUser];
    }
  }

  function handleDeleteUser(userId: string) {
    // Don't delete if user is currently logged in
    if (activeSessions[userId]) {
      alert('Cannot delete user who is currently logged in');
      return;
    }
    
    // Don't allow deleting own account
    if (userId === currentUser?.id) {
      alert('You cannot delete your own account!');
      return;
    }
    
    users = users.filter(u => u.id !== userId);
  }
</script>

<main class="min-h-screen bg-slate-50 text-slate-900">
  {#if currentView === 'welcome'}
    <Welcome 
      onStart={() => currentView = 'login'}
    />

  {:else if currentView === 'login'}
    <Login 
      {users} 
      onLogin={handleLogin}
      onAddUser={handleAddUser}
      {activeSessions}
    />

  {:else if currentView === 'admin' && currentUser}
    <AdminDashboard 
      {currentUser}
      {users}
      {products}
      {transactions}
      onLogout={handleLogout}
      onSwitchToCashier={handleSwitchToCashier}
      onAddProduct={handleAddProduct}
      onDeleteProduct={handleDeleteProduct}
      onAddUser={handleAddUser}
      onDeleteUser={handleDeleteUser}
    />

  {:else if currentView === 'cashier' && currentUser}
    <CashierView 
      categories={RAW_CATEGORIES}
      onLogout={handleLogout} 
      onSwitchToAdmin={handleSwitchToAdmin}
      onCheckout={handleCheckout}
      currentUser={currentUser}
    />
  {/if}
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>