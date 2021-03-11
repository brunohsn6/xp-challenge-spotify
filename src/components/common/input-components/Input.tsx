import React from 'react';
import './Input.scss';
import StringUtils from '../../../utils/StringUtils';
import If from '../../../utils/If';
export enum InputType {
    BIG = 'big',
    DEFAULT = '',
}
interface IInput
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    inputType?: InputType;
    inputLabel?: string;
    id: any;
    animated?: boolean;
}
export function Input({
    id,
    className,
    value,
    onChange,
    placeholder,
    inputType = InputType.DEFAULT,
    inputLabel,
    animated,
    ...rest
}: IInput) {
    let classValues = className ? { className: `${className} ` } : {};
    if (Object.keys(classValues).length > 0) {
        classValues.className.concat(inputType);
    } else if (!StringUtils.isNullOrEmpty(inputType)) {
        classValues.className = inputType;
    }
    return (
        <>
            <If test={inputLabel}>
                <label htmlFor={id} className="input-label">
                    {inputLabel}
                </label>
            </If>
            <input
                {...classValues}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
            {animated ? <span className="span-outline" /> : <></>}
        </>
    );
}
