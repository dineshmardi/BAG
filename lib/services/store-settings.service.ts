import StoreSettings from "@/models/StoreSettings";

export async function getStoreSettings() {
  let settings = await StoreSettings.findOne();

  if (!settings) {
    settings = await StoreSettings.create({});
  }

  return settings;
}