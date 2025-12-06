<script lang="ts">
  import { LayoutDashboard, FileText, Receipt, Settings, LogOut, Activity, Package, Users, DollarSign, ClipboardList, Store } from 'lucide-svelte';
  import type { User, Product, Transaction, SalesDataPoint } from '../types';

  // Props (Svelte way)
  export let products: Product[] = [];
  export let currentUser: User | null = null;
  export let transactions: Transaction[] = [];
  export let users: User[] = [];
  export let onLogout: () => void = () => {};
  export let onSwitchToCashier: () => void = () => {};
  export let onAddProduct: (p: Product) => void = () => {};
  export let onDeleteProduct: (id: string) => void = () => {};
  export let onAddUser: (u: User) => void = () => {};
  export let onDeleteUser: (id: string) => void = () => {};

  // Local state
  let activeSection: string = 'dashboard';
  let selectedPeriod: 'week' | 'month' = 'week';

  const categoryData = [
    { name: 'Clothing', value: 400 },
    { name: 'Footwear', value: 300 },
    { name: 'Accessories', value: 300 },
  ];
  const COLORS = ['#a855f7', '#c084fc', '#d8b4fe'];

  // Sample sales data for the chart
  const weeklySalesData: SalesDataPoint[] = [
    { date: 'Mon', revenue: 32000 },
    { date: 'Tue', revenue: 28000 },
    { date: 'Wed', revenue: 42000 },
    { date: 'Thu', revenue: 51000 },
    { date: 'Fri', revenue: 69000 },
    { date: 'Sat', revenue: 82000 },
    { date: 'Sun', revenue: 45000 }
  ];

  const monthlySalesData: SalesDataPoint[] = [
    { date: 'Week 1', revenue: 185000 },
    { date: 'Week 2', revenue: 210000 },
    { date: 'Week 3', revenue: 245000 },
    { date: 'Week 4', revenue: 310000 }
  ];

  // Reactive derived values
  $: totalSales = (transactions || []).reduce((sum: number, t: Transaction) => sum + (t.total || 0), 0);
  $: completedOrders = (transactions || []).length;

  // Current chart data based on selected period
  $: currentChartData = selectedPeriod === 'week' ? weeklySalesData : monthlySalesData;

  // Chart path calculations (reactive)
  $: areaPath = (() => {
    if (!currentChartData || currentChartData.length === 0) return '';
    const maxValue = Math.max(...currentChartData.map(d => d.revenue));
    const scale = maxValue === 0 ? 0 : 300 / maxValue;

    let path = `M 0 300 `;
    currentChartData.forEach((data, i) => {
      const x = (i / (currentChartData.length - 1)) * 100;
      const y = 300 - (data.revenue * scale);
      path += `L ${x} ${y} `;
    });
    path += `L 100 300 L 0 300 Z`;
    return path;
  })();

  $: linePath = (() => {
    if (!currentChartData || currentChartData.length === 0) return '';
    const maxValue = Math.max(...currentChartData.map(d => d.revenue));
    const scale = maxValue === 0 ? 0 : 300 / maxValue;

    let path = '';
    currentChartData.forEach((data, i) => {
      const x = (i / (currentChartData.length - 1)) * 100;
      const y = 300 - (data.revenue * scale);

      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        const prevX = ((i - 1) / (currentChartData.length - 1)) * 100;
        const prevY = 300 - (currentChartData[i - 1].revenue * scale);
        const cp1x = prevX + (x - prevX) * 0.5;
        const cp2x = cp1x;
        path += `C ${cp1x} ${prevY} ${cp2x} ${y} ${x} ${y} `;
      }
    });

    return path;
  })();

  // Helper function for data point positioning
  function getDataPointPosition(i: number) {
    if (!currentChartData || !currentChartData[i]) return { left: '0%', top: '0%', revenue: 0 };

    const maxValue = Math.max(...currentChartData.map(d => d.revenue));
    const scale = maxValue === 0 ? 0 : 300 / maxValue;
    const x = (i / (currentChartData.length - 1)) * 100;
    const y = 300 - (currentChartData[i].revenue * scale);
    const topPercent = 100 - (y / 300 * 100);

    return {
      left: `${x}%`,
      top: `${topPercent}%`,
      revenue: currentChartData[i].revenue
    };
  }

  function setSection(section: string) {
    activeSection = section;
  }

  function formatCurrency(amount: number): string {
    return `₱${amount.toLocaleString()}`;
  }

  // Helper functions for chart calculations (kept for possible external use)
  function getYPosition(value: number): number {
    const maxValue = Math.max(...currentChartData.map(d => d.revenue));
    const scale = maxValue === 0 ? 0 : 300 / maxValue;
    return value * scale;
  }

  function getXPosition(index: number): number {
    return (index / (currentChartData.length - 1)) * 100;
  }

  // Data for report and transaction sections (reactive objects)
  $: reportData = {
    totalSales: totalSales,
    totalOrders: completedOrders,
    visitor: 0,
    totalSoldProducts: 0
  };

  $: transactionData = {
    totalAmount: totalSales,
    completedAmount: totalSales,
    pendingAmount: 0
  };

  // Staff Management State
  let showAddStaffModal = false;
  let showDeleteConfirmModal = false;
  let editingStaff: User | null = null;
  let staffToDelete: string | null = null;
  let staffToDeleteName: string = '';
  let newStaff = {
    name: '',
    email: '',
    role: 'STAFF' as 'STAFF' | 'ADMIN' | 'MANAGER',
    password: '',
    status: 'active' as 'active' | 'inactive' | 'on-leave'
  };

  // Staff Management Functions
  function openAddStaffModal() {
    newStaff = {
      name: '',
      email: '',
      role: 'STAFF',
      password: '',
      status: 'active'
    };
    editingStaff = null;
    showAddStaffModal = true;
  }

  function openEditStaffModal(user: User) {
    editingStaff = user;
    const userRole = (user.role || '').toString().toUpperCase();
    const validRole = (userRole === 'ADMIN' || userRole === 'MANAGER') ? (userRole as 'ADMIN' | 'MANAGER') : 'STAFF';
    newStaff = {
      name: user.name || '',
      email: (user as any).email || '',
      role: validRole as 'STAFF' | 'ADMIN' | 'MANAGER',
      password: '',
      status: ((user as any).status as 'active' | 'inactive' | 'on-leave') || 'active'
    };
    showAddStaffModal = true;
  }

  function closeStaffModal() {
    showAddStaffModal = false;
    editingStaff = null;
    newStaff = {
      name: '',
      email: '',
      role: 'STAFF',
      password: '',
      status: 'active'
    };
  }

  function handleStaffSubmit(e?: Event) {
    e?.preventDefault();

    try {
      if (!newStaff.name.trim()) {
        alert('Please enter staff name');
        return;
      }

      if (!editingStaff && !newStaff.password.trim()) {
        alert('Please enter password');
        return;
      }

      if (editingStaff) {
        const updatedUser: User = {
          ...editingStaff,
          name: newStaff.name.trim(),
          role: newStaff.role,
          status: newStaff.status,
          updatedAt: new Date().toISOString(),
          // keep other existing fields
        } as User;
        onAddUser(updatedUser);
      } else {
        const newUser: User = {
          id: `user_${Date.now()}`,
          name: newStaff.name.trim(),
          role: newStaff.role,
          status: newStaff.status,
          password: newStaff.password,
          email: newStaff.email,
          createdAt: new Date().toISOString()
        } as unknown as User;
        onAddUser(newUser);
      }

      closeStaffModal();
      alert(editingStaff ? 'Staff updated successfully!' : 'Staff added successfully!');
    } catch (error) {
      console.error('Error saving staff:', error);
      alert('Error saving staff. Please try again.');
    }
  }

  function handleDeleteStaff(userId: string) {
    const user = users.find(u => u.id === userId);
    if (user) {
      if (user.id === currentUser?.id) {
        alert('You cannot delete your own account!');
        return;
      }
      staffToDelete = userId;
      staffToDeleteName = user.name || '';
      showDeleteConfirmModal = true;
    }
  }

  function confirmDeleteStaff() {
    if (staffToDelete) {
      onDeleteUser(staffToDelete);
      showDeleteConfirmModal = false;
      staffToDelete = null;
      staffToDeleteName = '';
      alert('Staff deleted successfully!');
    }
  }

  // Product Management State
  let showAddProductModal = false;
  let showDeleteProductConfirmModal = false;
  let editingProduct: Product | null = null;
  let productToDelete: string | null = null;
  let productToDeleteName: string = '';
  let newProduct = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  };

  // Product Management Functions
  function openAddProductModal() {
    newProduct = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };
    editingProduct = null;
    showAddProductModal = true;
  }

  function openEditProductModal(product: Product) {
    editingProduct = product;
    newProduct = {
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category || '',
      stock: product.stock || 0,
      imageUrl: product.imageUrl || ''
    };
    showAddProductModal = true;
  }

  function closeProductModal() {
    showAddProductModal = false;
    editingProduct = null;
    newProduct = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };
  }

  function handleProductSubmit(e?: Event) {
    e?.preventDefault();
    try {
      if (editingProduct) {
        const updatedProduct: Product = {
          ...editingProduct,
          ...newProduct
        };
        onAddProduct(updatedProduct);
      } else {
        const newProductData: Product = {
          id: Date.now().toString(),
          ...newProduct
        } as Product;
        onAddProduct(newProductData);
      }
      closeProductModal();
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  }

  function handleDeleteProduct(productId: string) {
    const product = products.find(p => p.id === productId);
    if (product) {
      productToDelete = productId;
      productToDeleteName = product.name;
      showDeleteProductConfirmModal = true;
    }
  }

  function confirmDeleteProduct() {
    if (productToDelete) {
      onDeleteProduct(productToDelete);
      showDeleteProductConfirmModal = false;
      productToDelete = null;
      productToDeleteName = '';
      alert('Product deleted successfully!');
    }
  }
</script>


<div class="dashboard-container">
  <!-- Sidebar (same as before) -->
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo">A</div>
      <h1>Aegix POS</h1>
    </div>

    <div class="sidebar-menu">
      <div class="menu-section">Menu</div>
      
      <button 
        on:click={() => setSection('dashboard')}
        class="menu-button {activeSection === 'dashboard' ? 'active' : ''}"
      >
        <LayoutDashboard size={20} /> Dashboard
      </button>
      
      <button 
        on:click={() => setSection('report')}
        class="menu-button {activeSection === 'report' ? 'active' : ''}"
      >
        <FileText size={20} /> Report
      </button>

      <div class="menu-section">Financial</div>
      <button 
        on:click={() => setSection('transactions')}
        class="menu-button {activeSection === 'transactions' ? 'active' : ''}"
      >
        <Receipt size={20} /> Transactions
      </button>

      <div class="menu-section">Tools</div>
      <button 
        on:click={() => setSection('staff')}
        class="menu-button {activeSection === 'staff' ? 'active' : ''}"
      >
        <Settings size={20} /> Staff
      </button>
      
      <!-- ADDED: Products Menu Button -->
      <button 
        on:click={() => setSection('products')}
        class="menu-button {activeSection === 'products' ? 'active' : ''}"
      >
        <Package size={20} /> Products
      </button>
    </div>

    <div class="sidebar-footer">
      <button 
        on:click={onSwitchToCashier}
        class="cashier-button"
      >
        <Store size={20} /> To Cashier
      </button>
      <button 
        on:click={onLogout}
        class="logout-button"
      >
        <LogOut size={20} /> Sign Out
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <main class="main-content">
    <div class="main-container">
      <div class="main-box">
        <div class="main-content-inner">
          <!-- DASHBOARD SECTION -->
          {#if activeSection === 'dashboard'}
            <div class="space-y-6 pb-10">
              <!-- HEADER -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
                  <p class="text-gray-500 text-sm">
                    Welcome back, <span class="font-semibold text-blue-600">{currentUser?.name}</span>
                  </p>
                </div>
              </div>

              <!-- STAT CARDS -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- CARD 1: Total Sales -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                      ₱
                    </div>
                    <span class="text-xs px-2 py-1 font-bold bg-green-100 text-green-700 rounded-full">
                      {totalSales > 0 ? '+12.5%' : '0%'}
                    </span>
                  </div>
                  <h3 class="text-gray-500 text-sm font-medium">Today's Sales</h3>
                  <p class="text-2xl font-bold text-gray-800">
                    {totalSales > 0 ? `₱${totalSales.toLocaleString()}` : '₱0'}
                  </p>
                </div>

                <!-- CARD 2: Completed Orders -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-md">
                      📦
                    </div>
                    <span class="text-xs px-2 py-1 font-bold bg-green-100 text-green-700 rounded-full">
                      {completedOrders > 0 ? '+8.4%' : '0%'}
                    </span>
                  </div>
                  <h3 class="text-gray-500 text-sm font-medium">Completed Orders</h3>
                  <p class="text-2xl font-bold text-gray-800">
                    {completedOrders > 0 ? completedOrders.toLocaleString() : '0'}
                  </p>
                </div>

                <!-- CARD 3: New Customers -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                      👥
                    </div>
                    <span class="text-xs px-2 py-1 font-bold bg-green-100 text-green-700 rounded-full">
                      {0 > 0 ? '+8.2%' : '0%'}
                    </span>
                  </div>
                  <h3 class="text-gray-500 text-sm font-medium">New Customers</h3>
                  <p class="text-2xl font-bold text-gray-800">0</p>
                </div>

                <!-- CARD 4: Conversion Rate -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
                      📈
                    </div>
                    <span class="text-xs px-2 py-1 font-bold bg-green-100 text-green-700 rounded-full">
                      {0 > 0 ? '+1.2%' : '0%'}
                    </span>
                  </div>
                  <h3 class="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                  <p class="text-1xl font-bold text-gray-800">0%</p>
                </div>
              </div>

              <!-- CHARTS -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- SALES CHART -->
                <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-800">Sales Analytics</h3>
                    <select 
                      bind:value={selectedPeriod}
                      class="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1 text-gray-600"
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                  
                  <!-- Custom Chart Container -->
                  <div class="chart-container h-64 relative">
                    <div class="chart-wrapper w-full h-full relative">
                      <!-- Grid Lines -->
                      <div class="chart-grid absolute inset-0 flex flex-col justify-between">
                        {#each [0, 1, 2, 3, 4] as i}
                          <div class="grid-line border-t border-gray-100"></div>
                        {/each}
                      </div>
                      
                      <!-- Y-axis labels -->
                      <div class="y-axis absolute left-0 top-0 h-full flex flex-col justify-between py-2">
                        {#each [4, 3, 2, 1, 0] as i}
                          <div class="y-label text-xs text-gray-500">
                            {#if selectedPeriod === 'week'}
                              ₱{(i * 20000).toLocaleString()}
                            {:else}
                              ₱{(i * 80000).toLocaleString()}
                            {/if}
                          </div>
                        {/each}
                      </div>
                      
                      <!-- Chart Area -->
                      <div class="chart-area absolute left-8 right-0 top-0 bottom-8">
                        <!-- Area Gradient Background -->
                        <svg class="chart-background absolute inset-0" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
                              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                          <path 
                            d={areaPath}
                            fill="url(#salesGradient)"
                          />
                        </svg>
                        
                        <!-- Line Chart -->
                        <svg class="chart-line absolute inset-0" preserveAspectRatio="none">
                          <path 
                            d={linePath}
                            stroke="#3b82f6" 
                            stroke-width="3" 
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        
                        <!-- Data Points -->
                        {#each currentChartData as data, i}
                          {@const pos = getDataPointPosition(i)}
                          <div 
                            class="data-point absolute w-3 h-3 rounded-full bg-white border-2 border-blue-500 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style="left: {pos.left}; top: {pos.top}"
                          >
                            <!-- Tooltip -->
                            <div class="data-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                              <div class="font-semibold">{data.date}</div>
                              <div>₱{data.revenue.toLocaleString()}</div>
                            </div>
                          </div>
                        {/each}
                      </div>
                      
                      <!-- X-axis labels -->
                      <div class="x-axis absolute bottom-0 left-8 right-0 flex justify-between px-2">
                        {#each currentChartData as data}
                          <div class="x-label text-xs text-gray-500 -rotate-45 origin-top-left">{data.date}</div>
                        {/each}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CATEGORY CHART -->
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 class="text-lg font-bold text-gray-800 mb-6">Top Categories</h3>
                  
                  <!-- Pie Chart -->
                  <div class="relative h-40 flex items-center justify-center">
                    <svg width="160" height="160" viewBox="0 0 160 160" class="pie-chart">
                      {#each categoryData as category, i}
                        <!-- Calculate angles for pie chart -->
                        {@const totalValue = categoryData.reduce((sum, c) => sum + c.value, 0)}
                        {@const startAngle = categoryData.slice(0, i).reduce((sum, c) => sum + (c.value / totalValue), 0) * 360}
                        {@const endAngle = startAngle + (category.value / totalValue) * 360}
                        {@const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0}
                        
                        <!-- Convert angles to SVG path -->
                        {@const startRad = (startAngle * Math.PI) / 180}
                        {@const endRad = (endAngle * Math.PI) / 180}
                        {@const x1 = 80 + 60 * Math.cos(startRad)}
                        {@const y1 = 80 + 60 * Math.sin(startRad)}
                        {@const x2 = 80 + 60 * Math.cos(endRad)}
                        {@const y2 = 80 + 60 * Math.sin(endRad)}
                        
                        <path 
                          d="M 80 80 L {x1} {y1} A 60 60 0 {largeArcFlag} 1 {x2} {y2} Z" 
                          fill={COLORS[i]}
                          class="pie-segment"
                        />
                      {/each}
                      <circle cx="80" cy="80" r="30" fill="white" />
                    </svg>
                    
                    <!-- Center text -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-gray-800">{categoryData.length}</div>
                        <div class="text-xs text-gray-500">Categories</div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 space-y-3">
                    {#each categoryData as entry, index}
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                          <span class="w-3 h-3 rounded-full" style="background-color: {COLORS[index]}"></span>
                          <span class="text-sm text-gray-700">{entry.name}</span>
                        </div>
                        <span class="font-bold text-gray-800">
                          {#if categoryData.reduce((sum, c) => sum + c.value, 0) > 0}
                            {Math.round((entry.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100)}%
                          {:else}
                            0%
                          {/if}
                        </span>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/if}

          <!-- REPORT SECTION -->
          {#if activeSection === 'report'}
            <section class="analytics-dashboard">
              <div class="dashboard-grid">
                <div class="card card1 blue">
                  <div class="card-header1">
                    <h2>Total Sales</h2>
                    <span class="{reportData.totalSales > 0 ? 'positive1' : 'muted5'}">
                      {reportData.totalSales > 0 ? '+2.08%' : 'No data'}
                    </span>
                  </div>
                  <p class="value1">₱{reportData.totalSales.toLocaleString()}</p>
                  <p class="desc1">Products vs last month</p>
                </div>

                <div class="card card2">
                  <div class="card-header2">
                    <h2>Total Orders</h2>
                    <span class="{reportData.totalOrders > 0 ? 'positive2' : 'muted5'}">
                      {reportData.totalOrders > 0 ? '+12.4%' : 'No data'}
                    </span>
                  </div>
                  <p class="value2">{reportData.totalOrders.toLocaleString()}</p>
                  <p class="desc2">Orders vs last month</p>
                </div>

                <div class="card card3">
                  <div class="card-header3">
                    <h2>Visitor</h2>
                    <span class="{reportData.visitor > 0 ? 'negative3' : 'muted5'}">
                      {reportData.visitor > 0 ? '-2.08%' : 'No visitors'}
                    </span>
                  </div>
                  <p class="value3">{reportData.visitor.toLocaleString()}</p>
                  <p class="desc3">Users vs last month</p>
                </div>

                <div class="card card4">
                  <div class="card-header4">
                    <h2>Total Sold Products</h2>
                    <span class="{reportData.totalSoldProducts > 0 ? 'positive4' : 'muted5'}">
                      {reportData.totalSoldProducts > 0 ? '+12.1%' : 'No sales'}
                    </span>
                  </div>
                  <p class="value4">{reportData.totalSoldProducts.toLocaleString()}</p>
                  <p class="desc4">Products vs last month</p>
                </div>
              </div>
            </section>
          {/if}

          <!-- TRANSACTIONS SECTION -->
          {#if activeSection === 'transactions'}
            <div class="transactions-management">
              <div class="section-header">
                <h2>Transactions</h2>
                <div class="date-filter">
                  <select>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>

              <div class="metrics-grid-transactions">
                <div class="metric-card-transaction">
                  <div class="metric-icon">💰</div>
                  <div class="metric-content">
                    <h3>Total Amount</h3>
                    <div class="metric-value-transaction">₱{transactionData.totalAmount.toLocaleString()}</div>
                    <div class="metric-change {transactionData.totalAmount > 0 ? 'positive' : ''}">
                      {transactionData.totalAmount > 0 ? '+8.5%' : 'No transactions'}
                    </div>
                  </div>
                </div>

                <div class="metric-card-transaction">
                  <div class="metric-icon">✅</div>
                  <div class="metric-content">
                    <h3>Completed</h3>
                    <div class="metric-value-transaction">₱{transactionData.completedAmount.toLocaleString()}</div>
                    <div class="metric-desc">
                      {transactionData.totalAmount > 0 ? '78% of total' : 'No transactions'}
                    </div>
                  </div>
                </div>

                <div class="metric-card-transaction">
                  <div class="metric-icon">⏳</div>
                  <div class="metric-content">
                    <h3>Pending</h3>
                    <div class="metric-value-transaction">₱{transactionData.pendingAmount.toLocaleString()}</div>
                    <div class="metric-desc">
                      {transactionData.totalAmount > 0 ? '22% of total' : 'No transactions'}
                    </div>
                  </div>
                </div>
              </div>

              <div class="recent-transactions">
                <h3>Recent Transactions</h3>
                <div class="transactions-list">
                  {#if transactionData.totalAmount > 0}
                    {#if transactions && transactions.length > 0}
                      {#each transactions.slice(0, 5) as t}
                        <div class="transaction-item">
                          <div class="transaction-icon">💳</div>
                          <div class="transaction-details">
                            <h4>TXN-{t.id?.slice(-6) || '000000'}</h4>
                            <p>Customer • {t.date || new Date().toLocaleDateString()}</p>
                          </div>
                          <div class="transaction-amount">₱{(t.total || 0).toLocaleString()}</div>
                          <div class="transaction-status completed">
                            {t.status || 'Completed'}
                          </div>
                          <div class="transaction-actions">
                            <button class="action-btn view">Details</button>
                          </div>
                        </div>
                      {/each}
                    {:else}
                      <div class="transaction-item">
                        <div class="transaction-icon">💳</div>
                        <div class="transaction-details">
                          <h4>TXN-{Date.now().toString().slice(-6)}</h4>
                          <p>Customer • {new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="transaction-amount">₱{transactionData.totalAmount.toLocaleString()}</div>
                        <div class="transaction-status completed">
                          Completed
                        </div>
                        <div class="transaction-actions">
                          <button class="action-btn view">Details</button>
                        </div>
                      </div>
                    {/if}
                  {:else}
                    <div class="transaction-item empty-state">
                      <div class="transaction-details">
                        <p>No transactions yet</p>
                        <small>Transactions will appear after successful checkouts</small>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- STAFF SECTION -->
          {#if activeSection === 'staff'}
            <div class="animate-fadeIn staff-container">
              <div class="staff-header">
                <h2>Staff Management</h2>
                <button class="add-staff-button" on:click={() => openAddStaffModal()}>+ Add New Staff</button>
              </div>

              <div class="staff-table-card">
                <table class="staff-table">
                  <thead class="staff-table-header">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody class="staff-table-body">
                    {#each users || [] as user, i (user.id)}
                      <tr class="staff-table-row">
                        <td>
                          <div class="staff-name">
                            <div class="staff-avatar">{user.name?.[0]}</div>
                            <span class="staff-name-text">{user.name}</span>
                          </div>
                        </td>
                        <td>
                          <span class="role-badge {i === 0 || user.role === 'ADMIN' ? 'admin' : 'regular'}">{user.role}</span>
                        </td>
                        <td>
                          <span class="status-{user.status || 'active'}">{user.status || 'Active'}</span>
                        </td>
                        <td>
                          <div class="staff-actions">
                            <button class="edit-button" on:click={() => openEditStaffModal(user)}>Edit</button>
                            <button class="delete-button" on:click={() => handleDeleteStaff(user.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Add Staff Modal -->
            {#if showAddStaffModal}
              <div class="modal-overlay" on:click|self={() => closeStaffModal()}>
                <div class="staff-modal">
                  <div class="modal-header">
                    <h2>{editingStaff ? 'Edit Staff' : 'Add New Staff'}</h2>
                    <button class="close-modal-button" on:click={closeStaffModal}>×</button>
                  </div>
                  
                  <div class="modal-content">
                    <form on:submit|preventDefault={handleStaffSubmit}>
                      <div class="form-group">
                        <label for="staff-name">Full Name</label>
                        <input 
                          type="text" 
                          id="staff-name" 
                          bind:value={newStaff.name}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      
                      <div class="form-group">
                        <label for="staff-email">Email</label>
                        <input 
                          type="email" 
                          id="staff-email" 
                          bind:value={newStaff.email}
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      
                      <div class="form-group">
                        <label for="staff-role">Role</label>
                        <select id="staff-role" bind:value={newStaff.role}>
                          <option value="STAFF">Staff</option>
                          <option value="ADMIN">Admin</option>
                          <option value="MANAGER">Manager</option>
                        </select>
                      </div>
                      
                      <div class="form-group">
                        <label for="staff-password">Password</label>
                        <input 
                          type="password" 
                          id="staff-password" 
                          bind:value={newStaff.password}
                          placeholder="Enter password"
                          required={!editingStaff}  
                        />
                      </div>
                      
                      <div class="form-group">
                        <label for="staff-status">Status</label>
                        <select id="staff-status" bind:value={newStaff.status}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="on-leave">On Leave</option>
                        </select>
                      </div>
                      
                      <div class="modal-actions">
                        <button type="button" class="cancel-button" on:click={closeStaffModal}>Cancel</button>
                        <button type="submit" class="confirm-button">
                          {editingStaff ? 'Update Staff' : 'Add Staff'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Delete Confirmation Modal -->
            {#if showDeleteConfirmModal}
              <div class="modal-overlay" on:click|self={() => showDeleteConfirmModal = false}>
                <div class="confirm-modal">
                  <div class="confirm-header">
                    <h3>Delete Staff</h3>
                    <button class="close-modal-button" on:click={() => showDeleteConfirmModal = false}>×</button>
                  </div>
                  
                  <div class="confirm-content">
                    <p>Are you sure you want to delete <strong>{staffToDeleteName}</strong>?</p>
                    <p class="warning-text">This action cannot be undone.</p>
                    
                    <div class="confirm-actions">
                      <button class="cancel-button" on:click={() => showDeleteConfirmModal = false}>Cancel</button>
                      <button class="delete-confirm-button" on:click={confirmDeleteStaff}>Delete Staff</button>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          {/if}

          <!-- PRODUCTS SECTION -->
          {#if activeSection === 'products'}
            <div class="animate-fadeIn products-container">
              <div class="products-header">
                <h2>Product Management</h2>
                <button class="add-product-button" on:click={() => openAddProductModal()}>+ Add New Product</button>
              </div>

              <div class="products-table-card">
                <table class="products-table">
                  <thead class="products-table-header">
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody class="products-table-body">
                    {#each products || [] as product, i (product.id)}
                      <tr class="products-table-row">
                        <td>
                          <div class="product-info">
                            {#if product.imageUrl}
                              <img src={product.imageUrl} alt={product.name} class="product-image" />
                            {:else}
                              <div class="product-image-placeholder">
                                <Package size={20} />
                              </div>
                            {/if}
                            <div class="product-details">
                              <span class="product-name">{product.name}</span>
                              {#if product.description}
                                <span class="product-description">{product.description}</span>
                              {/if}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="category-badge">{product.category || 'Uncategorized'}</span>
                        </td>
                        <td>
                          <span class="product-price">₱{product.price.toLocaleString()}</span>
                        </td>
                        <td>
                          <span class="stock-indicator {product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td>
                          <div class="product-actions">
                            <button class="edit-button" on:click={() => openEditProductModal(product)}>Edit</button>
                            <button class="delete-button" on:click={() => handleDeleteProduct(product.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Add Product Modal -->
            {#if showAddProductModal}
              <div class="modal-overlay" on:click|self={() => closeProductModal()}>
                <div class="product-modal">
                  <div class="modal-header">
                    <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <button class="close-modal-button" on:click={closeProductModal}>×</button>
                  </div>
                  
                  <div class="modal-content">
                    <form on:submit|preventDefault={handleProductSubmit}>
                      <div class="form-group">
                        <label for="product-name">Product Name</label>
                        <input 
                          type="text" 
                          id="product-name" 
                          bind:value={newProduct.name}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div class="form-group">
                        <label for="product-description">Description</label>
                        <textarea 
                          id="product-description" 
                          bind:value={newProduct.description}
                          placeholder="Enter product description"
                          rows="3"
                        ></textarea>
                      </div>
                      
                      <div class="form-row">
                        <div class="form-group half">
                          <label for="product-price">Price (₱)</label>
                          <input 
                            type="number" 
                            id="product-price" 
                            bind:value={newProduct.price}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        
                        <div class="form-group half">
                          <label for="product-stock">Stock</label>
                          <input 
                            type="number" 
                            id="product-stock" 
                            bind:value={newProduct.stock}
                            placeholder="0"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label for="product-category">Category</label>
                        <input 
                          type="text" 
                          id="product-category" 
                          bind:value={newProduct.category}
                          placeholder="Enter category"
                        />
                      </div>
                      
                      <div class="form-group">
                        <label for="product-image">Image URL</label>
                        <input 
                          type="text" 
                          id="product-image" 
                          bind:value={newProduct.imageUrl}
                          placeholder="Enter image URL (optional)"
                        />
                      </div>
                      
                      <div class="modal-actions">
                        <button type="button" class="cancel-button" on:click={closeProductModal}>Cancel</button>
                        <button type="submit" class="confirm-button">
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Delete Product Confirmation Modal -->
            {#if showDeleteProductConfirmModal}
              <div class="modal-overlay" on:click|self={() => showDeleteProductConfirmModal = false}>
                <div class="confirm-modal">
                  <div class="confirm-header">
                    <h3>Delete Product</h3>
                    <button class="close-modal-button" on:click={() => showDeleteProductConfirmModal = false}>×</button>
                  </div>
                  
                  <div class="confirm-content">
                    <p>Are you sure you want to delete <strong>{productToDeleteName}</strong>?</p>
                    <p class="warning-text">This action cannot be undone.</p>
                    
                    <div class="confirm-actions">
                      <button class="cancel-button" on:click={() => showDeleteProductConfirmModal = false}>Cancel</button>
                      <button class="delete-confirm-button" on:click={confirmDeleteProduct}>Delete Product</button>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background-color: rgb(248 250 252);
  }

  /* Sidebar Styles */
  .sidebar {
    position: fixed;
    top: 2.5rem;
    left: 1rem;
    width: 240px;
    height: calc(95vh - 2rem);
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid rgb(241 245 249);
    display: flex;
    flex-direction: column;
    z-index: 50;
  }

  .sidebar-header {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgb(241 245 249);
  }

  .logo {
    width: 3rem;
    height: 3rem;
    background-color: rgb(37 99 235);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .sidebar-header h1 {
    font-size: 1.25rem;
    font-weight: bold;
    color: rgb(37 99 235);
    letter-spacing: -0.025em;
  }

  .sidebar-menu {
    flex: 1;
    overflow-y: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .menu-section {
    font-size: 0.75rem;
    font-weight: bold;
    color: rgb(148 163 184);
    text-transform: uppercase;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }

  .menu-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    color: rgb(71 85 105);
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .menu-button:hover {
    background-color: rgb(248 250 252);
    color: rgb(37 99 235);
  }

  .menu-button.active {
    background-color: rgb(37 99 235);
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateX(0.25rem);
  }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid rgb(241 245 249);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cashier-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(37 99 235);
    background-color: rgb(239 246 255);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .cashier-button:hover {
    background-color: rgb(219 234 254);
  }

  .logout-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(239 68 68);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .logout-button:hover {
    background-color: rgb(254 242 242);
  }

  /* Main Content Styles */
  .main-content {
    position: fixed;
    top: 2.5rem;
    left: 20%;
    width: 78%;
    height: calc(95vh - 2rem);
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid rgb(241 245 249);
    display: flex;
    flex-direction: column;
    z-index: 50;
  }

  .main-container {
    width: 75%;
    height: 90vh;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }

  .main-box {
    margin-left: -120px;
    width: 130%;
    height: 90vh;
    background-color: transparent;
    border-radius: 1rem;
    overflow: hidden;
  }

  .main-content-inner {
    padding: 2rem;
    height: 100%;
    overflow-y: auto;
  }

  /* Dashboard Styles */
.dashboard-header {
  margin-bottom: 2rem;
}

/* STAT CARDS */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(241 245 249);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: scale(1.02);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.stat-icon.blue {
  background-color: rgb(59 130 246);
}

.stat-icon.purple {
  background-color: rgb(168 85 247);
}

.stat-icon.orange {
  background-color: rgb(249 115 22);
}

.stat-icon.emerald {
  background-color: rgb(16 185 129);
}

.stat-badge {
  background-color: rgb(241 245 249);
  color: rgb(100 116 139);
  font-size: 0.75rem;
  font-weight: bold;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 9999px;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: bold;
  color: rgb(30 41 59);
  margin-top: 0.5rem;
}

/* CHARTS GRID */
.analytics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .analytics-grid {
    grid-template-columns: 2fr 1fr;
  }
}

/* SALES CHART */
.analytics-chart {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(241 245 249);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.period-select {
  background-color: rgb(248 250 252);
  border: 1px solid rgb(226 232 240);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  outline: none;
}

/* Chart Container Styles */
.chart-container {
  height: 300px;
  position: relative;
}

.chart-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.chart-grid {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  border-top: 1px solid rgb(241 245 249);
}

.y-axis {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgb(148 163 184);
  font-weight: 500;
}

.y-label {
  text-align: right;
  padding-right: 0.5rem;
}

.chart-area {
  position: absolute;
  left: 4rem;
  right: 0;
  top: 0;
  bottom: 0;
  padding-left: 1rem;
  padding-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.chart-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.chart-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.data-point {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 2px solid rgb(59 130 246);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.2s;
}

.data-point:hover {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.data-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: rgb(30 41 59);
  color: white;
  font-size: 0.75rem;
  border-radius: 4px;
  padding: 4px 8px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.data-point:hover .data-tooltip {
  opacity: 1;
}

.tooltip-date {
  font-weight: bold;
}

.x-axis {
  position: absolute;
  left: 4rem;
  right: 0;
  bottom: 0;
  padding-left: 1rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgb(148 163 184);
  font-weight: 500;
}

.x-label {
  font-size: 0.75rem;
  color: rgb(148 163 184);
  font-weight: 500;
}

/* CATEGORIES CARD */
.categories-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(241 245 249);
}

/* Pie Chart Styles */
.pie-chart-container {
  height: 200px;
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-chart {
  display: block;
  margin: 0 auto;
}

.pie-segment {
  transition: opacity 0.2s;
  transform-origin: center;
  cursor: pointer;
}

.pie-segment:hover {
  opacity: 0.8;
}

.pie-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  text-align: center;
}

.pie-center-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(30 41 59);
}

.pie-center-label {
  font-size: 0.75rem;
  color: rgb(100 116 139);
}

/* Category Legend */
.category-legend {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  transition: transform 0.2s;
}

.category-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(71 85 105);
  transition: color 0.2s;
}

.category-percentage {
  font-size: 0.875rem;
  font-weight: bold;
  color: rgb(30 41 59);
}

.bg-linear-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-blue-600 {
  --tw-gradient-from: #2563eb;
}

.to-indigo-600 {
  --tw-gradient-to: #4f46e5;
}

.shadow-blue-500\/50 {
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
}

/* Animation for fadeIn */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments for new design */
@media (max-width: 768px) {
  .chart-area {
    left: 3rem;
    padding-left: 0.5rem;
  }
  
  .x-axis {
    left: 3rem;
    padding-left: 0.5rem;
  }
  
  .y-axis {
    width: 3rem;
  }
  
  .x-label {
    font-size: 0.65rem;
  }
  
  .y-label {
    font-size: 0.65rem;
  }
}

  /* Report Section Styles */
  .analytics-dashboard {
    position: relative;
    margin-top: -40px;
    margin-left: -40px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: sans-serif;
  }

  .analytics-dashboard .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto auto;
    gap: 2rem;
  }

  .analytics-dashboard .card1.blue { 
    grid-column: 1; 
    grid-row: 1; 
    background: linear-gradient(135deg, #4c62f0, #3B5AFE); 
    color: white; 
    height: 25vh; 
    width: 300px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-left: 20px;
  }

  .analytics-dashboard .card1.blue::before {
    content: '$'; 
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px; 
    height: 50px;
    background-color: rgb(236, 236, 236);
    border-radius: 12px;  
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #3B5AFE;
  }

  .analytics-dashboard .card-header1 { 
    display: flex; 
    align-items: flex-start; 
    justify-content: flex-end;
    margin-bottom: 50px; 
  }

  .analytics-dashboard .card-header1 h2 { 
    font-size: 12px; 
    font-weight: 500; 
    position: absolute;
    top: 130px;
    left: 20px;
    margin: 0;
  }

  .analytics-dashboard .positive1 { 
    background: #a7f3d0; 
    color: #047857; 
    padding: 1.5px 10px; 
    border-radius: 9999px; 
    font-size: 0.8rem; 
    font-weight: 700; 
    position: absolute;
    top: 30px; 
    right: 30px;
  }

  .analytics-dashboard .muted5 { 
    background: #f3f4f6; 
    color: #6b7280; 
    padding: 1.5px 10px; 
    border-radius: 9999px; 
    font-size: 0.8rem; 
    font-weight: 700; 
    position: absolute;
    top: 30px; 
    right: 30px;
  }

  .analytics-dashboard .value1 { 
    font-size: 1.5rem; 
    font-weight: 700; 
    margin: 0; 
    position: absolute;
    bottom: 8px; 
    left: 20px;
  }

  .analytics-dashboard .desc1 { 
    position: absolute;
    font-size: 10px; 
    opacity: 1; 
    line-height: 1.2;
    bottom: 20px;
    font-weight: 2;
    display: inline-block;
    vertical-align: top;
    margin-left: 130px;
    max-width: 25%; 
  }

  .analytics-dashboard .card2 { 
    grid-column: 2; 
    grid-row: 1; 
    border-radius: 1.25rem; 
    padding: 1rem; 
    height: 25vh; 
    width: 300px;
    margin-left: 20px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; 
  }

  .analytics-dashboard .card2:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08); 
  }

  .analytics-dashboard .card-header2 { 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    margin-bottom: 0.75rem; 
  }

  .analytics-dashboard .card-header2 h2 { font-size: 1rem; font-weight: 600; }
  .analytics-dashboard .positive2 { 
    background: #a7f3d0; 
    color: #047857; 
    padding: 4px 8px; 
    border-radius: 9999px; 
    font-size: 0.75rem; 
    font-weight: 600; 
  }
  .analytics-dashboard .value2 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
  .analytics-dashboard .desc2 { font-size: 0.875rem; opacity: 0.85; }

  .analytics-dashboard .card3 { 
    grid-column: 1; 
    grid-row: 2; 
    border-radius: 1.25rem;
    padding: 1.5rem;
    margin-top: -18px; 
    margin-left: 20px;
    height: 25vh; 
    width: 300px;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .analytics-dashboard .card3:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 6px 14px rgba(0,0,0,0.08); 
  }
  .analytics-dashboard .card-header3 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
  .analytics-dashboard .card-header3 h2 { font-size: 1rem; font-weight: 600; }
  .analytics-dashboard .negative3 { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
  .analytics-dashboard .value3 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
  .analytics-dashboard .desc3 { font-size: 0.875rem; opacity: 0.85; }

  .analytics-dashboard .card4 { 
    grid-column: 2; 
    grid-row: 2; 
    border-radius: 1.25rem;
    padding: 1.5rem;
    height: 25vh; 
    margin-top: -15px;
    width: 300px; 
    margin-left: 20px;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .analytics-dashboard .card4:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
  .analytics-dashboard .card-header4 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
  .analytics-dashboard .card-header4 h2 { font-size: 1rem; font-weight: 600; }
  .analytics-dashboard .positive4 { background: #a7f3d0; color: #047857; padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
  .analytics-dashboard .value4 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
  .analytics-dashboard .desc4 { font-size: 0.875rem; opacity: 0.85; }

  /* TRANSACTIONS STYLES */
  .transactions-management {
    padding: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .section-header h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: rgb(30 41 59);
  }

  .date-filter select {
    background-color: white;
    border: 1px solid rgb(226 232 240);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    outline: none;
    cursor: pointer;
    color: rgb(71 85 105);
  }

  .metrics-grid-transactions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .metric-card-transaction {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.3s ease;
  }

  .metric-card-transaction:hover {
    transform: translateY(-5px);
  }

  .metric-icon {
    font-size: 1.8rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(248 250 252);
    border-radius: 0.75rem;
  }

  .metric-content {
    flex: 1;
  }

  .metric-content h3 {
    font-size: 0.875rem;
    color: rgb(100 116 139);
    margin-bottom: 0.5rem;
  }

  .metric-value-transaction {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin: 5px 0;
  }

  .metric-change {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgb(156 163 175);
  }

  .metric-change.positive {
    color: rgb(22 163 74);
  }

  .metric-desc {
    color: #6b7280;
    font-size: 0.9rem;
  }

  .recent-transactions {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .recent-transactions h3 {
    font-size: 1.125rem;
    font-weight: bold;
    color: rgb(30 41 59);
    margin-bottom: 1.5rem;
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .transaction-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    gap: 15px;
  }

  .transaction-item.empty-state {
    justify-content: center;
    text-align: center;
    padding: 2rem;
    background-color: rgb(249 250 251);
  }

  .transaction-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
  }

  .transaction-details {
    flex: 1;
  }

  .transaction-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 5px 0;
  }

  .transaction-details p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
  }

  .transaction-amount {
    font-size: 1.2rem;
    font-weight: 700;
    color: #059669;
  }

  .transaction-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .transaction-status.completed {
    background: #dcfce7;
    color: #166534;
  }

  .transaction-actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action-btn.view {
    background-color: rgb(59 130 246);
    color: white;
  }

  .action-btn.view:hover {
    background-color: rgb(37 99 235);
  }

  /* Staff Management Styles */
  .staff-container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }

  .staff-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .staff-header h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: rgb(30 41 59);
  }

  .add-staff-button {
    background-color: rgb(37 99 235);
    color: white;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .add-staff-button:hover {
    background-color: rgb(29 78 216);
  }

  .staff-table-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid rgb(241 245 249);
    overflow: hidden;
  }

  .staff-table {
    width: 100%;
  }

  .staff-table-header {
    background-color: rgb(248 250 252);
    border-bottom: 1px solid rgb(241 245 249);
  }

  .staff-table-header th {
    text-align: left;
    padding: 1rem;
    font-weight: 600;
    color: rgb(71 85 105);
    font-size: 0.875rem;
  }

  .staff-table-body {
    display: table-row-group;
  }

  .staff-table-body tr:not(:last-child) {
    border-bottom: 1px solid rgb(241 245 249);
  }

  .staff-table-row {
    transition: background-color 0.2s;
  }

  .staff-table-row:hover {
    background-color: rgb(248 250 252);
  }

  .staff-table-row td {
    padding: 1rem;
  }

  .staff-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .staff-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: rgb(219 234 254);
    color: rgb(37 99 235);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.75rem;
  }

  .staff-name-text {
    font-weight: 500;
    color: rgb(30 41 59);
  }

  .role-badge {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .role-badge.admin {
    background-color: rgb(219 234 254);
    color: rgb(29 78 216);
  }

  .role-badge.regular {
    background-color: rgb(233 213 255);
    color: rgb(107 33 168);
  }

  .status-active {
    color: rgb(16 185 129);
    font-weight: 500;
    font-size: 0.875rem;
  }

  .staff-actions {
    display: flex;
    gap: 0.5rem;
  }

  .edit-button {
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: rgb(100 116 139);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .edit-button:hover {
    background-color: rgb(241 245 249);
  }

  .delete-button {
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: rgb(239 68 68);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .delete-button:hover {
    background-color: rgb(254 242 242);
  }

  /* Animations */
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  /* Staff Modal Styles */
.staff-modal {
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 1rem;
}

.confirm-modal {
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 1rem;
}

.confirm-header {
  padding: 1.25rem;
  border-bottom: 1px solid rgb(241 245 249);
  background-color: rgb(254 242 242);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.confirm-header h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(220 38 38);
}

.confirm-content {
  padding: 1.5rem;
}

.warning-text {
  color: rgb(239 68 68);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.confirm-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.delete-confirm-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgb(239 68 68);
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-confirm-button:hover {
  background-color: rgb(220 38 38);
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(55 65 81);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Status Badges */
.status-active {
  color: rgb(16 185 129);
  font-weight: 500;
  font-size: 0.875rem;
}

.status-inactive {
  color: rgb(239 68 68);
  font-weight: 500;
  font-size: 0.875rem;
}

.status-on-leave {
  color: rgb(245 158 11);
  font-weight: 500;
  font-size: 0.875rem;
}
</style>