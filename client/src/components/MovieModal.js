import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select
} from "antd";
import React, { useEffect } from "react";
import noImage from '../no-photo.jpeg';
import useGenres from "../redux/actions/genreActions";
import useMovies from "../redux/actions/movieActions";


function MovieModal(props) {
  const { visible, onCancel, onOk, mode } = props;
  const { movieDetails, createMovie, updateMovie } = useMovies();
  const { genreList } = useGenres();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    if (mode === "CREATE") {
      createMovie(values);
      form.resetFields();
    } else {
      
      const { id, ...updateInput } = values;
      updateMovie(id, updateInput);
      
    }
    onOk()
  };

  useEffect(() => {
    if (mode === "EDIT" && movieDetails) {
      form.setFieldsValue(movieDetails);
    } else {
      form.resetFields();
    }
  }, [movieDetails, mode]);

  return (
    <Modal
      visible={visible}
      title={`${mode} Movie`}
      onCancel={onCancel}
      onOk={onOk}
      footer={false}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="id" hidden />
        <Row gutter={[3, 3]}>
          <Col span={10}>
            <Image src={movieDetails?.image || "error"} fallback={noImage} />
          </Col>
          <Col span={14}>
            <Row gutter={[3, 3]}>
              <Col span={14}>
                <Form.Item name="title" label="Title">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="director" label="Director">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="description" label="Description">
                  <Input.TextArea row={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="stars" label="Stars">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="year" label="Year">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="genreId" label="Genre">
                  <Select>
                    {genreList?.map((genre) => (
                      <Select.Option key={genre?.id} value={genre?.id}>
                        {genre?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="image" label="Image">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item style={{ float: "right" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 10 }}
                  >
                    Submit
                  </Button>
                  <Button danger onClick={onCancel}>
                    Cancle
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default MovieModal;
