import { useState, useEffect } from "react";
import "./PokemonCSS.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PokemonsLists() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState("");
    const [loadMore, setLoadMore] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadPokemonList();
    }, []);

    useEffect(() => {
        if (loadMore && nextUrl) {
            loadMorePokemon();
            setLoadMore(false);
        }
    }, [loadMore, nextUrl]);

    const loadPokemonList = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
            setPokemonList(response.data.results.slice(0, 20));
            setNextUrl(response.data.next);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const loadMorePokemon = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(nextUrl);
            setPokemonList((prevList) => [...prevList, ...response.data.results.slice(0, 20)]);
            setNextUrl(response.data.next);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const navigate = useNavigate()

    //  code for button
    const handleLoadMore = () => {
        setLoadMore(true);
    };

    return (
        <>
            <div className="pokemon-list">
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.name} className="pokemon-card " onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
                        <h2>{pokemon.name}</h2>
                    </div>
                ))}
            </div>
            {nextUrl && (
                <div className="btn-load-more">
                    <button onClick={handleLoadMore} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </>
    );
}

export default PokemonsLists;
