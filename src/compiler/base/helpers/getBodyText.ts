﻿import CodeBlockWriter from "code-block-writer";
import {writeTextFromStringOrWriter} from "./../../../utils";
import {Node} from "./../../common";

/**
 * @internal
 */
export function getBodyText(writer: CodeBlockWriter, textOrWriterFunction: string | ((writer: CodeBlockWriter) => void)) {
    writer.newLineIfLastNotNewLine();
    if (typeof textOrWriterFunction !== "string" || textOrWriterFunction.length > 0)
        writer.indentBlock(() => {
            writeTextFromStringOrWriter(writer, textOrWriterFunction);
        });
    writer.newLineIfLastNotNewLine();
    writer.write(""); // write last line's indentation
    return writer.toString();
}