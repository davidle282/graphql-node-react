import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled
} from "@ant-design/icons";
import { ApolloProvider } from "@apollo/client";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Genres from "./components/Genres";
import MovieModal from "./components/MovieModal";
import { apolloClient } from "./graphql/apolloClient";
import useGenres from "./redux/actions/genreActions";
import useMovies from "./redux/actions/movieActions";
import { actions } from "./redux/slice/movies";
import "./style.css";

const { Meta } = Card;

function App() {
  const { getMovieList, getMovieDetails, deleteMovie, movieList } = useMovies();
  const { getGenreList } = useGenres();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [filter, setFilter] = useState(null);
  const [keyword, setKeyword] = useState(null)
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    getMovieDetails(id);
    setModalMode("EDIT");
    setShowModal(true);
  };

  const handleAddMovie = () => {
    setModalMode("CREATE");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    deleteMovie(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(actions.setMovieDetails(null));
  };

  const handleKeywordChange = (event) => {
    const value = event.target.value;
    setKeyword(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      handleFilterChange("title", value);
    }, 800);
  };

  const handleFilterChange = (key, value) => {
    const newFilter = {
      ...filter,
      [key]: value,
    };

    if (!value) {
      delete newFilter[key];
    }
    setFilter(newFilter);
  };

  const handleGetAll = () => {
    setKeyword(null)
    setFilter(null);
  };

  useEffect(() => {
    getMovieList(filter);
  }, [filter]);

  useEffect(() => {
    getGenreList();
    getMovieList();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <div className="app-wrapper">
        <Row gutter={[12, 20]}>
          <Col span={24}>
            <Genres onChange={handleFilterChange} selected={filter?.genreId} />
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={12} lg={4} xl={2} xxl={2}>
                <Typography style={{ color: "white" }}>Keyword: </Typography>
              </Col>
              <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
                <Input
                  onChange={handleKeywordChange}
                  placeholder="Enter Keyword"
                  value={keyword}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
                <Button onClick={handleGetAll}>Get All Movies</Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[32, 32]}>
              {movieList?.map((item) => (
                <Col
                  key={item.id}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  xxl={4}
                >
                  <Card
                    cover={<img alt="image" src={item.image} />}
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => handleEdit(item?.id)}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDelete(item?.id)}
                      />,
                    ]}
                  >
                    <Meta
                      title={item.title}
                      description={`${item.year} - ${item?.genre?.name}`}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <PlusCircleFilled
          onClick={handleAddMovie}
          style={{
            position: "fixed",
            bottom: 40,
            color: "#0C9",
            right: 40,
            fontSize: 40,
          }}
        />
        <MovieModal
          visible={showModal}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          mode={modalMode}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
