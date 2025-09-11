"use client";

import { useRouter } from "next/navigation";

interface AuthButtonProps {
  isLoggedIn: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AuthButton({
  isLoggedIn,
  className,
  children,
}: AuthButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/trips");
    } else {
      router.push("/login");
    }
  };
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
