import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "crypto-js/md5";
import "./CharacterList.css";

const CharacterList = ({ onSelectCharacter }) => {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const ts = new Date().getTime();
				const publicKey = "635ce502ebffb52ca55a1e0664bebd6d";
				const privateKey = "9897f45f29535ecc43bda3b144076e21f0ba7818";
				const hash = md5(ts + privateKey + publicKey).toString();

				const response = await axios.get(
					`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
				);
				setCharacters(response.data.data.results);
			} catch (error) {
				console.error("Error fetching characters:", error);
			}
		};

		fetchCharacters();
	}, []);

	return (
		<div className="character-list">
			{characters.map((character) => (
				<div
					key={character.id}
					className="character-item"
					onClick={() => onSelectCharacter(character.id)}
				>
					<img
						src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
						alt={character.name}
					/>
					<p>{character.name}</p>
				</div>
			))}
		</div>
	);
};

export default CharacterList;
