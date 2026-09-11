import { DashboardWidgetContainer, type DashboardWidget } from "@sanity/dashboard";

// Mirrors sanity-plugin-plausible-analytics's own Widget/plugin shape (see
// node_modules/sanity-plugin-plausible-analytics/src/{widget,plugin}.tsx) —
// @sanity/dashboard ships no generic iframe widget, so this is the same
// ~20-line pattern with the URL swapped and no Plausible-specific resize
// script. `url` is a project's OpenSEO share link
// (https://seo.palmbay.digital/embed/<token>, created in OpenSEO project
// settings > Sharing) — a read-only, token-authenticated snapshot with no
// login required, so no Sanity-side auth wiring is needed here.
export interface OpenSeoWidgetConfig {
  title?: string;
  url: string;
  height?: string;
}

function OpenSeoWidget({
  title = "OpenSEO",
  url,
  height = "1600px",
}: OpenSeoWidgetConfig) {
  return (
    <DashboardWidgetContainer header={title}>
      <iframe
        src={url}
        loading="lazy"
        style={{
          width: "100%",
          minWidth: "calc(100% - 1px)",
          height,
          border: "none",
          verticalAlign: "middle",
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
