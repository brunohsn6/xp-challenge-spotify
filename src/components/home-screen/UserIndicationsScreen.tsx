import React from 'react';
import {
    IArtist,
    IRecentlyPlayedTrack,
    ISearch,
    ITrack,
} from '../../core/services/SpotifyService';
import If from '../../utils/If';
import { BadgeButton, EBadgeType } from '../common/badge-button/BadgeButton';

interface IUserIndicationsScreenProps {
    tracksContent: ISearch<IRecentlyPlayedTrack>;
    artistContent: ISearch<IArtist>;
}
export default function UserIndicationsScreen({
    tracksContent,
    artistContent,
}: IUserIndicationsScreenProps) {
    return (
        <>
            <If test={tracksContent != null && tracksContent.items.length > 0}>
                <section className="content">
                    <span className="content-label">
                        Músicas tocadas recentemente
                    </span>
                    <section className="content-list">
                        {tracksContent?.items?.map((content, idx) => (
                            <React.Fragment key={`tracks-search-list-${idx}`}>
                                <BadgeButton
                                    id={content.track.id}
                                    imageDescription={content.track.name}
                                    artist={content.track.artists[0].name}
                                    imageUrl={
                                        content.track?.album?.images &&
                                        content.track?.album?.images[0]?.url
                                    }
                                    type={EBadgeType.TRACK}
                                />
                            </React.Fragment>
                        ))}
                    </section>
                </section>
            </If>
            <If test={artistContent != null && artistContent.items.length > 0}>
                <section className="content">
                    <span className="content-label">
                        Artistas buscados recentemente
                    </span>
                    <section className="content-list">
                        {artistContent?.items?.map((content, idx) => (
                            <React.Fragment key={`artists-search-list-${idx}`}>
                                <BadgeButton
                                    id={content.id}
                                    imageDescription={content.name}
                                    imageUrl={
                                        content.images &&
                                        content?.images[0]?.url
                                    }
                                    type={EBadgeType.ARTIST}
                                />
                            </React.Fragment>
                        ))}
                    </section>
                </section>
            </If>
        </>
    );
}
