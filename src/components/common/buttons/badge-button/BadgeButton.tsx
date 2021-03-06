import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import If from '../../../../utils/If';
import './BadgeButton.scss';
export enum EBadgeType {
    ARTIST = 'E_ARTIST',
    ALBUM = 'E_ALBUM',
    TRACK = 'E_TRACK',
    MOCK = 'E_MOCK',
}
interface IBadgeButton {
    id: string;
    imageUrl?: string;
    imageDescription: string;
    artist?: string;
    type: EBadgeType;
    handleClick?: any;
    big?: boolean;
}
export function BadgeButton({
    id,
    imageUrl,
    imageDescription,
    artist,
    type,
    handleClick,
    big,
}: IBadgeButton): JSX.Element {
    const [redirect, setRedirect] = useState(false);
    const getConditionalClassForImage = () => {
        let defaultImage: string = '';
        if (type == EBadgeType.ALBUM) {
            defaultImage = ' default-album';
        } else if (type == EBadgeType.ARTIST) {
            defaultImage = ' default-artist';
        } else if (type == EBadgeType.MOCK) {
            defaultImage = ' skeleton';
        } else {
            defaultImage = ' default-track';
        }
        return defaultImage;
    };
    const getCondicionalClassForEffect = () => {
        return handleClick ? ' effect' : '';
    };
    return (
        <>
            <section className={`desc-section${big ? ' big' : ''}`}>
                <If test={type == EBadgeType.MOCK}>
                    <div className={`img${getConditionalClassForImage()}`} />
                </If>
                <If test={type != EBadgeType.MOCK}>
                    <img
                        className={`img${getConditionalClassForImage()}${getCondicionalClassForEffect()}`}
                        {...(imageUrl != null ? { src: imageUrl } : {})}
                        onClick={() => {
                            handleClick && handleClick(id);
                        }}
                    />
                </If>
                <span
                    className={`desc${type == EBadgeType.MOCK ? ' skeleton' : ''
                        }`}
                    onClick={() => {
                        handleClick && handleClick(id);
                    }}
                >
                    {imageDescription}
                </span>
                <If test={type != EBadgeType.ARTIST && artist}>
                    <span className="desc-artist">{artist}</span>
                </If>
            </section>
        </>
    );
}
