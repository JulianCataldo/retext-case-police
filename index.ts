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
/* ·········································································· */
import * as packageJson from './package.json' assert { type: 'json' };
/* —————————————————————————————————————————————————————————————————————————— */

export type Dict = Record<string, string>;
const casePoliceDicts: Dict = {
  ...abbrs,
  ...brands,
  ...general,
  ...products,
  ...softwares,
};
const casePoliceKeys = Object.entries(casePoliceDicts).map(([key]) => key);

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
      const expected = casePoliceDicts[actualLowerCased];

      // NOTE: Checking `WordNode` is redundant? (https://github.com/retextjs/retext/pull/78#issuecomment-1233442116)
      if (nodes[0].type === 'WordNode') {
        if (!ignore.includes(expected) && actual !== expected) {
          const msg = file.message(
            `Expected casing of \`${expected}\` instead of \`${actual}\``,
            nodes[0].children[0],
            `retext-case-police:${expected}`,
          );
          // `ruleId` and `expected` seems redundant with `origin`, should do visual tests with IDE, CLI, Monaco, etc.
          msg.ruleId = 'retext-case-police';
          msg.actual = actual;
          msg.expected = [expected];
          msg.url = packageJson.homepage;
        }
      }
    });
  };

export default retextCasePolice;
