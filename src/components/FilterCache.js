// FilterCache.js
class FilterCache {
  constructor() {
    this.cache = new Map();
  }

  getKey(filters) {
    return JSON.stringify(filters);
  }

  set(filters, result) {
    const key = this.getKey(filters);
    this.cache.set(key, result);
  }

  get(filters) {
    const key = this.getKey(filters);
    return this.cache.get(key);
  }

  has(filters) {
    const key = this.getKey(filters);
    return this.cache.has(key);
  }
}

export default new FilterCache();
