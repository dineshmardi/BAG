import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-6">
      <div className="w-full rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Login
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}