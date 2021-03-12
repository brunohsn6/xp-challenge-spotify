import React, { useState } from 'react';
import { Carroussel } from '../../carroussel/Carroussel';
import {
    BadgeButton,
    EBadgeType,
} from '../../common/buttons/badge-button/BadgeButton';
import './HomeScreenSkeleton.scss';
function HomeScreenSkeleton() {
    const [tracksMock, setTracksMock] = useState(new Array(20).fill(''));
    const [artistsMock, setArtistsMock] = useState(new Array(20).fill(''));
    return (
        <>
            <section className="content">
                <span className="empty-title skeleton"></span>
                <div className="empty-contents">
                    {artistsMock.map((content, idx) => (
                        <React.Fragment key={`tracks-search-list-${idx}`}>
                            <BadgeButton
                                id={''}
                                imageDescription={''}
                                artist={''}
                                imageUrl={''}
                                type={EBadgeType.MOCK}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </section>
            <section className="content">
                <span className="empty-title skeleton" />
                <div className="empty-contents">
                    {artistsMock.map((content, idx) => (
                        <React.Fragment key={`artists-search-list-${idx}`}>
                            <BadgeButton
                                id={''}
                                imageDescription={''}
                                imageUrl={''}
                                type={EBadgeType.MOCK}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    );
}
export default HomeScreenSkeleton;
