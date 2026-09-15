import { useEffect, useRef, useState } from "react";
import { DashboardWidgetContainer, type DashboardWidget } from "@sanity/dashboard";

// Mirrors sanity-plugin-plausible-analytics's own Widget/plugin shape (see
// node_modules/sanity-plugin-plausible-analytics/src/{widget,plugin}.tsx) —
// @sanity/dashboard ships no generic iframe widget, so this is the same
// ~20-line pattern with the URL swapped. `url` is a project's OpenSEO share
// link (https://seo.palmbay.digital/embed/<token>, created in OpenSEO
// project settings > Sharing) — a read-only, token-authenticated snapshot
// with no login required, so no Sanity-side auth wiring is needed here.
//
// The embed page posts `{ type: "openseo-embed:height", height }` whenever
// its content resizes (each card is a click-to-expand <details>), and the
// iframe follows it so expanding a section grows the tab instead of
// trapping the content behind an inner scrollbar. `height` is only the
// starting size before the first message arrives.
export interface OpenSeoWidgetConfig {
  title?: string;
  url: string;
  height?: number;
}

const HEIGHT_MESSAGE_TYPE = "openseo-embed:height";

function OpenSeoWidget({
  title = "OpenSEO",
  url,
  height: initialHeight = 720,
}: OpenSeoWidgetConfig) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const embedOrigin = new URL(url).origin;

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== embedOrigin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      const data: unknown = event.data;
      if (
        typeof data === "object" &&
        data !== null &&
        (data as { type?: unknown }).type === HEIGHT_MESSAGE_TYPE &&
        typeof (data as { height?: unknown }).height === "number"
      ) {
        setHeight(Math.ceil((data as { height: number }).height));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedOrigin]);

  return (
    <DashboardWidgetContainer header={title}>
      <iframe
        ref={frameRef}
        src={url}
        loading="lazy"
        scrolling="no"
        style={{
          width: "100%",
          minWidth: "calc(100% - 1px)",
          height: `${height}px`,
          border: "none",
          verticalAlign: "middle",
          display: "block",
        }}
      />
    </DashboardWidgetContainer>
  );
}

export function openSeoWidget(config: OpenSeoWidgetConfig): DashboardWidget {
  return {
    name: "open-seo-widget",
    component: function component() {
      return <OpenSeoWidget {...config} />;
    },
    layout: { width: "full" },
  };
}
