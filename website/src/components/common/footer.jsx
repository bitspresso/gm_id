import github from "../../../public/images/github.svg";
import email from "../../../public/images/email.svg";
import twitter from "../../../public/images/twitter.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex z-10 justify-center flex-wrap gap-4 fixed bottom-0 pb-4 left-4 w-full backdrop-blur-xl">
      <Link href="https://github.com/bitspresso/gm_id">
        <Image
          className="hover:scale-125 transition-transform w-6 cursor-pointer"
          src={github}
          alt="GitHub"
        />
      </Link>
      <Link href="https://github.com/bitspresso/gm_id">
        <Image
          className="hover:scale-125 transition-transform w-6 cursor-pointer"
          src={email}
          alt="Email"
        />
      </Link>
      <Link href="https://github.com/bitspresso/gm_id">
        <Image
          className="hover:scale-125 transition-transform w-6 cursor-pointer"
          src={twitter}
          alt="Twitter"
        />
      </Link>
    </div>
  );
}
