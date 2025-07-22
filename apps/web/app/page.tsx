import Image from "next/image";
import {TestButton} from "@repo/ui/testButton"

export default function Home() {
  return (
    <div>
      <div className="bg-red-900 font-bold text-4xl">
        Hello from the div 1
      </div>
      <TestButton />

    </div>
  );
}
