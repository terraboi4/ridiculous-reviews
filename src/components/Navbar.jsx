import {
  Navbar,
  Button,
  Link,
  Text,
  Modal,
  Input,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import Logo from "../assets/logo";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { pb, login, signUp } from "../utils/pocketbase";

export default function Nav() {
  const collapseItems = [
    "Dashboard",
    "Trending",
    "Most Likes",
    "Most Laughs",
    "Newest Posts",
  ];

  const [visibleModal, setVisibleModal] = useState(null);

  const openModal = (number) => setVisibleModal(number);
  const closeModal = () => setVisibleModal(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (visibleModal === 0) {
      login(data);
    } else if (visibleModal === 1) {
      signUp(data);
    }
  };

  return (
    <div className="max-w-full box-border">
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          {/* <Logo /> */}
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="#">Dashboard</Navbar.Link>
          <Navbar.Link href="#">Trending</Navbar.Link>
          <Navbar.Link href="#">Most Likes</Navbar.Link>
          <Navbar.Link href="#">Most Laughs</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          {pb.authStore.model ? (
            <User
              src={
                pb.authStore.model.avatar
                  ? pb.authStore.model.avatar
                  : "https://api.dicebear.com/6.x/notionists-neutral/svg?seed=" +
                    pb.authStore.model.id
              }
              bordered
            />
          ) : (
            <div>
              <Navbar.Item>
                <Button auto flat as={Link} onPress={() => openModal(0)}>
                  Login
                </Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button auto flat as={Link} onPress={() => openModal(1)}>
                  Sign Up
                </Button>
              </Navbar.Item>
            </div>
          )}
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link color="inherit" className="min-w-full" href="#">
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visibleModal === 1}
          onClose={closeModal}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome to{" "}
              <Text b size={18}>
                Ridiculous Reviews!
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Username"
              {...register("username")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              {...register("email")}
            />

            <Input.Password
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              visibleIcon={<EyeIcon />}
              hiddenIcon={<EyeSlashIcon />}
              {...register("password")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto bordered color="error" onPress={closeModal}>
              Close
            </Button>
            <Button
              auto
              bordered
              type="submit"
              onPress={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visibleModal === 0}
          onClose={closeModal}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome back to{" "}
              <Text b size={18}>
                Ridiculous Reviews!
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              {...register("email")}
            />
            <Input.Password
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              visibleIcon={<EyeIcon />}
              hiddenIcon={<EyeSlashIcon />}
              {...register("password")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto bordered color="error" onPress={closeModal}>
              Close
            </Button>
            <Button
              auto
              bordered
              type="submit"
              onPress={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}
