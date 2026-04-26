"use client";

import { Box, Button, Card, Code, Heading, Stack, Text } from "@sanity/ui";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof location !== "undefined" ? location.origin : "");

const reportUrl = (url: string) =>
  `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`;

export default function PageSpeedTool() {
  const homeUrl = SITE_URL.replace(/\/$/, "");

  return (
    <Box padding={5}>
      <Stack space={5} style={{ maxWidth: 720 }}>
        <Stack space={2}>
          <Heading as="h1" size={3}>
            Page Speed
          </Heading>
          <Text size={2} muted>
            Run a Google PageSpeed Insights audit on the live site. Opens in a
            new tab — Google blocks the report from rendering inside an iframe,
            so embedding it here isn&rsquo;t possible.
          </Text>
        </Stack>

        <Card padding={4} radius={2} shadow={1} tone="default">
          <Stack space={3}>
            <Text size={1} muted>
              Auditing
            </Text>
            <Code size={2}>{homeUrl}</Code>
            <Box paddingTop={2}>
              <a
                href={reportUrl(homeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  text="Run PageSpeed audit"
                  tone="primary"
                  mode="default"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </Box>
          </Stack>
        </Card>

        <Stack space={2}>
          <Text size={1} weight="semibold">
            What this tool does
          </Text>
          <Text size={1} muted>
            Opens pagespeed.web.dev with your site&rsquo;s URL pre-filled.
            Google runs Lighthouse against the page and shows scores for
            Performance, Accessibility, Best Practices, and SEO, plus
            real-world Core Web Vitals from Chrome User Experience Report
            (CrUX) data when available. Edit the URL on the report page to
            audit a specific subpage.
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
