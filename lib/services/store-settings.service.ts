import StoreSettings from "@/models/StoreSettings";

export async function getStoreSettings() {
  let settings =
    await StoreSettings.findOne();

  if (!settings) {
    settings =
      await StoreSettings.create({});
  }

  return settings;
}

type UpdateMaintenanceSettingsInput = {
  maintenanceMode?: boolean;
  maintenanceTitle?: string;
  maintenanceMessage?: string;
};

export async function updateMaintenanceSettings(
  data: UpdateMaintenanceSettingsInput
) {
  let settings =
    await StoreSettings.findOne();

  if (!settings) {
    settings =
      await StoreSettings.create({});
  }

  if (
    typeof data.maintenanceMode ===
    "boolean"
  ) {
    settings.maintenanceMode =
      data.maintenanceMode;
  }

  if (
    typeof data.maintenanceTitle ===
    "string"
  ) {
    settings.maintenanceTitle =
      data.maintenanceTitle;
  }

  if (
    typeof data.maintenanceMessage ===
    "string"
  ) {
    settings.maintenanceMessage =
      data.maintenanceMessage;
  }

  await settings.save();

  return settings;
}