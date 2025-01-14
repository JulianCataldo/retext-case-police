/* ——————————————————————————————————————————————————————————————————————————— *
 *              © Julian Cataldo — https://www.juliancataldo.com.              *
 *                      See LICENSE in the project root.                       *
/* —————————————————————————————————————————————————————————————————————————— */

import abbrs from 'case-police/dict/abbreviates.json' assert { type: 'json' };
import brands from 'case-police/dict/brands.json' assert { type: 'json' };
import general from 'case-police/dict/general.json' assert { type: 'json' };
import products from 'case-police/dict/products.json' assert { type: 'json' };
import softwares from 'case-police/dict/softwares.json' assert { type: 'json' };
/* ·········································································· */
import type { Plugin } from 'unified';
import { search } from 'nlcst-search';
import type { Root } from 'nlcst-search';
import { toString } from 'nlcst-to-string';
/* —————————————————————————————————————————————————————————————————————————— */

const url = 'https://github.com/JulianCataldo/retext-case-police';

export type Dict = Record<string, string>;
const casePoliceDicts: Dict = {
  ...abbrs,
  ...brands,
  ...general,
  ...products,
  ...softwares,
};
const casePoliceKeys = Object.entries(casePoliceDicts).map(([token]) => token);

export interface Settings {
  /** List of words to ignore */
  ignore?: string[];
}
const retextCasePolice: Plugin<[Settings] | [], Root> =
  (settings = {}) =>
  (tree, file) => {
    const ignore = settings.ignore ?? [];

    search(tree, casePoliceKeys, (nodes) => {
      const actual = toString(nodes);
      const actualLowerCased = actual.toLowerCase();
      const actualLowerCasedNoHyphens = actual.toLowerCase().replace(/-/g, '');
      const expected = casePoliceDicts[actualLowerCased] ?? casePoliceDicts[actualLowerCasedNoHyphens];

      if (!ignore.includes(expected) && actual !== expected) {
        const msg = file.message(
          `Expected casing of \`${expected}\` instead of \`${actual}\``,
          nodes[0],
          `retext-case-police:${expected}`,
        );
        msg.ruleId = 'retext-case-police';
        msg.actual = actual;
        msg.expected = [expected];
        msg.url = url;
      }
    });
  };

export default retextCasePolice;
