import { PhoneFrame } from "palmbay.digital";
import { PHONE_SHOT } from "../shims/shots";

/** The iPhone mock-up at its natural width. */
export function Default() {
  return (
    <div className="bg-white p-10">
      <PhoneFrame
        src={PHONE_SHOT}
        alt="Ellwood Studio on mobile"
        sizes="(max-width: 768px) 40vw, 12rem"
        className="mx-auto w-40"
      />
    </div>
  );
}

/** On the brand blue, as the statement band uses it. */
export function OnBrandBlue() {
  return (
    <div className="bg-palmbay-bluebg p-10">
      <div className="relative mx-auto max-w-md">
        <PhoneFrame
          src={PHONE_SHOT}
          alt="Ellwood Studio on mobile"
          sizes="12rem"
          className="mx-auto w-32"
        />
      </div>
    </div>
  );
}
