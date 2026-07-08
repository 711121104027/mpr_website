//src/app/MPRfuradm/login/page.tsx

import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4">
      <LoginForm />
    </main>
  );
}