// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import { createRow } from '../helpers';
import type Options from '../options';
import getAdjustedRow from '../helpers/getAdjustedRow';

/**
 * Insert a new row in current table
 */
function insertRow(
    opts: Options,
    change: Change,
    at?: number, // row index
    textGetter?: number => string
) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(opts, state, startBlock);
    const { table } = pos;

    // Create a new row with the right count of cells
    const firstRow = table.nodes.get(0);
    const presetAlign = table.data.get('presetAlign');
    let newRow = createRow(opts, firstRow.nodes.size, textGetter);
    newRow = getAdjustedRow(newRow, presetAlign);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return change
        .insertNodeByKey(table.key, at, newRow)
        .collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;