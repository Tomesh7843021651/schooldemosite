/**
 * Type-safe translation keys for next-intl.
 *
 * The English message file is the source of truth. `useTranslations` /
 * `getTranslations` will autocomplete keys and fail compilation when a
 * referenced key does not exist in en.json.
 *
 * The other locale files (hi.json, mr.json) must keep the same shape; any
 * drift is caught at runtime by next-intl when the missing key is read.
 */

import type messages from "./messages/en.json";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

type Messages = typeof messages;

export {};
