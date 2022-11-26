import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient";
import { GET_GENRES } from "../../graphql/genre";
import { actions, selectGenreList } from "../slice/genre";

export default function useGenres() {
  const dispatch = useDispatch();
  const genreList = useSelector(selectGenreList);

  const getGenreList = async () => {
    const response = await apolloClient.query({
      query: GET_GENRES,
    });
    dispatch(actions.setGenreList(response.data.genres));
  };

  return { getGenreList, genreList };
}
