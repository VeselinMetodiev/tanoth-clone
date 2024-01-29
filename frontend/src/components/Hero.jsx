import { Form, Container, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateCharacterMutation } from "../slices/characterSlice";

const Hero = () => {
  const [name, setName] = useState("");

  const [createCharacter, { isLoading: isCreatingCharacter }] =
    useCreateCharacterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateCharacter = async (e) => {
    e.preventDefault();
    try {
      const newCharacterData = {
        name: name,
        gold: 100,
        experience: 0,
        fame: 0,
        attributes: {
          strength: 10,
          agility: 10,
          constitution: 10,
          intelligence: 10,
        },
      };

      const result = await createCharacter(newCharacterData);
      navigate("/tanoth");
      if (result.data) {
        setSelectedCharacterId(result.data._id);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
          <Form onSubmit={handleCreateCharacter}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Your unique character's name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              disabled={isCreatingCharacter}
              type="submit"
              variant="primary"
              className="mt-3"
            >
              Sign In
            </Button>
          </Form>
          <div className="d-flex">
            <Button variant="primary" href="/tanoth" className="me-3">
              Tanoth
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
