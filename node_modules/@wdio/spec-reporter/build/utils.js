"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedRows = exports.printTable = exports.buildTableData = void 0;
const easy_table_1 = __importDefault(require("easy-table"));
const SEPARATOR = '│';
exports.buildTableData = (rows) => rows.map(row => {
    const tableRow = {};
    [...row.cells, ''].forEach((cell, idx) => {
        tableRow[idx] = (idx === 0 ? `${SEPARATOR} ` : '') + cell;
    });
    return tableRow;
});
exports.printTable = (data) => easy_table_1.default.print(data, null, (table) => {
    table.separator = ` ${SEPARATOR} `;
    return table.print();
});
exports.getFormattedRows = (table, testIndent) => table.split('\n').filter(Boolean).map((line) => `${testIndent}  ${line}`.trimRight());
