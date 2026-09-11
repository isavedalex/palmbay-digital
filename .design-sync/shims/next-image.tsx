import type { CSSProperties } from "react";

/** Design-sync shim for next/image: a plain <img> honouring `fill`. */
export default function Image({
  src, alt = "", fill, width, height, className, style, sizes, priority, quality, placeholder, blurDataURL, loader, unoptimized, onLoad, ...rest
}: any) {
  const resolved = typeof src === "string" ? src : src?.src ?? "";
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : {};
  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      style={{ ...fillStyle, ...(style as CSSProperties) }}
      {...(fill ? {} : { width, height })}
      {...rest}
    />
  );
}
