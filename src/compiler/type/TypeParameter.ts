import * as errors from "../../errors";
import { ts } from "../../typescript";
import { TypeGuards } from "../../utils";
import { Type } from "./Type";

export class TypeParameter extends Type<ts.TypeParameter> {
    /**
     * Gets the constraint or throws if it doesn't exist.
     */
    getConstraintOrThrow(): Type {
        return errors.throwIfNullOrUndefined(this.getConstraint(), "Expected type parameter to have a constraint.");
    }

    /**
     * Gets the constraint type.
     */
    getConstraint(): Type | undefined {
        const declaration = this._getTypeParameterDeclaration();
        if (declaration == null)
            return undefined;
        const constraintNode = declaration.getConstraintNode();
        if (constraintNode == null)
            return undefined;
        return this.global.typeChecker.getTypeAtLocation(constraintNode);
    }

    /**
     * Gets the default type or throws if it doesn't exist.
     */
    getDefaultOrThrow(): Type {
        return errors.throwIfNullOrUndefined(this.getDefault(), "Expected type parameter to have a default type.");
    }

    /**
     * Gets the default type or undefined if it doesn't exist.
     */
    getDefault(): Type | undefined {
        const declaration = this._getTypeParameterDeclaration();
        if (declaration == null)
            return undefined;
        const defaultNode = declaration.getDefaultNode();
        if (defaultNode == null)
            return undefined;
        return this.global.typeChecker.getTypeAtLocation(defaultNode);
    }

    /**
     * @internal
     */
    private _getTypeParameterDeclaration() {
        const symbol = this.getSymbol();
        if (symbol == null)
            return undefined;
        const declaration = symbol.getDeclarations()[0];
        if (declaration == null)
            return undefined;
        if (!TypeGuards.isTypeParameterDeclaration(declaration))
            return undefined;
        return declaration;
    }
}
