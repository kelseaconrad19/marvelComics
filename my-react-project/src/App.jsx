import React, { useState } from "react";
import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";
import "./App.css";

const App = () => {
	const [selectedCharacterId, setSelectedCharacterId] = useState(null);

	const handleSelectCharacter = (characterId) => {
		setSelectedCharacterId(characterId);
	};

	const handleCloseDetail = () => {
		setSelectedCharacterId(null);
	};

	return (
		<div className="App">
			<h1>Marvel Characters</h1>
			<CharacterList onSelectCharacter={handleSelectCharacter} />
			{selectedCharacterId && (
				<CharacterDetail
					characterId={selectedCharacterId}
					onClose={handleCloseDetail}
				/>
			)}
		</div>
	);
};

export default App;
