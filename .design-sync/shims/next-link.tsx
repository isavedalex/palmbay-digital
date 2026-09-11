/** Design-sync shim for next/link: a plain <a>. */
export default function Link({ href, children, replace, scroll, prefetch, shallow, locale, passHref, legacyBehavior, ...rest }: any) {
  const resolved = typeof href === "string" ? href : href?.pathname ?? "#";
  return <a href={resolved} {...rest}>{children}</a>;
}
