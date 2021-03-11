import React from 'react';
import './BasicButton.scss';
interface IButton
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label?: string;
    type: 'submit' | 'reset' | 'button';
}
export function Button({ onChange, label, type, ...rest }: IButton) {
    return (
        <button type={type} onChange={onChange} {...rest}>
            {label}
        </button>
    );
}
