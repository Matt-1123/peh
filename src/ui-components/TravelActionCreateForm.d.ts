/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TravelActionCreateFormInputValues = {
    date?: string;
    title?: string;
    description?: string;
    usedTravelType?: string;
    usedDistance?: number;
    avoidedTravelType?: string;
    avoidedDistance?: string;
    carbonPrevented?: number;
    user?: string;
};
export declare type TravelActionCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    usedTravelType?: ValidationFunction<string>;
    usedDistance?: ValidationFunction<number>;
    avoidedTravelType?: ValidationFunction<string>;
    avoidedDistance?: ValidationFunction<string>;
    carbonPrevented?: ValidationFunction<number>;
    user?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TravelActionCreateFormOverridesProps = {
    TravelActionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    usedTravelType?: PrimitiveOverrideProps<TextFieldProps>;
    usedDistance?: PrimitiveOverrideProps<TextFieldProps>;
    avoidedTravelType?: PrimitiveOverrideProps<TextFieldProps>;
    avoidedDistance?: PrimitiveOverrideProps<TextFieldProps>;
    carbonPrevented?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TravelActionCreateFormProps = React.PropsWithChildren<{
    overrides?: TravelActionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TravelActionCreateFormInputValues) => TravelActionCreateFormInputValues;
    onSuccess?: (fields: TravelActionCreateFormInputValues) => void;
    onError?: (fields: TravelActionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TravelActionCreateFormInputValues) => TravelActionCreateFormInputValues;
    onValidate?: TravelActionCreateFormValidationValues;
} & React.CSSProperties>;
export default function TravelActionCreateForm(props: TravelActionCreateFormProps): React.ReactElement;
