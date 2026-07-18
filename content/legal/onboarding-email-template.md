# Onboarding email template (operator sends manually)

Send this when a lead says yes (form fill or reply), BEFORE the GoCardless
mandate request and first Xero invoice. Keep their "YES" reply — label it
`contracts/accepted` in Gmail. It's your evidence pack if a Direct Debit is
ever charged back under the DD guarantee.

---

**Subject:** Your new website — one quick confirmation and we're off

Hi {name},

Brilliant — let's get {business} live. Here's how it works:

1. **Your price:** £{price}/month, all-in. No setup fee, no minimum term —
   you can cancel any time with 30 days' notice.
2. **The paperwork (2 minutes):** our plain-English subscription agreement is
   here: https://palmbay.digital/terms (Version 1.0 — 18 July 2026). It says,
   in short: you own your content and your domain, we own the code, you can
   leave whenever you like and we hand everything of yours over free.
   **Just reply YES to this email to confirm you accept it.**
3. **Payment:** once you've replied, you'll get a GoCardless email to set up
   the Direct Debit (it references the same agreement), and your first
   invoice from us via Xero.
4. **Going live:** tell me the domain you'd like (or the one you already
   have) and any changes to the preview — your site is live within days.

Any questions, just reply — you're talking to me directly.

Alex
Palm Bay Digital Ltd · palmbay.digital
Company no. 15996143 (England & Wales) · Registered office: Flat 12a
Highcliffe Hall, 16 Eastern Esplanade, Margate CT9 2JB

---

## Xero / GoCardless setup reminders

- Xero repeating invoice: £{price}/mo, **no VAT** (not registered), invoice
  footer text: "Service provided under the Website Subscription Agreement
  v1.0 — palmbay.digital/terms".
- GoCardless: connect to Xero (native integration); edit the mandate-request
  email template to add the same terms line.
- On any STOP/cancellation email: acknowledge, calendar the 30-day end date,
  and follow contract clause 7 (content export + domain transfer, free).
