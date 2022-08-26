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
import { search } from 'nlcst-search';
import { toString } from 'nlcst-to-string';
import type { Plugin } from 'unified';
import type { Root } from 'nlcst-search';
/* ·········································································· */
// TODO: Add URL reference to message / hint like `remark-lint` rules
// import { homepage } from './package.json' assert { type: 'json' };
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

const retextCasePolice: Plugin<[], Root> = () => (tree, file) => {
  search(tree, casePoliceKeys, (nodes) => {
    const original = toString(nodes);
    const originalLowercased = original.toLowerCase();
    const correctOne = casePoliceDicts[originalLowercased];

    if (original !== correctOne) {
      if (nodes[0].type === 'WordNode') {
        file.message(
          `"${original}" must be spelled "${correctOne}"`,
          nodes[0].children[0],
          `retext-case-police:${correctOne}`,
        );
      }
    }
  });
};

export default retextCasePolice;
