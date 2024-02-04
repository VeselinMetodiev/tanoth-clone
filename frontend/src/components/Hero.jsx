import { Form, Container, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetCharactersQuery } from "../slices/characterApiSlice";
import { toast } from "react-toastify";
import { setHero } from "../slices/heroSlice";
const Hero = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { heroInfo } = useSelector((state) => state.hero);

  const {
    data: characters,
    isLoading,
    error,
    refetch,
  } = useGetCharactersQuery();

  const handleGetCharacter = async (e) => {
    e.preventDefault();
    if (!heroInfo) {
      try {
        const res = characters.find(
          (character) => character.name === userInfo.name
        );
        console.log("Hero class: " + res);
        dispatch(setHero({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    navigate("/tanoth");
  };

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <Form onSubmit={handleGetCharacter}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="primary"
              className="mt-3"
            >
              Tanoth
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
