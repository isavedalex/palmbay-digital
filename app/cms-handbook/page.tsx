import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editing Your Website | Palm Bay Digital",
  description:
    "A plain-English guide to editing your own website in Sanity Studio: signing in, finding your pages, publishing changes, images, alt text and the SEO tab.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cms-handbook" },
};

/**
 * The client-facing CMS handbook. Written to suit every site we build on the
 * template (singleton pages + collections + Presentation + SEO fields), so keep
 * it free of any one client's page names — the menu map below is illustrative.
 *
 * The "within a minute or two" promise in §Timing depends on the page-level
 * `revalidate` safety net being deployed on that client's site. Sites without
 * it only refresh on the next deploy.
 */

/** A name as it appears on screen in the Studio. */
function UI({ children }: { children: React.ReactNode }) {
  return (
    <code className="whitespace-nowrap rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-900 print:bg-transparent print:px-0">
      {children}
    </code>
  );
}

const menu: { group: string; rows: [string, string][] }[] = [
  {
    group: "Pages — one of each",
    rows: [
      ["Site settings", "Phone, email, address, opening hours, social links. Used all over the site."],
      ["Home page", "Everything on your front page, section by section."],
      ["About page", "Your story and photographs."],
      ["Services page", "The wording that introduces what you offer."],
      ["Contact page", "The wording around your contact form."],
    ],
  },
  {
    group: "Lists — add as many as you like",
    rows: [
      ["Services", "One entry per thing you offer. These appear across the site."],
      ["Testimonials", "Customer quotes, with a name and where the review came from."],
      ["FAQs", "Question and answer pairs."],
    ],
  },
  {
    group: "Along the top",
    rows: [
      ["Presentation", "Your site with click-to-edit turned on. The nicest way to work."],
      ["SEO Health", "A checklist of how well each page is set up for Google."],
      ["Analytics", "How many people visited, and which pages they read."],
      ["Vision", "A developer tool. Nothing here for you — and nothing you can break."],
    ],
  },
];

const steps: { title: string; body: React.ReactNode }[] = [
  {
    title: "Open the page you want to change",
    body: "Click it in the left-hand menu. To edit one of your services or reviews, open the list first, then the item inside it.",
  },
  {
    title: "Edit the fields",
    body: "Click into any box and type. Your work is saved as you go — but saved is not the same as live. Nobody can see it yet.",
  },
  {
    title: "Check the preview",
    body: "The preview beside your text updates as you type, so you can see exactly how the wording will sit before anyone else does.",
  },
  {
    title: "Press Publish",
    body: (
      <>
        The <UI>Publish</UI> button is at the bottom of the panel you are editing in. This is the
        step that makes your change public.
      </>
    ),
  },
  {
    title: "Look at your live site",
    body: "Open your website in a normal browser tab and refresh. Give it a minute — see 'How long changes take' below.",
  },
];

const avoid: React.ReactNode[] = [
  "Changing the web address of a page that is already live. Existing links and Google results will break — ask us instead.",
  "Pasting from Word or Google Docs. It carries hidden formatting; paste as plain text, or type it in.",
  "Emptying a field to hide a section. Tell us what you want gone and we will remove it properly.",
  "Deleting items from your lists. If a service is only paused, move it down the order rather than delete it.",
];

