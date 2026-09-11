import { BrandButton } from "palmbay.digital";

/** The house button on its white section background. */
export function Primary() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-8">
      <BrandButton href="#contact">Let’s talk</BrandButton>
      <BrandButton href="#work" variant="dark">See our work</BrandButton>
    </div>
  );
}

/** On the Palm Bay blue: the pink face plus the ghost outline. */
export function OnBrandBlue() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-palmbay-bluebg p-8">
      <BrandButton href="#contact">Let’s talk</BrandButton>
      <BrandButton href="#work" variant="ghost">See our work</BrandButton>
    </div>
  );
}

/** All three variants side by side, on the surface each is designed for. */
export function AllVariants() {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
      <div className="flex items-center justify-center bg-white p-8">
        <BrandButton href="#" variant="primary">Primary</BrandButton>
      </div>
      <div className="flex items-center justify-center bg-palmbay-bluebg p-8">
        <BrandButton href="#" variant="ghost">Ghost</BrandButton>
      </div>
      <div className="flex items-center justify-center bg-white p-8">
        <BrandButton href="#" variant="dark">Dark</BrandButton>
      </div>
    </div>
  );
}

/** External links get target/rel — used for client site links in Work. */
export function ExternalLink() {
  return (
    <div className="bg-white p-8">
      <BrandButton href="https://ellwood.studio" external>
        Visit Ellwood Studio
      </BrandButton>
    </div>
  );
}
