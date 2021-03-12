import React from 'react';
import {
    IArtist,
    IRecentlyPlayedTrack,
    ISearch,
} from '../../core/services/SpotifyService';
import If from '../../utils/If';
import {
    BadgeButton,
    EBadgeType,
} from '../common/buttons/badge-button/BadgeButton';
import { Carroussel } from '../carroussel/Carroussel';
interface IUserIndicationsScreenProps {
    tracksContent: ISearch<IRecentlyPlayedTrack>;
    artistContent: ISearch<IArtist>;
    handleTrackClick: any;
}
export default function UserIndicationsScreen({
    tracksContent,
    artistContent,
    handleTrackClick,
}: IUserIndicationsScreenProps) {
    return (
        <>
            <If test={tracksContent != null && tracksContent.items.length > 0}>
                <section className="content">
                    <span className="content-label">
                        Músicas tocadas recentemente
                    </span>
                    <Carroussel>
                        {tracksContent?.items?.map((content, idx) => (
                            <React.Fragment key={`tracks-search-list-${idx}`}>
                                <BadgeButton
                                    id={content.track?.id}
                                    imageDescription={content.track?.name}
                                    artist={content.track?.artists[0]?.name}
                                    imageUrl={
                                        content.track?.album?.images &&
                                        content.track?.album?.images[0]?.url
                                    }
                                    type={EBadgeType.TRACK}
                                    handleClick={handleTrackClick}
                                />
                            </React.Fragment>
                        ))}
                    </Carroussel>
                </section>
            </If>
            <If test={artistContent != null && artistContent.items.length > 0}>
                <section className="content">
                    <span className="content-label">
                        Artistas buscados recentemente
                    </span>
                    <Carroussel>
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
                    </Carroussel>
                </section>
            </If>
        </>
    );
}
