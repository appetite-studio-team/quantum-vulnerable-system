import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "w-8 h-8", size = 32 }: LogoProps) {
  return (
    <Image
      src="/icon.png"
      alt="Quantum Vulnerabilities"
      width={size}
      height={size}
      className={className}
      priority
      unoptimized
    />
  );
}
