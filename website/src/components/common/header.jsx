import Image from "next/image";
import ConnectWallet from "../ui/connectWallet";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 py-4 px-8 flex items-center justify-between w-full">
      <Link href={"/"}>
        <Image className="h-16" src={logo} alt="Logo" />
      </Link>
      <ConnectWallet />
    </div>
  );
}
