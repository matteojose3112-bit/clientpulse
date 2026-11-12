import type { Customer, CustomerHealth } from "./customers";

type StorageProvider = () => Pick<Storage, "getItem" | "setItem">;

export function isCustomerHealth(value: unknown): value is CustomerHealth;
export function isCustomer(value: unknown): value is Customer;
export function loadCustomers(
  getStorage: StorageProvider,
  fallbackCustomers: Customer[],
): Customer[];
export function saveCustomers(
  getStorage: StorageProvider,
  customersToSave: Customer[],
): boolean;
