<script lang="ts">
  import type { User } from '../types';
  import { UserRole } from '../types';
  
  let { users, onLogin, onAddUser } = $props<{
    users: User[], 
    onLogin: (u: User) => void,
    onAddUser: (u: User) => void
  }>();

  let selectedUser = $state<User | null>(null);
  let pin = $state('');

  function addCashierPrompt() {
    const name = window.prompt('Enter new cashier name', 'Cashier');
    if (!name) return;
    const id = `c${Date.now().toString().slice(-6)}`;
    const username = name.toLowerCase().replace(/\s+/g, '') + Date.now().toString().slice(-3);
    const newUser: User = { id, username, role: UserRole.CASHIER, name };
    try {
      onAddUser && onAddUser(newUser);
    } catch (e) {
      // fallback: if parent didn't handle, mutate local users array if it's writable
      try { users = [...users, newUser]; } catch { }
    }
    selectedUser = newUser;
  }
  
  $effect(() => {
    if (pin.length === 4 && selectedUser) {
        // Simple mock login
        setTimeout(() => {
            onLogin(selectedUser!);
            pin = '';
        }, 300);
    }
  });

  function handleNum(n: string) {
    if (pin.length < 4) pin += n;
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-100 p-8">
  {#if !selectedUser}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
       {#each users as user}
         <button onclick={() => selectedUser = user} class="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 border border-slate-200 flex flex-col items-center w-40 h-40 justify-center">
            <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl mb-3">
               {user.name[0]}
            </div>
            <div class="font-bold text-slate-800">{user.name}</div>
            <div class="text-xs text-slate-400 uppercase mt-1">{user.role}</div>
         </button>
       {/each}
       <div class="flex items-center justify-center">
        <button onclick={addCashierPrompt} class="bg-white border border-dashed border-slate-200 p-4 rounded-xl text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          + Add Cashier
        </button>
       </div>
    </div>
  {:else}
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <button onclick={() => { selectedUser = null; pin = ''; }} class="text-blue-600 font-medium mb-6 flex items-center gap-2 text-sm hover:underline">
           ← Switch User
        </button>
        <h2 class="text-2xl font-bold text-center text-slate-800 mb-6">Hello, {selectedUser.name}</h2>
        
        <div class="flex justify-center gap-4 mb-8">
            {#each Array(4) as _, i}
               <div class="w-4 h-4 rounded-full transition-colors duration-200 {i < pin.length ? 'bg-blue-600' : 'bg-slate-200'}"></div>
            {/each}
        </div>

        <div class="grid grid-cols-3 gap-4">
            {#each [1,2,3,4,5,6,7,8,9] as num}
               <button onclick={() => handleNum(num.toString())} class="h-16 rounded-full bg-slate-50 hover:bg-blue-50 text-xl font-bold text-slate-700 transition-colors">
                 {num}
               </button>
            {/each}
            <div></div>
            <button onclick={() => handleNum('0')} class="h-16 rounded-full bg-slate-50 hover:bg-blue-50 text-xl font-bold text-slate-700 transition-colors">0</button>
            <button onclick={() => pin = pin.slice(0, -1)} class="h-16 rounded-full hover:bg-red-50 text-red-500 font-bold flex items-center justify-center transition-colors">⌫</button>
        </div>
    </div>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
</style>