export default function CmsHandbookPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:py-24">
      <article className="mx-auto w-full max-w-3xl font-helvetica text-neutral-800">
        <p className="text-sm font-semibold text-neutral-500">Palm Bay Digital</p>
        <h1 className="mt-2 font-monument text-3xl font-bold text-neutral-900 md:text-4xl">
          Editing your website
        </h1>
        <p className="mt-6 leading-relaxed">
          Your site has a built-in editor called Sanity Studio. This is everything you need to
          change your own words and pictures — about five minutes of reading.
        </p>

        {/* Signing in */}
        <section className="mt-12">
          <h2 className="font-monument text-lg font-bold text-neutral-900">Signing in</h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Add <UI>/studio</UI> to the end of your website address — so{" "}
              <UI>yourbusiness.co.uk/studio</UI> — and sign in with the email address your
              invitation was sent to. Bookmark that page; it is the only address you need.
            </p>
            <p>
              You can sign in from a computer, tablet or phone. A computer, or a tablet held in
              landscape, is far more comfortable: the editor puts your content on one side and a
              preview of your site on the other.
            </p>
          </div>
        </section>

        {/* Menu map */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">What you&rsquo;ll see</h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Down the left is a menu of everything you can edit. It has two halves:{" "}
              <strong>pages</strong>, where there is exactly one of each, and <strong>lists</strong>,
              where you can add, remove and reorder as many items as you like.
            </p>
          </div>

          <div className="mt-5 rounded border border-neutral-200 p-5">
            {menu.map((section) => (
              <div
                key={section.group}
                className="mt-5 border-t border-neutral-200 pt-4 first:mt-0 first:border-t-0 first:pt-0"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {section.group}
                </p>
                <dl className="mt-3 space-y-2.5">
                  {section.rows.map(([name, what]) => (
                    <div key={name} className="sm:grid sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="font-mono text-sm text-neutral-900">{name}</dt>
                      <dd className="text-sm leading-relaxed text-neutral-600">{what}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-4 leading-relaxed">
            Your site may use slightly different names, or have an extra list or two. The shape is
            always the same.
          </p>
        </section>

        {/* Steps */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">Making a change</h2>
          <ol className="mt-4 space-y-5">
            {steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4">
                <span className="border-t-2 border-palmbay-bluebg pt-1 font-mono text-sm text-palmbay-bluebg">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-monument text-base font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* The one rule */}
        <section className="mt-10 break-inside-avoid border-l-[3px] border-palmbay-darkpink bg-palmbay-pink/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-palmbay-darkpink">
            The one rule
          </p>
          <h2 className="mt-2 font-monument text-lg font-bold text-neutral-900">
            Publish every document you touch
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Publishing is per document, not per session. If you edit your home page, one of your
              services and an FAQ, that is <strong>three</strong> separate documents and{" "}
              <strong>three</strong> separate presses of <UI>Publish</UI>.
            </p>
            <p>
              Anything you have edited but not published stays a private draft. You will see it in
              the editor and in the preview; your customers will not see it at all.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 rounded border border-neutral-300 bg-white p-4">
            <span className="rounded bg-[#2276FC] px-4 py-2 text-sm font-semibold text-white">
              Publish
            </span>
            <span className="flex items-center gap-2 text-sm text-neutral-600">
              <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              Unpublished changes
            </span>
          </div>
          <p className="mt-2 text-xs italic text-neutral-500">
            The bottom of the editing panel. A coloured dot beside the button means something is
            still waiting to go live.
          </p>

          <p className="mt-5 border-t border-palmbay-darkpink/20 pt-4 text-sm leading-relaxed text-neutral-700">
            <strong className="text-neutral-900">On a tablet:</strong> the <UI>Publish</UI> button
            sits at the very bottom of the editing panel, where it can crowd against other
            controls. Turning the tablet to landscape gives the editor more room and makes it easy
            to find.
          </p>
        </section>

        {/* Presentation */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">
            Editing straight on the preview
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              The <UI>Presentation</UI> tab shows your real website with editing turned on. Click
              almost any piece of text on the page and the editor jumps straight to the field that
              controls it — much easier than hunting through a menu.
            </p>
            <p>
              While you are in there, your site is showing you unpublished drafts. That is the
              point, but it means what you see is not necessarily what the public sees. The rule
              above still applies.
            </p>
            <p>
              If you ever open your normal site and it shows drafts, or a small{" "}
              <UI>Exit preview</UI> button, click that button. It returns you to the site as
              everyone else sees it.
            </p>
          </div>
        </section>

        {/* Images */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">Images</h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Drag a photo straight onto any image box. Upload the best quality you have — a
              full-size photo straight from a phone or camera is ideal. You never need to shrink
              or compress it first: the original is kept safely, and every visitor is sent a
              copy resized for their screen, so the site stays fast whatever you upload.
            </p>
            <p>
              The only limit is an enormous one (256 megapixels — many times larger than any
              phone photo). If a file is refused, it is almost certainly not a photograph.
            </p>
            <p>
              Every image asks for <strong>alt text</strong>: one short sentence describing what is
              in the picture, for people using a screen reader and for Google. &ldquo;The studio
              floor with a squat rack and weights&rdquo; is perfect. You don&rsquo;t need to write
              &ldquo;photo of&rdquo;.
            </p>
            <p>
              Keep to the shape that is already there. If the picture you are replacing is upright,
              use an upright one, or the layout will crop it in ways you didn&rsquo;t intend.
            </p>
          </div>
        </section>

        {/* SEO */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">The SEO tab</h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Most pages have an <UI>SEO</UI> tab holding the words Google shows in its results. It
              is already filled in sensibly; you only need it when a page&rsquo;s purpose really
              changes.
            </p>
            <ul className="space-y-2 pl-0">
              <li>
                <strong>Title</strong> — around 60 characters. What the page is, and where you are.
              </li>
              <li>
                <strong>Description</strong> — around 155 characters. A sentence that would make
                someone choose you from a list of search results.
              </li>
              <li>
                <strong>Focus keyword</strong> — the one phrase you would most like this page to be
                found for. The <UI>SEO Health</UI> screen scores the page against it.
              </li>
            </ul>
            <p>
              Leave the <UI>Index</UI> and <UI>Follow</UI> switches on. Turning them off asks Google
              to forget the page.
            </p>
          </div>
        </section>

        {/* Open Graph */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">
            The share image (Open Graph)
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              When someone pastes a link to your site into WhatsApp, Facebook, Instagram, LinkedIn
              or a text message, a little card appears: a picture, a title and a line of text.
              That card is built from your page&rsquo;s <strong>Open Graph</strong> details, and
              the picture comes from the <UI>Meta Image</UI> field on the <UI>SEO</UI> tab. Google
              can use the same image beside your listing too.
            </p>
            <p>
              It matters more than it looks. A link with a good photo gets opened; a link with a
              grey box or a stretched logo gets scrolled past. It is the first thing most people
              ever see of your business &mdash; before they have visited the site at all.
            </p>
            <ul className="space-y-2 pl-0">
              <li>
                <strong>Every page needs one.</strong> Your site launched with a share image on
                every page. If you add a new page, add one to it &mdash; a page without one shows
                whatever the app can find, which is usually nothing.
              </li>
              <li>
                <strong>Landscape, roughly 1200 by 630 pixels.</strong> Wider than it is tall, like
                a letterbox. Upright photos get cropped to a strip; square logos get squashed.
              </li>
              <li>
                <strong>Use your best photograph, not your logo.</strong> A real photo of your
                work, your place or your team does the job. Your name and logo already sit under
                it in the card, so they don&rsquo;t need to be in the picture.
              </li>
              <li>
                <strong>Keep the title and description honest.</strong> The card also shows the SEO
                <strong> Title</strong> and <strong>Description</strong> from the same tab, so a
                page whose purpose changes needs all three updated together.
              </li>
            </ul>
            <p>
              To check what people will see, paste your page&rsquo;s address into a WhatsApp
              message to yourself. If the card looks wrong, the image or the words on the{" "}
              <UI>SEO</UI> tab are the place to fix it. Changes can take a day or two to reach apps
              that have already seen the old version.
            </p>
          </div>
        </section>

        {/* Timing */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">
            How long changes take
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed">
            <p>
              Once published, a change reaches your live site within a minute or two. If you already
              have the site open in another tab, it can be near-instant.
            </p>
            <p>
              If something still looks old after that, refresh the page properly first — hold{" "}
              <UI>Shift</UI> and click reload. If it is still wrong, it is almost always an
              unpublished draft. Go back and look for the coloured dot.
            </p>
          </div>
        </section>

        {/* Avoid */}
        <section className="mt-10">
          <h2 className="font-monument text-lg font-bold text-neutral-900">Best left alone</h2>
          <ul className="mt-3 space-y-2.5">
            {avoid.map((item, i) => (
              <li key={i} className="grid grid-cols-[0.4rem_1fr] gap-3 leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-neutral-200 pt-4 text-sm leading-relaxed text-neutral-600">
            Your main pages are deliberately locked so they can&rsquo;t be deleted by accident —
            that is why there is no delete option on them.
          </p>
        </section>

        <section className="mt-10 border-t-2 border-neutral-900 pt-6">
          <p className="leading-relaxed">
            Stuck, or want something changed that this guide doesn&rsquo;t cover? Email{" "}
            <a
              href="mailto:hello@palmbay.digital"
              className="font-semibold text-palmbay-darkpink underline underline-offset-2"
            >
              hello@palmbay.digital
            </a>{" "}
            describing what you&rsquo;d like and which page it&rsquo;s on — that is always enough to
            get started.
          </p>
        </section>
      </article>
    </main>
  );
}
