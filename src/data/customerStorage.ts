import type { Customer, CustomerHealth } from "./customers";

const STORAGE_KEY = "clientpulse-customers";

type StorageProvider = () => Pick<Storage, "getItem" | "setItem">;

export function isCustomerHealth(value: unknown): value is CustomerHealth {
  return value === "Healthy" || value === "At Risk" || value === "Critical";
}

export function isCustomer(value: unknown): value is Customer {
  if (typeof value !== "object" || value === null) return false;
  const customer = value as Record<string, unknown>;

  return (
    Number.isSafeInteger(customer.id) &&
    (customer.id as number) > 0 &&
    typeof customer.name === "string" &&
    customer.name.trim().length > 0 &&
    typeof customer.company === "string" &&
    customer.company.trim().length > 0 &&
    isCustomerHealth(customer.health) &&
    typeof customer.healthScore === "number" &&
    Number.isFinite(customer.healthScore) &&
    customer.healthScore >= 0 &&
    customer.healthScore <= 100 &&
    typeof customer.lastContact === "string" &&
    customer.lastContact.trim().length > 0 &&
    typeof customer.nextAction === "string" &&
    customer.nextAction.trim().length > 0
  );
}

export function loadCustomers(
  getStorage: StorageProvider,
  fallbackCustomers: Customer[],
): Customer[] {
  try {
    const savedCustomers = getStorage().getItem(STORAGE_KEY);
    if (!savedCustomers) return fallbackCustomers;

    const parsedCustomers: unknown = JSON.parse(savedCustomers);
    if (!Array.isArray(parsedCustomers) || !parsedCustomers.every(isCustomer)) {
      return fallbackCustomers;
    }

    const customerIds = parsedCustomers.map((customer) => customer.id);
    if (new Set(customerIds).size !== customerIds.length) return fallbackCustomers;

    return parsedCustomers;
  } catch {
    return fallbackCustomers;
  }
}

export function saveCustomers(
  getStorage: StorageProvider,
  customersToSave: Customer[],
): boolean {
  try {
    getStorage().setItem(STORAGE_KEY, JSON.stringify(customersToSave));
    return true;
  } catch {
    return false;
  }
}
