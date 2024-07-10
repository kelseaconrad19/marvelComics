import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";
import "./CharacterDetail.css";

const CharacterDetail = ({ characterId, onClose }) => {
	const [character, setCharacter] = useState(null);

	useEffect(() => {
		const fetchCharacterDetails = async () => {
			try {
				const ts = new Date().getTime();
				const publicKey = "635ce502ebffb52ca55a1e0664bebd6d";
				const privateKey = "9897f45f29535ecc43bda3b144076e21f0ba7818";
				const hash = md5(ts + privateKey + publicKey).toString();

				const response = await axios.get(
					`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
				);

				setCharacter(response.data.data.results[0]);
			} catch (error) {
				console.error("Error fetching character details:", error);
			}
		};

		fetchCharacterDetails();
	}, [characterId]);

	if (!character) {
		return <div>Loading...</div>;
	}

	return (
		<div className="character-detail">
			<button onClick={onClose}>Close</button>
			<h2>{character.name}</h2>
			<img
				src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
				alt={character.name}
			/>
			<p>{character.description}</p>
			<h3>Comics</h3>
			<ul>
				{character.comics.items.map((comic) => (
					<li key={comic.resourceURI}>{comic.name}</li>
				))}
			</ul>
		</div>
	);
};

export default CharacterDetail;
