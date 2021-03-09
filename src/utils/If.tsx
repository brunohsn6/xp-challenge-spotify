import React from 'react';

export default function If(props: {
    test: any;
    children: React.ReactNode;
}): JSX.Element {
    return <>{props.test ? props.children : <></>}</>;
}
