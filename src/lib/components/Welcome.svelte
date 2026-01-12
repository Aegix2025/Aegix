<script lang="ts">
  let { onStart } = $props<{
    onStart: () => void
  }>();

  function handleStartClick() {
    onStart();
  }
</script>

<div class="welcome-container">
  <div class="welcome-content">
    <h1 class="welcome-title">WELCOME</h1>
    <p class="welcome-subtitle">AEGIX POS SYSTEM</p>
    <button class="start-button" onclick={handleStartClick}>
      Start
    </button>
  </div>
</div>

<style>
  .welcome-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .welcome-title {
    font-size: 4rem;
    font-weight: 700;
    color: white;
    letter-spacing: 0.1em;
    margin: 0;
  }

  .welcome-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.05em;
    margin: 0;
    font-weight: 500;
  }

  .start-button {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #764ba2;
    background: linear-gradient(135deg, #5dd9ff 0%, #3dd5f3 100%);
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    min-width: 200px;
  }

  .start-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .start-button:active {
    transform: translateY(0);
  }
</style>
