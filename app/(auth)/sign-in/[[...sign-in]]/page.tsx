import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cookies } from "next/headers";

export default function Page() {
  const theme = cookies().get("x-theme")?.value;
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      <SignIn
        appearance={{
          variables: { colorPrimary: "#ff7000" },
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
}
