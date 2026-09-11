import { LaptopFrame } from "palmbay.digital";
import { LAPTOP_SHOT } from "../shims/shots";

/** The MacBook mock-up as used in the statement band, at its natural width. */
export function Default() {
  return (
    <div className="bg-white p-10">
      <div className="mx-auto max-w-md">
        <LaptopFrame src={LAPTOP_SHOT} alt="Ellwood Studio homepage" sizes="(max-width: 768px) 100vw, 28rem" />
      </div>
    </div>
  );
}

/** On the brand blue, which is where the statement band actually uses it. */
export function OnBrandBlue() {
  return (
    <div className="bg-palmbay-bluebg p-10">
      <div className="mx-auto max-w-md">
        <LaptopFrame src={LAPTOP_SHOT} alt="Ellwood Studio homepage" sizes="(max-width: 768px) 100vw, 28rem" priority />
      </div>
    </div>
  );
}
