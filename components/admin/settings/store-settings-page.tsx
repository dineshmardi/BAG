"use client";

import {
  StoreSettingsForm,
} from "./store-settings-form";

type Props = {
  settings: any;
};

export function StoreSettingsPage({
  settings,
}: Props) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#a98235]">
            CONFIGURATION
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
            Store Settings
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Manage your store configuration,
            payments, shipping and maintenance
            settings.
          </p>
        </div>

        <StoreSettingsForm
          settings={settings}
        />
      </div>
    </div>
  );
}