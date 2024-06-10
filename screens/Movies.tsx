import { NativeStackScreenProps } from "@react-navigation/native-stack";
import react, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY0NWE3ODFhYTJhNDVjMmJiMTBlMzQ4NWE4ZTU1NyIsInN1YiI6IjY2MDJiODFjNzcwNzAwMDE0OTA4MWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnPMDrfQgUmvWFZbAhiX_9dRHSeU1vKznCG0rlkYk-k",
      },
    };

    const { results } = await (
      await fetch("https://api.themoviedb.org/3/trending/movie/week", options)
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY0NWE3ODFhYTJhNDVjMmJiMTBlMzQ4NWE4ZTU1NyIsInN1YiI6IjY2MDJiODFjNzcwNzAwMDE0OTA4MWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnPMDrfQgUmvWFZbAhiX_9dRHSeU1vKznCG0rlkYk-k",
      },
    };

    const { results } = await (
      await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=kr",
        options
      )
    ).json();
    setUpComing(results);
  };

  const getNowPlaying = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY0NWE3ODFhYTJhNDVjMmJiMTBlMzQ4NWE4ZTU1NyIsInN1YiI6IjY2MDJiODFjNzcwNzAwMDE0OTA4MWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnPMDrfQgUmvWFZbAhiX_9dRHSeU1vKznCG0rlkYk-k",
      },
    };

    const { results } = await (
      await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=kr",
        options
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 15)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>

            <Votes>⭐{Math.round(movie.vote_average * 10) / 10}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};
export default Movies;
