# /kits/ Commerce Runbook

**Scope:** MVP-001, the Trump Account Family Decision Guide. Execution work under the existing MVP approval, not a new capability.
**Created:** 2026-07-25. **Owner:** Dalia. **Status:** ready for owner Stripe setup.

This file is the operating procedure for the first paid kit. It is deliberately small. There is no store, no cart, no customer portal, no database, and no custom Stripe integration.

---

## 1. What exists in the repo

| Path | What it is |
|---|---|
| `kits/index.html` | Storefront index. Lists available kits. Extensible: add a `.kitcard` block per new kit. |
| `kits/trump-account-family-decision-guide.html` | The kit page, English. Free explainer in full, then the paid layer. |
| `kits/guia-familiar-cuentas-trump.html` | The kit page, Spanish (usted). Same structure, same price. |
| `kits/thank-you.html` | Branded post-payment page. Bilingual, `noindex`. Stripe redirects here. |
| `js/kit-commerce.js` | **The only file to edit to go live.** Holds the Payment Link and price. Fires analytics. |
| `js/kit-email.js` | Email capture, posts to the existing `/api/subscribe`. |
| `css/fsa-kits.css` | Shared styling. Uses existing canonical tokens only, defines no new ones. |

Routing: the site runs `cleanUrls: true` and `trailingSlash: false` on Vercel, so `kits/foo.html` serves at `/kits/foo`. No `vercel.json` change is required.

---

## 2. Secrets policy, non-negotiable

**Only one Stripe value ever enters this repo: the public `https://buy.stripe.com/...` Payment Link.** That URL is meant to be public. It is safe in Git.

Never put in the repo, in a file, in a log, in documentation, or in a chat window with Claude or anyone else:

- the Stripe secret key (`sk_live_...`, `sk_test_...`)
- any restricted key (`rk_...`)
- the webhook signing secret (`whsec_...`)
- the Stripe account password or recovery codes
- bank account or routing numbers

If automatic fulfillment is built later (section 8), any key it needs lives **only** in Vercel environment variables, set through the Vercel dashboard, and never in a file.

**Bank payouts are owner-managed and sit entirely outside this repository.** Stripe pays the balance to the business bank account configured by Dalia in the Stripe Dashboard. The website never sees those details, and neither does Claude.

---

## 3. Stripe Dashboard setup (owner, once)

Do this in **test mode first**, then repeat in live mode.

1. **Product.** Products → Add product.
   - Name: `Trump Accounts: An Independent Family Decision Guide`
   - Description: `Printable decision workbook, English and Spanish. Delivered by email within 24 hours.`
   - Price: `49.00 USD`, one time.
2. **Payment Link.** Payment Links → Create → select that price.
   - Quantity: fixed at 1, adjustable off.
   - **Collect customer email: on.** This is the delivery address, so it is not optional.
   - Collect billing address: on if your tax situation calls for it, otherwise leave off to reduce friction.
   - Promotion codes: off for now.
3. **After payment.** In the Payment Link's "After payment" settings, choose **Redirect to your website** and enter:

   ```
   https://financiallysovereign.academy/kits/thank-you?session_id={CHECKOUT_SESSION_ID}
   ```

   Type `{CHECKOUT_SESSION_ID}` literally. Stripe substitutes it. The thank-you page uses only the last 12 characters as a human-readable support reference, and no secret is required to read it.
4. **Receipts.** Settings → Customer emails → turn on successful-payment receipts so the buyer gets a Stripe receipt immediately, separate from your manual delivery.
5. **Notification to you.** Make sure you receive Stripe's payment notification on a device you actually check, since the 24-hour delivery promise depends on it.
6. **Copy the public link.** It looks like `https://buy.stripe.com/xxxxxxxxxxxxxx`.

---

## 4. Going live in the repo (one edit)

Open `js/kit-commerce.js` and replace the placeholder:

```js
paymentLink: 'REPLACE_WITH_STRIPE_PAYMENT_LINK',
```

with the copied URL:

```js
paymentLink: 'https://buy.stripe.com/xxxxxxxxxxxxxx',
```

That is the entire change. Price display is driven from the same object (`priceDisplay`), so page copy and checkout cannot drift apart.

**Safety behaviour:** while the placeholder is in place, the buy buttons do not link anywhere. They render disabled, read "Checkout opens shortly", and fire a `kit_checkout_unavailable` event. A visitor can never be sent to a dead checkout.

---

## 5. Test-mode checkout test (before live)

1. Create the test-mode Payment Link (section 3, test mode toggle on).
2. Put the test link into `js/kit-commerce.js` on a branch, and push to get a Vercel preview deployment. Do not merge this.
3. On the preview URL, click the buy button.
4. Pay with Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC, any postal code.
5. Confirm all of the following:
   - Stripe checkout loads and shows $39.00 and the correct product name.
   - After payment you land on `/kits/thank-you` and the page renders.
   - An order reference appears in the confirmation box (this proves the `session_id` redirect is wired correctly).
   - The test payment appears in the Stripe test dashboard with the buyer email captured.
6. Revert the test link, then put the **live** link in on the branch you actually merge.

---

## 6. Manual fulfillment procedure (temporary, founding period)

