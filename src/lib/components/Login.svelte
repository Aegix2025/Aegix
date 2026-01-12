<script lang="ts">
  import type { User } from '../types';
  import { UserRole } from '../types';
  
  // Props declaration for Svelte 5
  let { 
    users = [], 
    onLogin, 
    onAddUser, 
    activeSessions = {} 
  } = $props<{
    users: User[],
    onLogin: (user: User) => void,
    onAddUser: (user: User) => void,
    activeSessions: Record<string, any>
  }>();

  let selectedUser = $state<User | null>(null);
  let pin = $state('');
  let terminalId = $state<string>('TERM-' + Math.floor(1000 + Math.random() * 9000));
  let errorMessage = $state<string>('');
  let isLoading = $state(false);

  function isUserAlreadyLoggedIn(userId: string): boolean {
    return !!activeSessions[userId];
  }

  function addCashierPrompt() {
    const name = window.prompt('Enter new cashier name:', 'Cashier');
    if (!name) return;
    
    const username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    const newUser: User = { 
      id: `cashier_${Date.now()}`,
      username,
      role: UserRole.CASHIER,
      name,
      email: `${username}@store.com`,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    onAddUser(newUser);
    selectedUser = newUser;
    pin = '';
  }
  
  $effect(() => {
    if (pin.length === 4 && selectedUser && !isLoading) {
      isLoading = true;
      
      // Check if user is already logged in
      if (isUserAlreadyLoggedIn(selectedUser.id)) {
        const proceed = confirm(
          `${selectedUser.name} is already logged in on another terminal.\n` +
          'Continue anyway? (They will be logged out from other terminal)'
        );
        
        if (!proceed) {
          pin = '';
          isLoading = false;
          return;
        }
      }
      
      // PIN verification (simplified for demo)
      const correctPIN = '1234'; 
      const backupPIN = '0000';  
      
      if (pin === correctPIN || pin === backupPIN) {
        // Generate session
        const sessionId = `session_${Date.now()}_${terminalId}`;
        const userWithSession = {
          ...selectedUser,
          sessionId,
          terminalId,
          isLoggedIn: true,
          lastLogin: new Date().toISOString()
        };
        
        // Call parent login handler
        setTimeout(() => {
          onLogin(userWithSession);
          pin = '';
          isLoading = false;
        }, 500);
      } else {
        errorMessage = 'Incorrect PIN. Try 1234 or 0000.';
        setTimeout(() => {
          pin = '';
          errorMessage = '';
          isLoading = false;
        }, 1500);
      }
    }
  });

  function handleNum(n: string) {
    if (pin.length < 4 && !isLoading) {
      pin += n;
    }
  }
  
  function clearPin() {
    pin = '';
    errorMessage = '';
  }
  
  function generateTerminalId() {
    terminalId = 'TERM-' + Math.floor(1000 + Math.random() * 9000);
  }
</script>

<!-- REST OF THE HTML CODE - SAME AS BEFORE -->
<div class="login-screen">
  <!-- Terminal Header -->
  <div class="terminal-header">
    <div class="terminal-info">
      <span class="terminal-label">TERMINAL:</span>
      <span class="terminal-value">{terminalId}</span>
    </div>
    <button onclick={generateTerminalId} class="change-terminal-btn">
      Change Terminal
    </button>
    <div class="store-name">AEGIX POS SYSTEM</div>
  </div>

  {#if !selectedUser}
    <!-- User Selection -->
    <div class="user-selection">
      <div class="selection-header">
        <h1>Select User</h1>
        <p class="subtitle">Login to terminal {terminalId}</p>
      </div>
      
      <div class="users-grid">
        {#each users as user}
          <button
            onclick={() => { 
              selectedUser = user; 
              pin = '';
              errorMessage = '';
            }}
            class="user-card {user.role}"
            disabled={user.status === 'inactive'}
          >
            <div class="user-avatar {user.role}">
              {user.name.charAt(0)}
            </div>
            <div class="user-details">
              <h3>{user.name}</h3>
              <div class="user-meta">
                <span class="role-badge {user.role.toLowerCase()}">{user.role}</span>
                {#if user.status === 'inactive'}
                  <span class="status-badge inactive">Inactive</span>
                {:else if isUserAlreadyLoggedIn(user.id)}
                  <span class="status-badge logged-in">Logged In</span>
                {:else}
                  <span class="status-badge active">Available</span>
                {/if}
              </div>
              {#if isUserAlreadyLoggedIn(user.id)}
                <div class="session-info">
                  <small>Terminal: {activeSessions[user.id]?.terminalId}</small>
                </div>
              {/if}
            </div>
          </button>
        {/each}
        
        <!-- Add Cashier Button -->
        <button onclick={addCashierPrompt} class="add-user-card">
          <div class="add-icon">+</div>
          <div class="add-text">
            <h3>Add Cashier</h3>
            <p>Create new cashier account</p>
          </div>
        </button>
      </div>
      
      <div class="active-sessions">
        <h3>Active Sessions: {Object.keys(activeSessions).length}</h3>
        {#if Object.keys(activeSessions).length > 0}
          <div class="sessions-list">
            {#each Object.entries(activeSessions) as [userId, session]}
              <div class="session-item">
                <span>{(session as any).user}</span>
                <span class="terminal">{(session as any).terminalId}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      
    </div>
  {:else}
    <!-- PIN Entry Modal Overlay -->
    <div class="pin-modal-overlay">
      <div class="pin-entry">
        <div class="pin-header">
        <button onclick={() => { selectedUser = null; pin = ''; }} class="back-btn">
          ← Back
        </button>
        <div class="current-user">
          <div class="current-avatar {selectedUser.role}">
            {selectedUser.name.charAt(0)}
          </div>
          <div>
            <h2>{selectedUser.name}</h2>
            <p class="user-info">
              {selectedUser.role} • Terminal: {terminalId}
            </p>
          </div>
        </div>
      </div>
      
      {#if errorMessage}
        <div class="error-alert">
          {errorMessage}
        </div>
      {/if}
      
      <div class="pin-display">
        {#each Array(4) as _, i}
          <div class="pin-circle {i < pin.length ? 'filled' : ''}"></div>
        {/each}
      </div>
      
      {#if isLoading}
        <div class="loading">Verifying...</div>
      {/if}
      
      <div class="keypad">
        <div class="keypad-row">
          {#each [1,2,3] as num}
            <button 
              onclick={() => handleNum(num.toString())} 
              class="key"
              disabled={isLoading}
            >
              {num}
            </button>
          {/each}
        </div>
        <div class="keypad-row">
          {#each [4,5,6] as num}
            <button 
              onclick={() => handleNum(num.toString())} 
              class="key"
              disabled={isLoading}
            >
              {num}
            </button>
          {/each}
        </div>
        <div class="keypad-row">
          {#each [7,8,9] as num}
            <button 
              onclick={() => handleNum(num.toString())} 
              class="key"
              disabled={isLoading}
            >
              {num}
            </button>
          {/each}
        </div>
        <div class="keypad-row">
          <button onclick={clearPin} class="key clear" disabled={isLoading}>
            C
          </button>
          <button 
            onclick={() => handleNum('0')} 
            class="key"
            disabled={isLoading}
          >
            0
          </button>
          <button 
            onclick={() => pin = pin.slice(0, -1)} 
            class="key backspace"
            disabled={isLoading}
          >
            ⌫
          </button>
        </div>
      </div>
      
      <div class="pin-instructions">
        <p>Enter 4-digit PIN</p>
        <p class="hint">Default PIN: <strong>1234</strong> or <strong>0000</strong></p>
      </div>
    </div>
    </div>
  {/if}
</div>

<style>
  .login-screen {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .terminal-header {
    width: 100%;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 15px 25px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .terminal-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .terminal-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 500;
  }
  
  .terminal-value {
    color: white;
    font-weight: bold;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.3);
    padding: 5px 15px;
    border-radius: 6px;
  }
  
  .change-terminal-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
  }
  
  .change-terminal-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .store-name {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
  
  .user-selection {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .selection-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .selection-header h1 {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #666;
    font-size: 16px;
  }
  
  .users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .user-card {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-card:hover {
    transform: translateY(-5px);
    border-color: #3b82f6;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.1);
  }
  
  .user-card.ADMIN {
    border-color: #8b5cf6;
  }
  
  .user-card.CASHIER {
    border-color: #10b981;
  }
  
  .user-card.MANAGER {
    border-color: #f59e0b;
  }
  
  .user-card:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 15px;
  }
  
  .user-avatar.ADMIN {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  }
  
  .user-avatar.CASHIER {
    background: linear-gradient(135deg, #10b981, #34d399);
  }
  
  .user-avatar.MANAGER {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
  }
  
  .user-details h3 {
    font-size: 18px;
    color: #1e293b;
    margin-bottom: 8px;
    text-align: center;
  }
  
  .user-meta {
    display: flex;
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  
  .role-badge {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 600;
  }
  
  .role-badge.admin {
    background: #ede9fe;
    color: #7c3aed;
  }
  
  .role-badge.cashier {
    background: #d1fae5;
    color: #059669;
  }
  
  .role-badge.manager {
    background: #fef3c7;
    color: #d97706;
  }
  
  .status-badge {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 12px;
    font-weight: 600;
  }
  
  .status-badge.active {
    background: #d1fae5;
    color: #059669;
  }
  
  .status-badge.inactive {
    background: #f1f5f9;
    color: #64748b;
  }
  
  .status-badge.logged-in {
    background: #dbeafe;
    color: #1d4ed8;
  }
  
  .session-info small {
    color: #64748b;
    font-size: 11px;
  }
  
  .add-user-card {
    background: #f0f9ff;
    border: 2px dashed #7dd3fc;
    border-radius: 12px;
    padding: 30px 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 180px;
  }
  
  .add-user-card:hover {
    background: #e0f2fe;
    border-color: #0ea5e9;
  }
  
  .add-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #0ea5e9;
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .add-text h3 {
    color: #0369a1;
    margin-bottom: 5px;
  }
  
  .add-text p {
    color: #64748b;
    font-size: 14px;
  }
  
  .active-sessions {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
  }
  
  .active-sessions h3 {
    color: #475569;
    margin-bottom: 15px;
    font-size: 16px;
  }
  
  .sessions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .session-item {
    background: white;
    padding: 8px 15px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 14px;
  }
  
  .session-item .terminal {
    background: #dbeafe;
    color: #1d4ed8;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .pin-entry {
    width: 100%;
    max-width: 700px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .pin-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 20px;
  }
  
  .pin-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .back-btn {
    background: #f1f5f9;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    color: #475569;
    cursor: pointer;
    font-weight: 500;
  }
  
  .back-btn:hover {
    background: #e2e8f0;
  }
  
  .current-user {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .current-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  
  .current-avatar.ADMIN {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  }
  
  .current-avatar.CASHIER {
    background: linear-gradient(135deg, #10b981, #34d399);
  }
  
  .current-avatar.MANAGER {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
  }
  
  .pin-header h2 {
    font-size: 24px;
    color: #1e293b;
    margin-bottom: 5px;
  }
  
  .user-info {
    color: #64748b;
    font-size: 14px;
  }
  
  .error-alert {
    background: #fee2e2;
    color: #dc2626;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .pin-display {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 40px 0;
  }
  
  .pin-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid #cbd5e1;
    transition: all 0.3s;
  }
  
  .pin-circle.filled {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  
  .loading {
    text-align: center;
    color: #64748b;
    margin: 20px 0;
    font-size: 18px;
  }
  
  .keypad {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .keypad-row {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .key {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    font-size: 24px;
    font-weight: bold;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .key:hover:not(:disabled) {
    background: #e2e8f0;
    transform: scale(1.05);
  }
  
  .key:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  .key:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .key.clear {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #dc2626;
  }
  
  .key.backspace {
    background: #fef3c7;
    border-color: #fcd34d;
    color: #d97706;
  }
  
  .pin-instructions {
    text-align: center;
    color: #64748b;
  }
  
  .pin-instructions p {
    margin-bottom: 5px;
  }
  
  .hint {
    color: #94a3b8;
    font-size: 14px;
  }
</style>