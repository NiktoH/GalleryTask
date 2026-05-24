import './Card.css';

const Card = ({painting}) => {
    console.log(painting);
    return (
        <div className="grid-item">
            <img src={painting.imageUrl} alt={painting.title} />
            <div className="overlay">
                <div className="text-original">
                    <h2 className="title">{painting.title?.toUpperCase()}</h2>
                    <p className="subtitle">{painting.year}</p>
                </div>
                <div className="text-hover">
                    <h2 className="title">{painting.artist?.toUpperCase()}</h2>
                    <p className="subtitle">{painting.location}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;