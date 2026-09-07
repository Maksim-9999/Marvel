import { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";

const _apiBase = "https://marvel-server-zeta.vercel.app/";
const _apiKey = `apikey=${import.meta.env.VITE_API_KEY}`;
const _baseOffset = 0;
const _baseComicsOffset = 0;
const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();
  const _transformComics = useCallback((comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description,
      pageCount: comics.pageCount,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects?.languages,
      price: comics.prices[0]?.price,
    };
  }, []);

  const _transformCharacter = useCallback((char) => {
    return {
      name: char.name,
      id: char.id,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  }, []);

  const getAllCharacters = useCallback(
    async (offset = _baseOffset) => {
      const res = await request(
        `${_apiBase}characters?&limit=9&offset=${offset}&${_apiKey}`,
      );
      return res.data.results.map(_transformCharacter);
    },
    [request, _transformCharacter],
  );

  const getCharacter = useCallback(
    async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
    },
    [request, _transformCharacter],
  );

  const getCharacterByName = useCallback(
    async (name) => {
      const res = await request(
        `${_apiBase}characters?&name=${encodeURIComponent(name)}&${_apiKey}`,
      );

      return res.data.results.map(_transformCharacter);
    },
    [request, _transformCharacter],
  );

  const getComic = useCallback(
    async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0]);
    },
    [request, _transformComics],
  );

  const getAllComics = useCallback(
    async (offset = _baseComicsOffset) => {
      const res = await request(
        `${_apiBase}comics?&limit=8&offset=${offset}&${_apiKey}`,
      );
      return res.data.results.map(_transformComics);
    },
    [request, _transformComics],
  );

  return {
    clearError,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
