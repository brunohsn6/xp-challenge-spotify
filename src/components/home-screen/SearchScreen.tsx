import React from 'react';
import {
    IAlbum,
    IArtist,
    ISearch,
    ITrack,
} from '../../core/services/SpotifyService';
import {
    BadgeButton,
    EBadgeType,
} from '../common/buttons/badge-button/BadgeButton';
interface ISearchScreenProps {
    searchValue: string;
    albumContent: ISearch<IAlbum>;
    artistContent: ISearch<IArtist>;
    trackContent: ISearch<ITrack>;
    handleAlbumClick?: any;
    handleArtistClick?: any;
    handleTrackClick?: any;
}
export default function SearchScreen({
    searchValue,
    albumContent,
    artistContent,
    trackContent,
    handleAlbumClick,
    handleArtistClick,
    handleTrackClick,
}: ISearchScreenProps) {
    return (
        <>
            <span className="searched-value">{`Resultados encontrados para "${searchValue}"`}</span>
            <section className="content">
                <span className="content-label">Álbums</span>
                <section className="content-list">
                    {albumContent.items.map((content, idx) => (
                        <React.Fragment key={`albuns-search-list-${idx}`}>
                            <BadgeButton
                                id={content.id}
                                imageDescription={content.name}
                                artist={content?.artists[0]?.name}
                                imageUrl={content.images[0].url}
                                type={EBadgeType.ALBUM}
                                handleClick={handleAlbumClick}
                            />
                        </React.Fragment>
                    ))}
                </section>
            </section>
            <section className="content">
                <span className="content-label">Artistas</span>
                <section className="content-list">
                    {artistContent.items.map((content, idx) => (
                        <React.Fragment key={`artists-search-list-${idx}`}>
                            <BadgeButton
                                id={content.id}
                                imageDescription={content.name}
                                imageUrl={content.images[0]?.url}
                                type={EBadgeType.ARTIST}
                            />
                        </React.Fragment>
                    ))}
                </section>
            </section>
            <section className="content">
                <span className="content-label">Músicas</span>
                <section className="content-list">
                    {trackContent.items.map((content, idx) => (
                        <React.Fragment key={`tracks-search-list-${idx}`}>
                            <BadgeButton
                                id={content.id}
                                imageDescription={content.name}
                                imageUrl={content.album.images[0].url}
                                type={EBadgeType.TRACK}
                                handleClick={handleTrackClick}
                            />
                        </React.Fragment>
                    ))}
                </section>
            </section>
        </>
    );
}
