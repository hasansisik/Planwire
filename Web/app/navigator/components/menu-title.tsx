import Image from "next/image";

export default function MenuTitle() {
  return (
    <div className="flex items-center p-4 justify-center">
      <Image
        src="/planwirelogo.png"
        width="110"
        height="50"
        alt="Planwire"
      />
    </div>
  );
}
