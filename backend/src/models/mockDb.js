const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '../../../db.json');

// Ensure db.json exists with default collections
function getDb() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({
      users: [],
      projects: [],
      tasks: [],
      bugs: [],
      notes: [],
      snippets: [],
      repos: [],
      timelogs: [],
      events: [],
      notifications: []
    }, null, 2));
  }
  try {
    return JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
  } catch (e) {
    return {
      users: [],
      projects: [],
      tasks: [],
      bugs: [],
      notes: [],
      snippets: [],
      repos: [],
      timelogs: [],
      events: [],
      notifications: []
    };
  }
}

function saveDb(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Chainable query builder to support Mongoose sort and limit
class MockQuery {
  constructor(list, ModelClass) {
    this.list = list;
    this.ModelClass = ModelClass;
  }

  sort(sortOpt) {
    // Basic sorting if needed
    return this;
  }

  limit(n) {
    this.list = this.list.slice(0, n);
    return this;
  }

  then(resolve, reject) {
    const instances = this.list.map(item => new this.ModelClass(item));
    return Promise.resolve(instances).then(resolve, reject);
  }
}

class MockModel {
  constructor(collectionName, data = {}) {
    this._collection = collectionName;
    Object.assign(this, data);
    if (!this._id) {
      this._id = generateId();
    }
  }

  async save() {
    const db = getDb();
    if (!db[this._collection]) db[this._collection] = [];
    const list = db[this._collection];
    const idx = list.findIndex(item => item._id === this._id);
    
    const plain = {};
    for (let key in this) {
      if (!key.startsWith('_') || key === '_id') {
        plain[key] = this[key];
      }
    }
    plain.createdAt = plain.createdAt || new Date().toISOString();
    plain.updatedAt = new Date().toISOString();

    if (idx !== -1) {
      list[idx] = plain;
    } else {
      list.push(plain);
    }
    saveDb(db);
    return this;
  }
}

function createModel(collectionName) {
  const ModelClass = class extends MockModel {
    constructor(data) {
      super(collectionName, data);
    }
  };

  ModelClass.find = function(query = {}) {
    const db = getDb();
    let list = db[collectionName] || [];
    
    list = list.filter(item => {
      for (let key in query) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    return new MockQuery(list, ModelClass);
  };

  ModelClass.findOne = function(query = {}) {
    const db = getDb();
    const list = db[collectionName] || [];
    const found = list.find(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    return Promise.resolve(found ? new ModelClass(found) : null);
  };

  ModelClass.findById = function(id) {
    return ModelClass.findOne({ _id: id });
  };

  ModelClass.findOneAndUpdate = function(query, update, options) {
    const db = getDb();
    const list = db[collectionName] || [];
    const idx = list.findIndex(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    if (idx === -1) return Promise.resolve(null);
    list[idx] = { ...list[idx], ...update, updatedAt: new Date().toISOString() };
    saveDb(db);
    return Promise.resolve(new ModelClass(list[idx]));
  };

  ModelClass.findOneAndDelete = function(query) {
    const db = getDb();
    const list = db[collectionName] || [];
    const idx = list.findIndex(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    if (idx === -1) return Promise.resolve(null);
    const deleted = list.splice(idx, 1)[0];
    saveDb(db);
    return Promise.resolve(new ModelClass(deleted));
  };

  ModelClass.findByIdAndUpdate = function(id, update, options) {
    return ModelClass.findOneAndUpdate({ _id: id }, update, options);
  };

  ModelClass.findByIdAndDelete = function(id) {
    return ModelClass.findOneAndDelete({ _id: id });
  };

  return ModelClass;
}

module.exports = {
  User: createModel('users'),
  Project: createModel('projects'),
  Task: createModel('tasks'),
  Bug: createModel('bugs'),
  Note: createModel('notes'),
  Snippet: createModel('snippets'),
  Repo: createModel('repos'),
  TimeLog: createModel('timelogs'),
  Event: createModel('events'),
  Notification: createModel('notifications'),
};
