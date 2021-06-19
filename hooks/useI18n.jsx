import { es, en } from "../lib/texts";
import { useRouter } from "next/router";
/**
 *
 * @returns object with localized texts for use in the page
 */
function useI18n() {
  const router = useRouter();
  const t = router.locale === "es" ? es : en;
  return t;
}

export default useI18n;
