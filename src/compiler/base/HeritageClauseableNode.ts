﻿import * as ts from "typescript";
import {Node} from "./../common";
import {HeritageClause} from "./../general/HeritageClause";

export type HeritageClauseableNodeExtensionType = Node<ts.Node & { heritageClauses?: ts.NodeArray<ts.HeritageClause>; }>;

export interface HeritageClauseableNode {
    getHeritageClauses(): HeritageClause[];
}

export function HeritageClauseableNode<T extends Constructor<HeritageClauseableNodeExtensionType>>(Base: T): Constructor<HeritageClauseableNode> & T {
    return class extends Base implements HeritageClauseableNode {
        /**
         * Gets the heritage clauses of the node.
         */
        getHeritageClauses(): HeritageClause[] {
            const heritageClauses = this.node.heritageClauses;
            if (heritageClauses == null)
                return [];
            return heritageClauses.map(c => this.factory.getHeritageClause(c));
        }
    };
}