This is the temporary procedure for the founding MVP. It is manual on purpose: volume is tiny, and a human check on the first buyers is worth more than automation.

**On each Stripe payment notification:**

1. Open the payment in the Stripe Dashboard. Copy the customer email.
2. Reply within 24 hours, target same day, with the delivery email below. Attach both PDFs (EN and ES) directly to the email. **Do not** paste a permanently public download URL. If a file is too large to attach, use a link that expires.
3. Log the sale in the observation ledger: date, amount, language of the page they bought from, and anything they said. That log is the behavioural evidence MVP-001 exists to collect.

**Delivery email, English:**

> Subject: Your Trump Accounts family decision kit
>
> Hello,
>
> Thank you for buying the kit. Both files are attached: the English workbook and the Spanish one.
>
> A suggestion on how to use it. Print pages 1 to 3 and work through them in one sitting with whoever else is part of the decision. It is built to be filled in by hand, together, rather than read.
>
> Two things worth repeating. This is educational material, not advice about your specific situation. And The Sovereign Academy has no affiliation with the U.S. government, the Treasury, the IRS, or the Trump Accounts program.
>
> If anything in it is unclear or wrong, reply to this email and tell me. At this stage I read every reply personally.
>
> If it is not useful to you, reply and I will refund you. 30 days, no questions, and you keep the kit.
>
> Dalia
> Financially Sovereign Academy

**Delivery email, Spanish:**

> Asunto: Su kit familiar sobre las Cuentas Trump
>
> Hola,
>
> Gracias por su compra. Van adjuntos los dos archivos: el cuadernillo en español y el de inglés.
>
> Una sugerencia sobre cómo usarlo. Imprima las páginas 1 a 3 y trabájelas en una sola sentada con quien más participe en la decisión. Está hecho para llenarse a mano, en conjunto, no para leerse.
>
> Vale la pena repetir dos cosas. Este es material educativo, no asesoría sobre su situación particular. Y The Sovereign Academy no tiene ninguna afiliación con el gobierno de Estados Unidos, el Tesoro, el IRS ni el programa de Cuentas Trump.
>
> Si algo no queda claro o está mal, responda a este correo y dígamelo. En esta etapa yo leo personalmente cada respuesta.
>
> Si no le sirve, responda y le devuelvo su dinero. 30 días, sin preguntas, y el kit se lo queda usted.
>
> Dalia
> Financially Sovereign Academy

**Refund procedure:** Stripe Dashboard → the payment → Refund → full amount. Reply confirming it is done and that they keep the kit. Do not ask why. The page promises no questions, so asking any breaks the promise.

**If you will be unreachable for more than a day,** either pre-write the delivery email as a draft you can send from a phone, or pause the Payment Link in Stripe. A missed 24-hour promise costs more than a missed sale, especially with an audience whose first instinct is that this is a scam.

---

## 7. Analytics events

All events go through the existing `js/analytics.js` service, which already posts to the shared `/api/track` endpoint. No new analytics vendor was added.

| Event | Fires when | Properties |
|---|---|---|
| `page_view` | any page load (existing behaviour) | `path`, `referrer`, `site` |
| `kit_page_view` | a kit page loads | `kitId`, `lang` |
| `kit_checkout_click` | a buy button is clicked with a live link | `kitId`, `placement`, `price`, `currency` |
| `kit_checkout_unavailable` | a buy button is clicked while the link is still a placeholder | `kitId`, `placement` |
| `kit_email_capture` | email capture succeeds | `kitId`, `lang` |
| `kit_purchase_confirmed` | the thank-you page loads | `kitId`, `hasSessionId` |

**Known limit, stated rather than hidden:** `kit_purchase_confirmed` is a page-load event on the redirect target, not a server-verified payment. A buyer who closes the tab before the redirect will not fire it, and the URL can be visited directly. **Stripe is the source of truth for revenue.** Use these events for funnel shape only, and reconcile counts against the Stripe Dashboard before drawing any conclusion.

---

## 8. Later, non-blocking: automatic fulfillment

Do not build this until demand is demonstrated. It is recorded here so the path is known, not so it gets built early.

Once there is repeat demand, automatic fulfillment can be added with:

- a Stripe webhook on `checkout.session.completed`, with the signature **verified** on every request using the webhook signing secret
- a serverless handler that emails the kit, using a time-limited or signed download URL rather than a permanently public file
- delivery logged so a failed send is visible rather than silent

Constraints that carry over unchanged: any keys live **only** in Vercel environment variables, never in Git, never in repository files, never in logs, never in documentation, never in chat. The paid kit still never sits behind a permanently public download URL.

---

## 9. Adding the next kit

The structure is built to take more kits without a rewrite.

1. Add `kits/<new-kit-slug>.html`, using the Trump Accounts page as the pattern: free explainer in full first, then the paid layer, then the boundaries block.
2. Add the Spanish page if there is a Spanish audience, with reciprocal `hreflang` links.
3. Add an entry to the `KITS` object in `js/kit-commerce.js` with its own Payment Link and price.
4. Add a `.kitcard` block to `kits/index.html`.
5. Add the URLs to `sitemap.xml`.

Do not add a cart, a customer portal, a database, or a custom Stripe integration to do this. If a future kit seems to require one, that is a decision for the owner, not a technical detail.
