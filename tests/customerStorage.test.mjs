import assert from "node:assert/strict";
import test from "node:test";

import { customers } from "../src/data/customers.ts";
import {
  isCustomer,
  isCustomerHealth,
  loadCustomers,
  saveCustomers,
} from "../src/data/customerStorage.mjs";

const STORAGE_KEY = "clientpulse-customers";

function createStorage(initialValue = null) {
  let value = initialValue;

  return {
    getItem(key) {
      assert.equal(key, STORAGE_KEY);
      return value;
    },
    setItem(key, nextValue) {
      assert.equal(key, STORAGE_KEY);
      value = nextValue;
    },
    read() {
      return value;
    },
  };
}

function validCustomer(overrides = {}) {
  return {
    id: 101,
    name: "Test Customer",
    company: "Example Co",
    health: "Healthy",
    healthScore: 90,
    lastContact: "Yesterday",
    nextAction: "Schedule review",
    ...overrides,
  };
}

test("accepts only supported customer health values", () => {
  assert.equal(isCustomerHealth("Healthy"), true);
  assert.equal(isCustomerHealth("At Risk"), true);
  assert.equal(isCustomerHealth("Critical"), true);
  assert.equal(isCustomerHealth("Unknown"), false);
});

test("validates the complete customer record shape", () => {
  assert.equal(isCustomer(validCustomer()), true);
  assert.equal(isCustomer(validCustomer({ id: Number.MAX_SAFE_INTEGER + 1 })), false);
  assert.equal(isCustomer(validCustomer({ health: "Unknown" })), false);
  assert.equal(isCustomer(validCustomer({ healthScore: 101 })), false);
  assert.equal(isCustomer(validCustomer({ healthScore: Number.NaN })), false);
  assert.equal(isCustomer(validCustomer({ name: null })), false);
  assert.equal(isCustomer(null), false);
});

test("uses bundled customers when no saved value exists", () => {
  const fallback = [...customers];
  assert.equal(loadCustomers(() => createStorage().read() === null
    ? createStorage()
    : createStorage(), fallback), fallback);
});

test("restores valid saved customers", () => {
  const saved = [validCustomer()];
  const storage = createStorage(JSON.stringify(saved));
  assert.deepEqual(loadCustomers(() => storage, customers), saved);
});

test("falls back for malformed JSON and non-array JSON", () => {
  const fallback = [...customers];
  assert.equal(loadCustomers(() => createStorage("{"), fallback), fallback);
  assert.equal(loadCustomers(() => createStorage(JSON.stringify({ id: 1 })), fallback), fallback);
});

test("falls back when any saved record is invalid", () => {
  const fallback = [...customers];
  const storage = createStorage(JSON.stringify([validCustomer(), validCustomer({ healthScore: -1 })]));
  assert.equal(loadCustomers(() => storage, fallback), fallback);
});

test("falls back when saved customer IDs are duplicated", () => {
  const fallback = [...customers];
  const duplicate = validCustomer();
  const storage = createStorage(JSON.stringify([duplicate, { ...duplicate, name: "Duplicate" }]));
  assert.equal(loadCustomers(() => storage, fallback), fallback);
});

test("falls back when reading storage throws", () => {
  const fallback = [...customers];
  assert.equal(loadCustomers(() => {
    throw new Error("Storage blocked");
  }, fallback), fallback);
});

test("persists customer records and reports success", () => {
  const storage = createStorage();
  assert.equal(saveCustomers(() => storage, [validCustomer()]), true);
  assert.deepEqual(JSON.parse(storage.read()), [validCustomer()]);
});

test("does not throw when writing storage fails", () => {
  assert.equal(saveCustomers(() => ({
    getItem: () => null,
    setItem: () => {
      throw new Error("Quota exceeded");
    },
  }), [validCustomer()]), false);
});
