import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: []
  }),

  actions: {
    // Загрузка из localStorage при инициализации
    loadFromStorage() {
      const saved = localStorage.getItem('shoppingList')
      if (saved) {
        try {
          this.items = JSON.parse(saved)
        } catch (e) {
          console.error('Ошибка загрузки списка:', e)
          this.items = []
        }
      }
    },

    // Сохранение в localStorage
    saveToStorage() {
      localStorage.setItem('shoppingList', JSON.stringify(this.items))
    },

    addItem(name) {
      if (name.trim()) {
        this.items.push({
          id: Date.now(),
          name: name.trim(),
          purchased: false
        })
        this.saveToStorage() // Сохраняем после каждого изменения
      }
    },

    togglePurchased(id) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.purchased = !item.purchased
        this.saveToStorage() // Сохраняем после каждого изменения
      }
    },

    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveToStorage() // Сохраняем после каждого изменения
    },

    clearPurchased() {
      this.items = this.items.filter(item => !item.purchased)
      this.saveToStorage() // Сохраняем после каждого изменения
    }
  },

  getters: {
    activeItems: (state) => state.items.filter(item => !item.purchased),
    purchasedItems: (state) => state.items.filter(item => item.purchased),
    hasPurchased: (state) => state.items.some(item => item.purchased)
  }
})
