<script setup>
import { ref, onMounted } from 'vue'
import { useShoppingStore } from './stores/shoppingStore'

const store = useShoppingStore()
const newItemName = ref('')

onMounted(() => {
  store.loadFromStorage()
})

function addNewItem() {
  store.addItem(newItemName.value)
  newItemName.value = ''
}
</script>

<template>
  <div class="app">
    <div class="container">
      <h1>Список покупок</h1>
      <form @submit.prevent="addNewItem" class="add-form">
        <input v-model="newItemName" type="text" placeholder="Добавить продукт..." class="input" />
        <button type="submit" class="btn btn-primary">+</button>
      </form>
      <div v-if="store.activeItems.length" class="section">
        <h2>Купить</h2>
        <ul class="list">
          <li v-for="item in store.activeItems" :key="item.id" class="list-item">
            <span class="item-name">{{ item.name }}</span>
            <div class="item-actions">
              <button @click="store.togglePurchased(item.id)" class="btn-icon check">✓</button>
              <button @click="store.removeItem(item.id)" class="btn-icon delete">✗</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="store.purchasedItems.length" class="section">
        <h2>Куплено</h2>
        <ul class="list">
          <li v-for="item in store.purchasedItems" :key="item.id" class="list-item purchased">
            <span class="item-name">{{ item.name }}</span>
            <button @click="store.removeItem(item.id)" class="btn-icon delete">✗</button>
          </li>
        </ul>
        <button @click="store.clearPurchased" class="btn btn-secondary">Очистить купленные</button>
      </div>
      <div v-if="!store.items.length" class="empty-state">
        <p>Список пуст. Добавьте продукты.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #000000;
  padding: 2rem 1rem;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 1rem;
  font-weight: 500;
  color: #888888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

/* Форма */
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  font-size: 1rem;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;
}

.input::placeholder {
  color: #666666;
}

.input:focus {
  border-color: #4caf50;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary {
  background: #4caf50;
  color: #000000;
  font-size: 1.2rem;
  padding: 0.75rem 1.2rem;
  font-weight: bold;
}

.btn-secondary {
  background: #1a1a1a;
  color: #888888;
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #333333;
}

.btn:hover {
  opacity: 0.85;
}

.section {
  margin-bottom: 2rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #1a1a1a;
}

.item-name {
  font-size: 1rem;
  color: #ffffff;
}

.purchased .item-name {
  text-decoration: line-through;
  color: #555555;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.25rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-icon:hover {
  opacity: 1;
}

.btn-icon.check {
  color: #4caf50;
}

.btn-icon.delete {
  color: #f44336;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #555555;
}
</style>
