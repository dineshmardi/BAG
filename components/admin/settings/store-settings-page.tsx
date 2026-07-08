"use client";

import { StoreSettingsForm } from "./store-settings-form";

type Props = {
  settings: any;
};

export function StoreSettingsPage({
  settings,
}: Props) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Store Settings
      </h1>

      <StoreSettingsForm
        settings={settings}
      />
    </main>
  );
}